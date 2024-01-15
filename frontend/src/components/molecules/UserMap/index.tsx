import UserItem from "@/components/atoms/UserItem";
import { useUserStore } from "@/store/user";

export default function UserMap() {
  const users = useUserStore((state) => state.users);

  function mapUsers() {
    return users.map((user) => {
      return <UserItem key={user._id} {...user} />;
    });
  }

  console.log(users);
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
