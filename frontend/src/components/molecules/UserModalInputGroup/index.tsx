import { IModalInput } from "@/interfaces/ModalInput";
import { IUser } from "@/interfaces/User";
import {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  SetStateAction,
  useState,
} from "react";

import Axios from "axios";
import Input from "@/components/atoms/Input";
import Modal from "@/components/atoms/Modal";

interface IErrorValue {
  name: keyof IUser;
  value: string;
}

interface IProps {
  handleClick: () => Promise<void>;
  inputValues: IUser;
  setInputValues: Dispatch<SetStateAction<IUser>>;
  modalMetadata: {
    id: string;
    title: string;
    buttonLabel: string;
  };
}

export default function UserModalInputGroup({
  handleClick,
  inputValues,
  setInputValues,
  modalMetadata,
}: IProps) {
  const [errorValues, setErrorValues] = useState<IErrorValue[]>([]);

  const inputs: IModalInput[] = [
    {
      name: "name",
      label: "Nome",
      type: "text",
      min: 3,
      max: 255,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      min: 8,
      max: 255,
      errorMessage: "Email Inválido",
      refine: () => {
        const value = inputValues.email;
        return Boolean(value.includes(".") && value.includes("@"));
      },
    },
    {
      name: "cpf",
      label: "CPF",
      type: "text",
      placeholder: "11122233344",
      min: 11,
      max: 11,
      errorMessage: "CPF Inválido",
      refine: () => {
        const value = inputValues.cpf;
        return Boolean(
          !isNaN(parseInt(value)) && parseInt(value).toString().length === 11
        );
      },
    },
    {
      name: "phone",
      label: "Telefone",
      type: "text",
      placeholder: "34988414702",
      min: 11,
      max: 14,
    },
    {
      name: "birthdate",
      label: "Data de nascimento",
      type: "date",
      placeholder: "00/00/0000",
    },
    {
      name: "address.cep",
      label: "CEP",
      type: "text",
      placeholder: "38740188",
      min: 8,
      max: 8,
      onBlur: async (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (!value || isNaN(parseInt(value))) return;

        try {
          const { data } = await Axios.get(
            `https://viacep.com.br/ws/${value}/json/`
          );

          if (!data) return;

          const {
            logradouro,
            complemento,
            bairro,
            localidade,
            uf,
          }: {
            logradouro: string;
            complemento: string;
            bairro: string;
            localidade: string;
            uf: string;
          } = data;

          setInputValues((currentValue) => ({
            ...currentValue,
            address: {
              ...currentValue.address,
              street: logradouro,
              complement: complemento,
              neighboorhood: bairro,
              city: localidade,
              state: uf,
            },
          }));
        } catch (e) {
          //
        }
      },
    },
    {
      name: "address.street",
      label: "Endereço",
      type: "text",
      placeholder: "Nome da rua ou avenida",
      max: 128,
    },
    {
      name: "address.number",
      label: "Número",
      type: "number",
      max: 9999,
    },
    {
      name: "address.complement",
      label: "Complemento",
      type: "text",
      max: 255,
    },
    {
      name: "address.neighborhood",
      label: "Bairro",
      type: "text",
      max: 32,
    },
    {
      name: "address.city",
      label: "Cidade",
      type: "text",
      max: 32,
    },
    {
      name: "address.state",
      label: "Estado",
      type: "text",
      max: 32,
    },
  ];

  function getErrorValue(inputName: string) {
    const error = errorValues.find((error) => error.name === inputName);
    if (!error) {
      return null;
    }
    return <p className="text-danger">{error.value}</p>;
  }

  function clearErrorValue(inputName: string) {
    setErrorValues(errorValues.filter((error) => error.name !== inputName));
  }

  function mapInputs() {
    return inputs.map((key) => {
      let value = "";

      if (inputValues) {
        value = inputValues[key["name"] as keyof IUser] as string;

        if (key["name"].includes(".")) {
          //@ts-ignore
          value = inputValues.address[key["name"].split(".")[1] as string];
        }
      }

      function handleBlur(e: FocusEvent<HTMLInputElement, Element>) {
        clearErrorValue(key.name);

        if (!key.onBlur) return;
        key.onBlur(e);
      }

      return (
        <div key={key.name}>
          <label htmlFor={key.name}>(*) {key.label}</label>
          <Input
            className={getErrorValue(key.name) ? "border border-danger" : ""}
            type={key.type}
            id={key.name}
            placeholder={key.placeholder}
            onChange={(e) => {
              if (!key.name.includes(".")) {
                return setInputValues({
                  ...inputValues,
                  [key.name]: e.target.value,
                });
              }

              setInputValues({
                ...inputValues,
                address: {
                  ...inputValues.address,
                  [key.name.split(".")[1]]: e.target.value,
                },
              });
            }}
            onBlur={(e) => handleBlur(e)}
            minLength={key.min}
            maxLength={key.max}
            max={key.max}
            //@ts-ignore
            value={value}
          />
          {getErrorValue(key.name)}
        </div>
      );
    });
  }

  function validateFields(): boolean {
    setErrorValues([]);
    let canInsert = true;

    inputs.forEach((key) => {
      const value =
        (inputValues[key.name as keyof IUser] as string) ||
        //@ts-ignore
        (inputValues.address[key.name.split(".")[1] as keyof IUser] as string);

      if (!value) {
        canInsert = false;
        return setErrorValues((currentValue) => [
          ...currentValue,
          {
            name: key.name as keyof IUser,
            value: "Campo obrigatório",
          },
        ]);
      }

      const input = inputs.find((input) => input.name === key.name);

      if (!input) return;
      if (
        value.length < (input.min ? input.min : 1) ||
        value.length > (input.max ? input.max : 255)
      ) {
        canInsert = false;
        return setErrorValues((currentValue) => [
          ...currentValue,
          {
            name: key.name as keyof IUser,
            value: `Esse campo precisa ter no mínimo ${
              input.min || 1
            } caracteres`,
          },
        ]);
      }

      if (input.refine) {
        if (!input.refine()) {
          canInsert = false;
          return setErrorValues((currentValue) => [
            ...currentValue,
            {
              name: key.name as keyof IUser,
              value: input.errorMessage || "Valor inválido.",
            },
          ]);
        }
      }
    });

    return canInsert;
  }

  async function handleButtonClick() {
    if (!validateFields()) return true;

    if (errorValues.length > 0) return true;

    if (handleClick) {
      await handleClick();
    }

    return false;
  }
  return (
    <Modal
      id={modalMetadata.id}
      title={modalMetadata.title}
      button={{ label: modalMetadata.buttonLabel, onClick: handleButtonClick }}
    >
      {mapInputs()}
    </Modal>
  );
}
