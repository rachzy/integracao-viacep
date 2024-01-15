import Paginator from "@/components/atoms/Paginator";
import UserItem from "@/components/atoms/UserItem";
import { IUser } from "@/interfaces/User";
import { useUserStore } from "@/store/user";
import { useState } from "react";

export default function UserMap() {
  const users = useUserStore((state) => state.users);
  const searchValue = useUserStore((state) => state.searchValue);

  const [currentPage, setCurrentPage] = useState(0);
  let amountPerPage = 10;

  function filterUsersBySearchValue(): IUser[] {
    const filteredUsers = users.filter((user) => {
      return (
        (searchValue &&
          user.name
            .toLocaleLowerCase()
            .includes(searchValue.trim().toLowerCase())) ||
        user.cpf.toLocaleLowerCase().includes(searchValue.trim().toLowerCase())
      );
    });
    return filteredUsers;
  }

  function mapUsers() {
    const filteredUsers = filterUsersBySearchValue();
    return filteredUsers.map((user, index) => {
      if (
        index < currentPage * amountPerPage ||
        index > (currentPage + 1) * amountPerPage - 1
      )
        return null;
      return <UserItem key={user._id} user={user} />;
    });
  }

  return (
    <>
      <table className="table table-striped projects">
        <thead>
          <tr>
            <th style={{ width: "20%" }}>Nome</th>
            <th style={{ width: "20%" }}>Email</th>
            <th style={{ width: "15%" }}>CPF</th>
            <th style={{ width: "15%" }}>Idade</th>
            <th style={{ width: "25%" }}>Ações</th>
          </tr>
        </thead>
        <tbody>{mapUsers()}</tbody>
        <tfoot>
          <Paginator
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            amountPerPage={amountPerPage}
            totalAmount={filterUsersBySearchValue().length}
          />
        </tfoot>
      </table>
    </>
  );
}
