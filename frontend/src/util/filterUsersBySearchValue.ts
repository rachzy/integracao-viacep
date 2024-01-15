import { IUser } from "@/interfaces/User";

export default function filterUsersBySearchValue(
  users: IUser[],
  searchValue: string
): IUser[] {
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
