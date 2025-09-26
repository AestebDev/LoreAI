"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Define public routes that don't need authentication
  const isPublicRoute = pathname === "/login" || pathname === "/signup";

  useEffect(() => {
    if (!loading && !user && !isPublicRoute && !isRedirecting) {
      console.log("RequireAuth: Redirecting to login");
      setIsRedirecting(true);
      router.replace("/login");
    }
  }, [user, loading, pathname, router, isPublicRoute, isRedirecting]);

   //If not logged in and not on a public route, don’t render children
  if (!user && !isPublicRoute) {
    return null;
  }

  // Either user is logged in, or we’re on a public route
  return <><h1>{children}</h1></>;
}