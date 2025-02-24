import { TPokerTechnique } from "@/app/actions/room/room.types";

const getSequentialRange = (
  start: number = 1,
  end: number = 10,
  interval: number = 1
) => {
  const items = [];

  while (start <= end) {
    items.push(start);
    start += interval;
  }

  return items;
};

export const loadTechniqueValues = (technique: TPokerTechnique | undefined) => {
  const techniques: Record<TPokerTechnique, number[]> = {
    PLANNING_POKER: [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100],
    FIBONACCI: [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
    SEQUENTIAL: getSequentialRange(1, 12, 1),
  };

  if (!technique) {
    return techniques["PLANNING_POKER"];
  }

  return techniques[technique];
};

export const getTechniques = (): { name: string; value: TPokerTechnique }[] => {
  return [
    {
      name: "Planning Poker",
      value: "PLANNING_POKER",
    },
    {
      name: "Fibonacci",
      value: "FIBONACCI",
    },
    {
      name: "Sequential",
      value: "SEQUENTIAL",
    },
  ];
};

export const loadInitialTechnique = (
  initialTechnique: TPokerTechnique | undefined
) => {
  const techniques = getTechniques();
  return (
    techniques.find((technique) => technique.value === initialTechnique) ||
    techniques[0]
  );
};
