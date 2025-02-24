"use client";

import React, { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import classNames from "classnames";

import { RiArrowDownSLine, RiCheckLine } from "react-icons/ri";
import { TPokerTechnique } from "@/app/actions/room/room.types";
import { useRoom } from "@/hooks/use-room";
import {
  getTechniques,
  loadInitialTechnique,
} from "../PokerCards/PokerCards.utils";

const techniques = getTechniques();

function SelectTechnique() {
  const { room, updateRoom } = useRoom();
  const [technique, setTechnique] = useState(
    loadInitialTechnique(room?.technique)
  );

  const handleChangeTechnique = async (technique: {
    name: string;
    value: TPokerTechnique;
  }) => {
    setTechnique(technique);

    if (room) {
      await updateRoom({
        id: room.id,
        payload: {
          technique: technique.value,
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <Listbox value={technique} onChange={handleChangeTechnique}>
          <ListboxButton
            className={classNames(
              "relative block w-auto min-w-40 rounded-lg border-none font-semibold dark:bg-neutral-800 bg-slate-200 py-2.5 px-3 pr-8 text-sm/6 dark:text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-slate-400 data-[disabled]:opacity-50",
              "data-[hover]:bg-slate-300 data-[open]:bg-slate-300 dark:data-[hover]:bg-neutral-900 dark:data-[open]:bg-neutral-900"
            )}
          >
            {technique.name}
            <RiArrowDownSLine
              className="group pointer-events-none absolute top-3.5 right-2.5 size-4 dark:fill-white"
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            transition
            className={classNames(
              "w-[var(--button-width)] rounded-xl top-2 border dark:border-white/5 border-slate-300/35 dark:bg-neutral-900 bg-slate-200 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
            )}
          >
            {techniques.map((technique) => (
              <ListboxOption
                key={technique.name}
                value={technique}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-slate-300/35 dark:data-[focus]:bg-white/5"
              >
                <RiCheckLine className="invisible size-4 dark:fill-white group-data-[selected]:visible" />
                <div className="text-sm/6 dark:text-white">
                  {technique.name}
                </div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
    </div>
  );
}

export default SelectTechnique;
