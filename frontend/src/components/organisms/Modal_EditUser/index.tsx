import { UserAPI } from "@/api/UserAPI";
import UserModalInputGroup from "@/components/molecules/UserModalInputGroup";
import { IUser } from "@/interfaces/User";
import { useModalStore } from "@/store/modal";
import { useUserStore } from "@/store/user";
import { useEffect, useState } from "react";

export default function ModalEditUser() {
  const user = useModalStore((state) => state.user);
  const editUser = useUserStore((state) => state.editUser);

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

  useEffect(() => {
    if (!user) return;
    setInputValues({ ...user });
  }, [user]);

  async function handleClick() {
    const edittedUser = await UserAPI.edit(user?._id!, inputValues);
    editUser(edittedUser);
  }

  return (
    <UserModalInputGroup
      handleClick={handleClick}
      inputValues={inputValues}
      setInputValues={setInputValues}
      modalMetadata={{
        id: "modal-edit-user",
        title: "Editar Usuário",
        buttonLabel: "Salvar usuário",
      }}
    />
  );
}
