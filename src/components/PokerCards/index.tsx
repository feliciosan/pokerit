"use client";

import React, { Fragment } from "react";
import { IoMdInfinite } from "react-icons/io";
import { GiCoffeeCup } from "react-icons/gi";
import { BsQuestion } from "react-icons/bs";
import classNames from "classnames";
import { loadTechniqueValues } from "./PokerCards.utils";
import { TPokerCard } from "@/app/actions/room/room.types";
import { useRoom } from "@/hooks/use-room";

function PokerCards() {
  const { room, playerId, updateRoom } = useRoom();
  const techniqueValues = loadTechniqueValues(room?.technique);

  const handleSetCard = async (card: TPokerCard) => {
    if (!room) return;

    const playerKey = `players.${playerId}.card`;
    await updateRoom({
      id: room.id,
      payload: {
        [playerKey]: card,
      },
    });
  };

  return (
    <div className="flex">
      <div className="overflow-x-auto scrollbar-hide whitespace-nowrap snap-x snap-mandatory mx-auto w-auto max-w-full">
        <div className="inline-flex space-x-2 px-2">
          {techniqueValues.map((techniqueValue, index) => (
            <div
              key={index}
              onClick={() => handleSetCard(techniqueValue)}
              className={classNames(
                "p-1 rounded-lg text-center cursor-pointer snap-center",
                "bg-[linear-gradient(-110deg,#0d9488e6_50%,#0d9488_50%)]"
              )}
            >
              <div className="flex items-center justify-center h-20 border border-white/25 rounded-lg p-2 w-14">
                <strong className="text-2xl text-white drop-shadow-lg">
                  {techniqueValue === 0.5 ? "1/2" : techniqueValue}
                </strong>
              </div>
            </div>
          ))}
          {room?.technique === "PLANNING_POKER" && (
            <Fragment>
              <div
                onClick={() => handleSetCard("INFINITY")}
                className={classNames(
                  "p-1 rounded-lg text-center cursor-pointer snap-center",
                  "bg-[linear-gradient(-110deg,#0d9488e6_50%,#0d9488_50%)]"
                )}
              >
                <div className="flex-1 flex items-center justify-center h-20 border border-white/25 rounded-lg p-2 w-14">
                  <strong className="text-4xl text-white">
                    <IoMdInfinite />
                  </strong>
                </div>
              </div>
              <div
                onClick={() => handleSetCard("QUESTION")}
                className={classNames(
                  "p-1 rounded-lg text-center cursor-pointer snap-center",
                  "bg-[linear-gradient(-110deg,#0d9488e6_50%,#0d9488_50%)]"
                )}
              >
                <div className="flex-1 flex items-center justify-center h-20 border border-white/25 rounded-lg p-2 w-14">
                  <strong className="text-4xl text-white">
                    <BsQuestion />
                  </strong>
                </div>
              </div>
              <div
                onClick={() => handleSetCard("COFFEE")}
                className={classNames(
                  "p-1 rounded-lg text-center cursor-pointer snap-center",
                  "bg-[linear-gradient(-110deg,#0d9488e6_50%,#0d9488_50%)]"
                )}
              >
                <div className="flex-1 flex items-center justify-center h-20 border border-white/25 rounded-lg p-2 w-14">
                  <strong className="text-4xl text-white">
                    <GiCoffeeCup />
                  </strong>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokerCards;
