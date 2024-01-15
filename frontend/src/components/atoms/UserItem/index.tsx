import { IUser } from "@/interfaces/User";
import { useModalStore } from "@/store/modal";
import formatDate from "@/util/formatDate";
import { formatDistanceToNow } from "date-fns";

import { ptBR } from "date-fns/locale"; 

export default function UserItem({ user }: {user: IUser}) {
  const setModalUser = useModalStore((state) => state.setUser);

  function handleViewClick() {
    setModalUser(user);

    const openModalButton = document.querySelector("#modal-view-user-toggle") as HTMLButtonElement;
    openModalButton.click();
  }

  function handleEditClick() {
    setModalUser(user);

    const openModalButton = document.querySelector("#modal-edit-user-toggle") as HTMLButtonElement;
    openModalButton.click();
  }

  const { name, email, phone, birthdate } = user;
  return (
    <tr>
      <td>{name}</td>
      <td>
        <a>{email}</a>
      </td>
      <td>
        <a>{phone}</a>
      </td>
      <td className="project_progress">
        <a>{formatDistanceToNow(formatDate(birthdate), {
            addSuffix: false,
            locale: ptBR,
          })}</a>
      </td>
      <td className="project-actions text-right">
        <a className="btn btn-primary btn-sm m-1" href="#" onClick={handleViewClick}>
          <i className="fas fa-folder" />
          Ver
        </a>
        <a className="btn btn-info btn-sm" href="#" onClick={handleEditClick}>
          <i className="fas fa-pencil-alt" />
          Editar
        </a>
        <a className="btn btn-danger btn-sm" href="#">
          <i className="fas fa-trash" />
          Deletar
        </a>
      </td>
    </tr>
  );
}
