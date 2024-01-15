import UserItem from "@/components/atoms/UserItem";
import { useUserStore } from "@/store/user";

export default function UserMap() {
  const users = useUserStore((state) => state.users);
  const searchValue = useUserStore((state) => state.searchValue);

  function mapUsers() {
    return users.map((user) => {
      if (
        searchValue &&
        !user.name.toLocaleLowerCase().includes(searchValue.trim().toLowerCase())
      )
        return null;
      return <UserItem key={user._id} user={user} />;
    });
  }

  return (
    <table className="table table-striped projects">
      <thead>
        <tr>
          <th style={{ width: "20%" }}>Nome</th>
          <th style={{ width: "20%" }}>Email</th>
          <th style={{ width: "20%" }}>Telefone</th>
          <th style={{ width: "20%" }}>Idade</th>
          <th style={{ width: "20%" }}>Ações</th>
        </tr>
      </thead>
      <tbody>{mapUsers()}</tbody>
    </table>
  );
}
