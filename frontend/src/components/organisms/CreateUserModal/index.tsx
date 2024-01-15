import { IUser } from "@/interfaces/User";
import { useState } from "react";

import { useUserStore } from "@/store/user";
import { UserAPI } from "@/api/UserAPI";
import UserModalInputGroup from "@/components/molecules/UserModalInputGroup";

export default function CreateUserModal() {
  const addUser = useUserStore((state) => state.addUser);

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

  async function handleClick() {
    const newUser = await UserAPI.create(inputValues);
    addUser(newUser);
  }

  return (
    <UserModalInputGroup
      handleClick={handleClick}
      inputValues={inputValues}
      setInputValues={setInputValues}
      modalMetadata={{
        id: "modal-create-user",
        title: "Criar Usuário",
        buttonLabel: "Salvar usuário",
      }}
    />
  );
}
