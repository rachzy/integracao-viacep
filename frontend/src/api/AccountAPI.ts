import { IAccount } from "@/interfaces/Account";
import { api } from "./configs/axiosConfig";

export const AccountAPI = {
  auth: async (email: string, password: string): Promise<IAccount> => {
    const { data } = await api.request({
      url: "session/create",
      method: "POST",
      data: {
        email,
        password,
      },
    });

    return data;
  },
  getData: async (): Promise<IAccount> => {
    const { data } = await api.request({
      url: "account/getData",
      method: "GET",
    });

    return data;
  },
  logout: async (): Promise<void> => {
    await api.request({
      url: "session/logout",
      method: "DELETE",
    });
  },
};
