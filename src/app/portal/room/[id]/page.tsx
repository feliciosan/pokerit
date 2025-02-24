"use client";

import Spinner from "@/components/Spinner";
import PokerCards from "@/components/PokerCards";
import { useRoom } from "@/hooks/use-room";
import JoinerForm from "@/components/JoinerForm";
import PokerStage from "@/components/PokerStage";
import SelectTechnique from "@/components/SelectTechnique";
import { Button } from "@headlessui/react";
import { TPlayers } from "@/app/actions/room/room.types";
import classNames from "classnames";
import WatchOnlySwitch from "@/components/WatchOnlySwitch";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth.hook";
import { RiArrowLeftSLine, RiFileCopyLine } from "react-icons/ri";
import { useState } from "react";

function RoomPage() {
  const { isAuthenticated } = useAuth();
  const { room, playerId, isLoadingRoom, isOwner, updateRoom } = useRoom();
  const [copied, setCopied] = useState(false);

  const resetCards = async (players: TPlayers) => {
    if (!room) return;

    const playersToUpdate = { ...players };
    Object.keys(playersToUpdate).forEach((playerId) => {
      playersToUpdate[playerId].card = null;
    });

    await updateRoom({
      id: room.id,
      payload: {
        showEstimates: false,
        players: playersToUpdate,
      },
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  if (isLoadingRoom) {
    return (
      <div className="w-full flex justify-center mt-14">
        <Spinner type="local" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="w-full flex justify-center mt-14">
        <p className="text-slate-500 dark:text-white/70">
          You don&apos;t have any rooms yet.
        </p>
      </div>
    );
  }

  if (!playerId) {
    return <JoinerForm />;
  }

  return (
    <div className="flex flex-col flex-grow justify-between">
      {isAuthenticated && (
        <div className="flex justify-between">
          <ul>
            <li>
              <RiArrowLeftSLine className="inline-block text-lg" />
              <Link
                href="/portal"
                className="text-sm/6 font-bold underline underline-offset-4"
              >
                Rooms
              </Link>
            </li>
          </ul>
          <div className="flex gap-2 items-center">
            <strong
              className={classNames({
                "text-teal-600": copied,
              })}
            >
              {copied ? "Copied to clipboard" : "Share this link:"}
            </strong>
            <Button
              onClick={() => handleCopy()}
              className={classNames("hover:text-teal-600", {
                "text-teal-600": copied,
              })}
            >
              <RiFileCopyLine className="inline-block text-2xl" />
            </Button>
          </div>
        </div>
      )}
      <div className="pt-4 pb-6 flex flex-col justify-between md:flex-row">
        <div className="flex-1">
          <p className="text-slate-500 dark:text-white">
            You&apos;re in the room:
          </p>
          <h1 className="text-md md:text-xl font-extrabold line-clamp-2 flex flex-col gap-1">
            {room.name}
          </h1>
        </div>
        <div className="flex flex-col gap-2 md:items-end mt-4 md:mt-0">
          {isOwner && (
            <div className="flex gap-2">
              <SelectTechnique />
              <Button
                onClick={() => resetCards(room.players || {})}
                type="submit"
                className={classNames(
                  "rounded-md min-w-24 dark:bg-neutral-800 bg-slate-200 py-2.5 px-3 text-sm/6 font-semibold",
                  "focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[disabled]:opacity-50",
                  "data-[hover]:bg-slate-300 data-[open]:bg-slate-300 dark:data-[hover]:bg-neutral-900 dark:data-[open]:bg-neutral-900"
                )}
              >
                Reset
              </Button>
              <Button
                onClick={() => {
                  updateRoom({
                    id: room.id,
                    payload: {
                      showEstimates: !room.showEstimates,
                    },
                  });
                }}
                type="submit"
                className="rounded-md min-w-24 bg-teal-600 py-2.5 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-teal-700 data-[open]:bg-teal-700 data-[focus]:outline-1 data-[focus]:outline-white data-[disabled]:opacity-50"
              >
                {room.showEstimates ? "Hide" : "Show"}
              </Button>
            </div>
          )}
          <WatchOnlySwitch />
        </div>
      </div>
      <div className="flex flex-col justify-between flex-1 gap-4 pb-32">
        <div className="flex-1 rounded-md py-4">
          <PokerStage />
        </div>
        <div className="fixed bottom-0 left-0 right-0 py-4 bg-slate-100 dark:bg-neutral-900">
          <PokerCards />
        </div>
      </div>
    </div>
  );
}

export default RoomPage;
