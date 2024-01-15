import { IUser } from "@/interfaces/User";
import { useModalStore } from "@/store/modal";

export default function UserItem({ user }: {user: IUser}) {
  const setModalUser = useModalStore((state) => state.setUser);

  function handleViewClick() {
    setModalUser(user);

    const openModalButton = document.querySelector("#modal-view-user-toggle") as HTMLButtonElement;
    openModalButton.click();
  }

  const { name, email, phone, cpf } = user;
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
        <a>{cpf}</a>
      </td>
      <td className="project-actions text-right">
        <a className="btn btn-primary btn-sm m-1" href="#" onClick={handleViewClick}>
          <i className="fas fa-folder" />
          Ver
        </a>
        <a className="btn btn-info btn-sm" href="#">
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
