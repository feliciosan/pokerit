"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";
import { TRoom, TRoomUpdatePayload } from "@/app/actions/room/room.types";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import RoomService from "@/app/actions/room";
import { useAuth } from "@/hooks/use-auth.hook";
import { Timestamp } from "firebase/firestore";

type TAuthContext = {
  room: TRoom | null;
  playerId: string | null;
  isLoadingRoom: boolean;
  isUpdatingRoom: boolean;
  isOwner: boolean;
  initializePlayer: (
    playerKey: string,
    data: {
      roomId: string;
      userName: string;
      onCreatePlayer?: boolean;
    }
  ) => void;
  updateRoom: (data: {
    id: string;
    payload: TRoomUpdatePayload;
  }) => Promise<void>;
};

const getLocalStorageUserKey = (roomId: string) => {
  const localStoragePlayerKey = localStorage.getItem("playerKey");

  if (!localStoragePlayerKey) return null;

  const localStorageRoomId = localStoragePlayerKey.split("_")[1];
  const isAnotherRoom = roomId !== localStorageRoomId;

  if (isAnotherRoom) return null;

  return localStoragePlayerKey;
};

const setLocalStoragePlayerKey = (playerKey: string) => {
  localStorage.setItem("playerKey", playerKey);
};

export const RoomContext = createContext<TAuthContext | undefined>(undefined);

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  const params = useParams<{ id: string }>();
  const { loggedUser, isAuthLoading } = useAuth();
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [room, setRoom] = useState<TRoom | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isLoadingRoom, setIsLoadingRoom] = useState(true);

  const snapshotCallback = (room: TRoom | null) => setRoom(room);

  useQuery({
    queryKey: ["get-rom", params.id],
    queryFn: async () =>
      RoomService.findOneSnapshot(params.id || "", snapshotCallback),
    initialData: null,
    enabled: !!params.id,
  });

  const { mutateAsync: updateRoom, isPending: isUpdatingRoom } = useMutation({
    mutationKey: ["update-room"],
    mutationFn: (data: { id: string; payload: TRoomUpdatePayload }) =>
      RoomService.update(data.id, data.payload),
    onError: (error) => {
      if (error instanceof Error) {
        alert(error.message);
      }
    },
  });

  const initializePlayer = useCallback(
    async (
      playerKey: string | null,
      data?: { roomId: string; userName: string; onCreatePlayer?: boolean }
    ) => {
      if (data && data.onCreatePlayer) {
        await updateRoom({
          id: data.roomId,
          payload: {
            [`players.${playerKey}.id`]: playerKey,
            [`players.${playerKey}.name`]: data.userName,
            [`players.${playerKey}.createdAt`]: Timestamp.now(),
            [`players.${playerKey}.isWatchOnly`]: false,
          },
        });
      }

      setPlayerId(playerKey);
      setLocalStoragePlayerKey(playerKey || "");

      if (playerKey) {
        setIsOwner(loggedUser?.uid === room?.uid);
      }

      setIsLoadingRoom(false);
    },
    [loggedUser?.uid, room?.uid, updateRoom]
  );

  useEffect(() => {
    if (!room || playerId || isAuthLoading) return;

    const playerKey = getLocalStorageUserKey(room.id);

    if (playerKey) {
      const playerIsInRoom = !!room?.players?.[playerKey];
      initializePlayer(playerIsInRoom ? playerKey : "");
      return;
    }

    if (loggedUser) {
      const playerKey = `${loggedUser.uid}_${room.id}`;
      initializePlayer(playerKey, {
        roomId: room.id,
        userName: loggedUser.displayName || "",
        onCreatePlayer: true,
      });
      return;
    }

    initializePlayer("");
  }, [initializePlayer, isAuthLoading, loggedUser, playerId, room]);

  useEffect(() => {
    if (!room?.uid) return;
    setIsOwner(room.uid === loggedUser?.uid);
  }, [loggedUser?.uid, room?.uid]);

  return (
    <RoomContext.Provider
      value={{
        room,
        playerId,
        isLoadingRoom,
        isOwner,
        initializePlayer,
        updateRoom,
        isUpdatingRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
