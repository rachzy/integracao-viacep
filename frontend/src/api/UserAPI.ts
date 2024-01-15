import { IUser } from "@/interfaces/User";

import { api } from "./configs/axiosConfig";

export const UserAPI = {
  getAll: async (): Promise<IUser[]> => {
    const { data } = await api.request({
      url: "user/getAll",
      method: "GET",
    });
    return data;
  },
  create: async (user: IUser): Promise<IUser> => {
    const { data } = await api.request({
      url: "user/create",
      method: "POST",
      data: user,
    });

    return data;
  },
  edit: async (userId: string, user: IUser): Promise<IUser> => {
    const { _id, author, ...retrievedUser } = user;
    const { data } = await api.request({
      url: `user/edit?id=${userId}`,
      method: "PUT",
      data: retrievedUser,
    });

    return data;
  },
  delete: async (userId: string): Promise<boolean> => {
    await api.request({
      url: `user/delete?id=${userId}`,
      method: "DELETE",
    });

    return true;
  },
};
