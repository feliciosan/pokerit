"use client";

import { useAuth } from "@/hooks/use-auth.hook";
import { Button } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { CgCardSpades } from "react-icons/cg";

export default function PortalHeader() {
  const { loggedUser, isAuthenticated, logout } = useAuth();

  return (
    <header className="w-full sticky top-0 z-20 dark:bg-neutral-900 bg-teal-600">
      <nav className="flex items-center justify-between h-16 w-full max-w-6xl mx-auto px-4">
        <Fragment>
          <div className="flex items-center gap-4">
            <Link href="/portal">
              <h1 className="text-lg font-bold rounded-md text-white py-1 flex items-center gap-1">
                <CgCardSpades className="inline-block" />
                <span>PokerIt</span>
              </h1>
            </Link>
          </div>
          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <div className="border-r border-teal-700/40 dark:border-neutral-800 pr-4">
                <span className="text-xs text-white font-semibold">
                  {loggedUser?.displayName}
                </span>
              </div>
              <Button
                type="submit"
                className="text-sm/6 font-semibold text-white focus:outline-none"
                onClick={() => logout()}
              >
                Log out
              </Button>
            </div>
          )}
        </Fragment>
      </nav>
    </header>
  );
}
