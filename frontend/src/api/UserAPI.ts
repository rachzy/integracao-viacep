import { IUser } from "@/interfaces/User";

import users from "./dummy.json";

export const UserAPI = {
  getAll: async (): Promise<IUser[]> => {
    return users;
  },
  getUserById: async (userId: string): Promise<IUser | null> => {
    return users.find((user) => user._id === userId) || null;
  },
  create: async (user: IUser): Promise<IUser> => {
    const createdUser: IUser = {
      _id: Date.now().toString(),
      author: Date.now().toString(),
      ...user,
    };
    return createdUser;
  },
};
