import { create } from "zustand";

type State = {
  account: {
    id: string | null;
    username: string | null;
  };
  loggedIn: boolean;
};

type Action = {
  login: (account: State["account"]) => void;
  logout: () => void;
};

export const useAuthStore = create<State & Action>((set) => ({
  account: {
    id: "",
    username: "",
  },
  loggedIn: false,
  login: (account) => set({ account, loggedIn: true }),
  logout: () => set({ account: { id: null, username: null }, loggedIn: false }),
}));
