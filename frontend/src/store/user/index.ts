import { IUser } from "@/interfaces/User";
import { create } from "zustand";

type State = {
  users: IUser[];
  searchValue: string;
  loading: boolean;
  error: string;
};

type Action = {
  addUser: (user: IUser) => void;
  setUsers: (users: IUser[]) => void;
  setSearchValue: (searchValue: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  users: [],
  searchValue: "",
  loading: true,
  error: "",
  addUser: (user) =>
    set((state) => ({ users: [...state.users, user] }), true),
  setUsers: (users) => set({ users }),
  setSearchValue: (searchValue) => set({ searchValue }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
