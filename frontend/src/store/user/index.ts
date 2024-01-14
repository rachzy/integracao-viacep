import { IUser } from "@/interfaces/User";
import { create } from "zustand";

type State = {
  users: IUser[];
  filteredUsers: IUser[];
  loading: boolean;
  error: string;
};

type Action = {
  setUsers: (users: IUser[]) => void;
  setFilteredUsers: (users: IUser[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  users: [],
  filteredUsers: [],
  loading: true,
  error: "",
  setUsers: (users) => set({ users }),
  setFilteredUsers: (users) => set({ filteredUsers: users }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
