"use client";

import { UserAPI } from "@/api/UserAPI";
import DashboardTemplate from "@/components/templates/Dashboard";
import { useUserStore } from "@/store/user";

export default function DashboardHome() {
  const users = useUserStore((state) => state.users);
  const loading = useUserStore((state) => state.loading);
  const setUsers = useUserStore((state) => state.setUsers);
  const setLoading = useUserStore((state) => state.setLoading);

  async function fetchUsers() {
    const fetchedUsers = await UserAPI.getAll();
    setUsers(fetchedUsers);
    setLoading(false);
  }
  fetchUsers();

  return <DashboardTemplate users={users} loading={loading} />;
}
