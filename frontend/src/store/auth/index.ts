import { create } from "zustand";

type State = {
  account: {
    id: string | null;
    username: string | null;
  };
  loggedIn: boolean;
  loading: boolean;
};

type Action = {
  login: (account: State["account"]) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<State & Action>((set) => ({
  account: {
    id: null,
    username: null,
  },
  loggedIn: false,
  loading: true,
  login: (account) => set({ account, loggedIn: true }),
  logout: () => set({ account: { id: null, username: null }, loggedIn: false }),
  setLoading: (loading) => set({ loading }),
}));
