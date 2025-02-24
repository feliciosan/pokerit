"use client";

import { useEffect, useState } from "react";
import { useRoom } from "@/hooks/use-room";
import { Switch } from "@headlessui/react";

function WatchOnlySwitch() {
  const { updateRoom, room, playerId } = useRoom();
  const [isWatchOnly, setIsWatchOnly] = useState(false);

  const handleSwitch = async (value: boolean) => {
    if (!room) return;

    setIsWatchOnly(value);
    await updateRoom({
      id: room.id,
      payload: {
        [`players.${playerId}.isWatchOnly`]: value,
      },
    });
  };

  useEffect(() => {
    if (!room || !playerId) return;
    setIsWatchOnly(room?.players?.[playerId].isWatchOnly || false);
  }, [room, playerId]);

  return (
    <div className="flex gap-2 items-center">
      <strong className="text-sm/6">Watch only:</strong>
      <Switch
        checked={isWatchOnly}
        onChange={() => handleSwitch(!isWatchOnly)}
        className="group relative flex h-7 w-14 cursor-pointer rounded-full dark:bg-neutral-800 bg-slate-200 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white group-data-[checked]:bg-teal-600 ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
        />
      </Switch>
    </div>
  );
}

export default WatchOnlySwitch;
