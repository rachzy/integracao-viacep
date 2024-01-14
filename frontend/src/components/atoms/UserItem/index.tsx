import { IUser } from "@/interfaces/User";

export default function UserItem({ name, email, phone, cpf }: Partial<IUser>) {
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
        <a className="btn btn-primary btn-sm m-1" href="#">
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
