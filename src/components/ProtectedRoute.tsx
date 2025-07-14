"use client";
import { useRouter } from "next/router";
import { useEffect, ReactNode } from "react";
import { UseUser } from "@/contexts/UserContext";
import Loader from "@/app/loading";

interface Props {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { state } = UseUser();
  const { user, isAuthenticated, isLoading } = state;
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push("/Auth/Login");
    } else if (
      allowedRoles &&
      !allowedRoles.includes(user?.UserRole || "user")
    ) {
      router.push("/Unauthorized");
    }
  }, [isAuthenticated, isLoading, user, allowedRoles, router]);

  if (isLoading) return <Loader />;

  return <>{children}</>;
}
