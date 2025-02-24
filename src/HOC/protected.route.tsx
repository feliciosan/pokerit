"use client";

import { useAuth } from "@/hooks/use-auth.hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "@/components/Spinner";

const withProtected = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithProtected = (props: T) => {
    const { isAuthLoading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated && !isAuthLoading) {
        router.push("/portal/login");
      }
    }, [router, isAuthenticated, isAuthLoading]);

    if (isAuthLoading || !isAuthenticated) {
      return <Spinner type="global" />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithProtected;
};

export default withProtected;
