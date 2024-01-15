import { IUser } from "@/interfaces/User"
import { create } from "zustand";

type State = {
    user: IUser | null;
}

type Action = {
    setUser: (user: IUser) => void;
}

export const useModalStore = create<State &  Action>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}))