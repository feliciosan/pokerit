"use client";

import { useRoom } from "@/hooks/use-room";
import { Button, Field, Input } from "@headlessui/react";
import classNames from "classnames";
import { useForm } from "react-hook-form";

type TJoinerForm = {
  name: string;
};

function JoinerForm() {
  const { room, initializePlayer, isUpdatingRoom } = useRoom();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TJoinerForm>({
    defaultValues: {
      name: "",
    },
    reValidateMode: "onChange",
  });

  async function onSubmit(values: TJoinerForm) {
    if (!room) return;

    const playerUid = `GUEST${Math.random().toString(36).substring(2, 12)}`;
    const playerKey = `${playerUid}_${room.id}`;

    initializePlayer(playerKey, {
      roomId: room.id,
      userName: values.name,
      onCreatePlayer: true,
    });
  }

  return (
    <div className="flex flex-col max-w-md mx-auto px-4">
      <div className="py-6">
        <h1 className="text-xl md:text-2xl font-extrabold line-clamp-2 flex flex-col gap-1 mb-2">
          Join now to get started!
        </h1>
        <p className="text-slate-500 dark:text-white/70">
          Start voting on your team&apos;s planning rooms.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Field disabled={isSubmitting}>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            {...register("name", {
              required: "Name is required.",
            })}
            className={classNames(
              "block w-full rounded-lg border-none dark:bg-neutral-800 bg-slate-200 py-2.5 px-3 text-sm/6 dark:text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-slate-400"
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
          className="w-full rounded-md bg-teal-600 py-2.5 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-teal-700 data-[open]:bg-teal-700 data-[focus]:outline-1 data-[focus]:outline-white"
          disabled={isUpdatingRoom}
        >
          Join
        </Button>
      </form>
    </div>
  );
}

export default JoinerForm;
