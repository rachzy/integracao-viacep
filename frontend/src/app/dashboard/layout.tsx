"use client";

import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const userAuthenticated = useAuthStore((state) => state.loggedIn);

  if (!userAuthenticated) {
    return router.push("/");
  }

  return <>{children}</>;
}
