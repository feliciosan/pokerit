"use client";

import { useContext } from "react";
import { RoomContext } from "@/context/room";

export function useRoom() {
  const context = useContext(RoomContext);

  if (!context) {
    throw new Error("useRoom must be used within an RoomProvider");
  }

  return context;
}
