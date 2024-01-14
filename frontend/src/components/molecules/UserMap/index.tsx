import UserItem from "@/components/atoms/UserItem";
import { IUser } from "@/interfaces/User";

export default function UserMap({ users }: { users: IUser[] }) {
  function mapUsers() {
    return users.map((user) => {
      return <UserItem key={user._id} {...user} />;
    });
  }
  return (
    <table className="table table-striped projects">
      <thead>
        <tr>
          <th style={{ width: "20%" }}>Nome</th>
          <th style={{ width: "20%" }}>Email</th>
          <th style={{ width: "20%" }}>Telefone</th>
          <th style={{ width: "20%" }}>Cpf</th>
          <th style={{ width: "20%" }}>Ações</th>
        </tr>
      </thead>
      <tbody>{mapUsers()}</tbody>
    </table>
  );
}
