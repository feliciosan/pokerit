"use client";

import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  AuthErrorCodes,
  AuthError,
  onAuthStateChanged,
  beforeAuthStateChanged,
} from "firebase/auth";
import { app } from "@/config/firebase";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TUser } from "@/app/actions/user/user.types";
import UserService from "@/app/actions/user";

const firebaseAuth = getAuth(app);
type TAuthContext = {
  loggedUser: TUser | null;
  isAuthLoading: boolean;
  isAuthenticated: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  const { data: loggedUser, isFetched: isloggedUserFetched } = useQuery({
    queryKey: ["get-user-by-id", userId],
    queryFn: async () => UserService.getUserById(userId || ""),
    initialData: null,
    enabled: !!userId,
  });

  const { mutateAsync: setUserInfo } = useMutation({
    mutationKey: ["set-user-info"],
    mutationFn: async (params: { uid: string; data: Partial<TUser> }) =>
      UserService.setUserInfo(params.uid, params.data),
  });

  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      const unsubscribeBefore = beforeAuthStateChanged(
        firebaseAuth,
        async (user) => {
          if (!!user) {
            await setUserInfo({
              uid: user.uid,
              data: {
                uid: user.uid,
                email: user.email || "",
                displayName: user.displayName || "",
              },
            });
          }
        }
      );

      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      unsubscribeBefore();
    } catch (error: unknown) {
      const authError = error as AuthError;

      if (authError.code === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Email already exists! Please try again.");
      } else {
        alert("Something went wrong! Please try again.");
      }
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error: unknown) {
      const authError = error as AuthError;

      if (
        authError.code === AuthErrorCodes.INVALID_EMAIL ||
        authError.code === AuthErrorCodes.INVALID_PASSWORD
      ) {
        alert("Email or password is incorrect! Please try again.");
      } else {
        alert("Something went wrong! Please try again.");
      }
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      const unsubscribeSigninWithGoogle = beforeAuthStateChanged(
        firebaseAuth,
        async (user) => {
          if (!!user) {
            await setUserInfo({
              uid: user.uid,
              data: {
                uid: user.uid,
                email: user.email || "",
                displayName: user.displayName || "",
              },
            });
          }
        }
      );

      await signInWithPopup(firebaseAuth, provider);
      unsubscribeSigninWithGoogle();
    } catch (error: unknown) {
      const authError = error as AuthError;

      if (authError.code === AuthErrorCodes.POPUP_CLOSED_BY_USER) {
        alert("You have closed the popup! Please try again.");
      } else {
        alert("Something went wrong! Please try again.");
      }
    }
  };

  const logout = async () => {
    await signOut(firebaseAuth);
  };

  useEffect(() => {
    const unsubscribeStateChanged = onAuthStateChanged(
      firebaseAuth,
      async (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          setUserId(null);
          setIsAuthLoading(false);
        }
      }
    );

    return unsubscribeStateChanged;
  }, [setIsAuthLoading]);

  useEffect(() => {
    if (isloggedUserFetched) {
      setIsAuthLoading(false);
    }
  }, [isloggedUserFetched]);

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        signInWithGoogle,
        signUp,
        signIn,
        logout,
        isAuthLoading,
        isAuthenticated: !!loggedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
