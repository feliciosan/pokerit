"use client";

import Spinner from "@/components/Spinner";
import { useAuth } from "@/hooks/use-auth.hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withPublic = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithUserAuth = (props: T) => {
    const { isAuthLoading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (isAuthenticated && !isAuthLoading) {
        router.push("/portal");
      }
    }, [router, isAuthenticated, isAuthLoading]);

    if (isAuthLoading || isAuthenticated) {
      return <Spinner type="global" />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithUserAuth;
};

export default withPublic;
