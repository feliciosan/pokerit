"use client";

import withProtected from "@/HOC/protected.route";
import { useAuth } from "@/hooks/use-auth.hook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import RoomService from "../actions/room";
import { Button, Field, Fieldset, Input } from "@headlessui/react";
import classNames from "classnames";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { TRoomCreatePayload } from "../actions/room/room.types";

type TCreateRoomForm = {
  name: string;
};

function PanelPage() {
  const { loggedUser } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCreateRoomForm>({
    defaultValues: {
      name: "",
    },
    reValidateMode: "onChange",
  });

  const {
    data: rooms,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ["get-roms", loggedUser?.uid],
    queryFn: async () => RoomService.findAll(loggedUser?.uid || ""),
    initialData: [],
    enabled: !!loggedUser?.uid,
  });

  const { mutateAsync: createRoom, isPending } = useMutation({
    mutationKey: ["create-room", loggedUser?.uid],
    mutationFn: (payload: TRoomCreatePayload) => RoomService.create(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-roms", loggedUser?.uid],
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        alert(error.message);
      }
    },
  });

  async function onSubmit(values: TCreateRoomForm) {
    await createRoom({
      uid: loggedUser?.uid || "",
      name: values.name,
    });

    reset();
  }

  return (
    <div className="flex flex-col">
      <div className="py-6 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-md md:text-xl font-extrabold line-clamp-2 flex flex-col gap-1">
            Your Planning Rooms
          </h1>
          <p className="text-slate-500 dark:text-white/70">
            Create and manage your planning rooms here.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset className="flex gap-2" disabled={isPending}>
            <Field>
              <Input
                type="text"
                placeholder="Enter a room name..."
                {...register("name", {
                  required: "Name is required.",
                })}
                className={classNames(
                  "block w-full min-w-60 rounded-lg border-none dark:bg-neutral-800 bg-slate-200 py-2.5 px-3 text-sm/6 dark:text-white",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-slate-400 data-[disabled]:opacity-50"
                )}
              />
              {!!errors.name && (
                <p role="alert" className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </Field>
            <Button
              type="submit"
              className="rounded-md bg-teal-600 py-2.5 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-teal-700 data-[open]:bg-teal-700 data-[focus]:outline-1 data-[focus]:outline-white data-[disabled]:opacity-50"
            >
              Create
            </Button>
          </Fieldset>
        </form>
      </div>
      {isFetching && !isFetched ? (
        <div className="w-full flex justify-center mt-14">
          <Spinner type="local" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {rooms.map((room) => (
            <div key={room.id} className="w-full">
              <Link href={`/portal/room/${room.id}`}>
                <div className="dark:bg-neutral-800 bg-slate-100 rounded-lg p-4 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div>
                      <span className="text-xl font-semibold rounded-full h-8 w-8 flex items-center justify-center bg-teal-600 text-white">
                        {room.name[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm">
                        <span className="font-bold">Room: </span>
                        {room.name}
                      </h3>
                      <p className="text-xs">
                        <span className="font-bold">Created at: </span>
                        {room.createdAt.toDate().toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default withProtected(PanelPage);
