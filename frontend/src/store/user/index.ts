import { IUser } from "@/interfaces/User";
import {create} from "zustand";

type State = {
  users: IUser[];
  searchValue: string;
  loading: boolean;
  error: string;
};

type Action = {
  addUser: (user: IUser) => void;
  editUser: (user: IUser) => void;
  deleteUser: (userId: string) => void;
  setUsers: (users: IUser[]) => void;
  setSearchValue: (searchValue: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  getUserById: (userId: string) => IUser | undefined;
};

export const useUserStore = create<State & Action>(
  (set, get) => ({
    users: [],
    searchValue: "",
    loading: true,
    error: "",
    addUser: (user) => set((state) => ({ users: [...state.users, user] })),
    editUser: (user) =>
      set((state) => ({
        users: [
          user,
          ...state.users.filter((userIn) => userIn._id !== user._id),
        ],
      })),
    deleteUser: (userId) =>
      set((state) => ({
        users: state.users.filter((user) => user._id !== userId),
      })),
    setUsers: (users) => set({ users }),
    setSearchValue: (searchValue) => set({ searchValue }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    getUserById: (userId) => get().users.find((user) => user._id === userId),
  }),
);
