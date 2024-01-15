"use client";

import { AccountAPI } from "@/api/AccountAPI";
import Loader from "@/components/atoms/Loader";
import { useAuthStore } from "@/store/auth";
import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";

export default function Loading() {
  const login = useAuthStore((state) => state.login);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    async function validateSession() {
      try {
        const data = await AccountAPI.getData();
        login(data);
      } catch (err) {
        //
      } finally {
        setLoading(false);
      }
    }
    validateSession();
  });

  return (
    <Loader />
  );
}
