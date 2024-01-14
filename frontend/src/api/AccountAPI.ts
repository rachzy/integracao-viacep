import { IAccount } from "@/interfaces/Account";

export const AccountAPI = {
  auth: async (email: string, password: string): Promise<IAccount> => {
    return {
      id: "abc",
      username: "rach",
    };
  },
};
