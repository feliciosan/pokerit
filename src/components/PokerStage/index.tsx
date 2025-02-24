"use client";

import classNames from "classnames";
import { useRoom } from "@/hooks/use-room";
import { IoMdInfinite } from "react-icons/io";
import { BsQuestion } from "react-icons/bs";
import { GiCoffeeCup, GiPokerHand } from "react-icons/gi";
import { RiThumbUpFill } from "react-icons/ri";
import { TPlayer, TPlayers } from "@/app/actions/room/room.types";
import { ReactElement, useCallback } from "react";

function PokerStage() {
  const { room, playerId } = useRoom();

  const getOrderedCards = useCallback((players: TPlayers): TPlayer[] => {
    return Object.values(players || {})
      .filter((player) => !player.isWatchOnly)
      .sort(
        (playerA, playerB) =>
          playerA.createdAt.toDate().getTime() -
          playerB.createdAt.toDate().getTime()
      );
  }, []);

  const renderCardValues = useCallback(
    (player: TPlayer): ReactElement | string => {
      switch (player.card) {
        case "INFINITY":
          return <IoMdInfinite />;
        case "QUESTION":
          return <BsQuestion />;
        case "COFFEE":
          return <GiCoffeeCup />;
        case 0.5:
          return "1/2";
        default:
          return String(player.card);
      }
    },
    []
  );

  return (
    <div className="flex flex-wrap gap-2 md:gap-4 w-full justify-center">
      {getOrderedCards(room?.players || {}).map((player, index) => (
        <div key={`${player.name}-${index}`}>
          <div
            className={classNames("p-1 rounded-lg text-center cursor-pointer", {
              "bg-[linear-gradient(-110deg,#0d9488e6_50%,#0d9488_50%)]":
                !!room?.showEstimates,
              "bg-[linear-gradient(-110deg,#262626_50%,#404040_50%)]":
                !room?.showEstimates,
            })}
          >
            <div className="relative flex flex-col items-center justify-center h-36 border border-white/25 rounded-lg p-2 w-28">
              <strong className="text-5xl text-white drop-shadow-lg flex-1 flex items-center justify-center">
                {player.id === playerId && player.card ? (
                  renderCardValues(player)
                ) : !room?.showEstimates ||
                  (room?.showEstimates && !player.card) ? (
                  <GiPokerHand />
                ) : (
                  renderCardValues(player)
                )}
              </strong>
              {!room?.showEstimates && player.card && (
                <RiThumbUpFill className="text-2xl text-white absolute top-2 right-2" />
              )}
            </div>
          </div>
          <p className="mx-auto rounded-md text-xs font-bold text-center truncate mt-2 p-2 dark:bg-neutral-800 bg-slate-100 w-28">
            {player.name}
          </p>
        </div>
      ))}
    </div>
  );
}

export default PokerStage;
