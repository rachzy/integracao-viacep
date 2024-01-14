"use client";

import LoginTemplate from "@/components/templates/Login";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

export default function Index() {
  const router = useRouter();
  const userAuthenticated = useAuthStore((state) => state.loggedIn);

  if (userAuthenticated) {
    return router.push("/dashboard");
  }

  return <LoginTemplate />;
}
