import Modal from "@/components/atoms/Modal";
import { useModalStore } from "@/store/modal";
import formatDate from "@/util/formatDate";

import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

export default function ViewUserModal() {
  const user = useModalStore((state) => state.user);

  const data = [
    {
      label: "Nome",
      value: user?.name,
    },
    {
      label: "CPF",
      value: user?.cpf,
    },
    {
      label: "Email",
      value: user?.email,
    },
    {
      label: "Telefone",
      value: user?.phone,
    },
    {
      label: "Data de Nascimento",
      value: user?.birthdate ? formatDate(new Date(user.birthdate)) : null,
    },
    {
      label: "Idade",
      value: user?.birthdate
        ? formatDistanceToNow(formatDate(user.birthdate), {
            addSuffix: false,
            locale: ptBR,
          })
        : null,
    },
    {
      label: "CEP",
      value: user?.address.cep,
    },
    {
      label: "Endereço",
      value: user?.address.street,
    },
    {
      label: "Número",
      value: user?.address.number,
    },
    {
      label: "Bairro",
      value: user?.address.neighborhood,
    },
    {
      label: "Complemento",
      value: user?.address.complement,
    },
    {
      label: "Cidade",
      value: user?.address.city,
    },
    {
      label: "Estado",
      value: user?.address.state,
    },
  ];

  function mapData() {
    if (!user) return null;

    return data.map((item) => (
      <div key={item.label}>
        <label>{item.label}</label>
        <p>{item.value}</p>
      </div>
    ));
  }

  return (
    <Modal id={"modal-view-user"} title={"Visualizar usuário"}>
      {mapData()}
    </Modal>
  );
}
