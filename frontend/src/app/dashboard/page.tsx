"use client";

import { UserAPI } from "@/api/UserAPI";
import DashboardTemplate from "@/components/templates/Dashboard";
import { useUserStore } from "@/store/user";
import { useEffect } from "react";

export default function DashboardHome() {
  const loading = useUserStore((state) => state.loading);
  const setUsers = useUserStore((state) => state.setUsers);
  const setLoading = useUserStore((state) => state.setLoading);

  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await UserAPI.getAll();
      setUsers(fetchedUsers);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  return <DashboardTemplate loading={loading} />;
}
