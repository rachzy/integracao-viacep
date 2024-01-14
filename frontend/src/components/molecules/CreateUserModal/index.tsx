import Input from "@/components/atoms/Input";
import Modal from "@/components/atoms/Modal";
import { IUser } from "@/interfaces/User";
import { useState } from "react";

export default function CreateUserModal() {
  const [inputValues, setInputValues] = useState<IUser>({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    birthdate: "",
    address: {
      street: "",
      number: 0,
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      cep: "",
    },
  });

  const inputs = [
    {
      name: "name",
      label: "Nome",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "cpf",
      label: "CPF",
      type: "text",
      placeholder: "000.000.000-00",
    },
    {
      name: "phone",
      label: "Telefone",
      type: "text",
      placeholder: "(00) 00000-0000",
    },
    {
      name: "birthdate",
      label: "Data de nascimento",
      type: "date",
      placeholder: "00/00/0000",
    },
    {
      name: "cep",
      label: "CEP",
      type: "text",
      placeholder: "00000-000",
    },
    {
      name: "address.street",
      label: "Endereço",
      type: "text",
      placeholder: "Nome da rua ou avenida",
    },
    {
      name: "address.number",
      label: "Número",
      type: "number",
    },
    {
      name: "address.complement",
      label: "Complemento",
      type: "text",
    },
    {
      name: "address.neighboorhood",
      label: "Bairro",
      type: "text",
    },
    {
      name: "address.city",
      label: "Cidade",
      type: "text",
    },
    {
      name: "address.state",
      label: "Estado",
      type: "text",
    },
  ];

  function mapInputs() {
    return inputs.map((key) => {
      const value =
        inputValues[
          (key["name"] as keyof IUser) ||
            inputValues["address"][key["name"] as keyof IUser["address"]]
        ];
      return (
        <div key={key.name}>
          <label htmlFor={key.name}>{key.label}</label>
          <Input
            type={key.type}
            id={key.name}
            placeholder={key.placeholder}
            onChange={(e) =>
              setInputValues({ ...inputValues, [key.name]: e.target.value })
            }
            //@ts-ignore
            value={value}
          />
        </div>
      );
    });
  }
  return (
    <Modal
      id="modal-create-user"
      title={"Novo usuário"}
      button={{ label: "Salvar usuário" }}
    >
      {mapInputs()}
    </Modal>
  );
}
