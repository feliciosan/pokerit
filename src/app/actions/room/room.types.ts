import { Timestamp } from "firebase/firestore";

export type TPokerTechnique = "PLANNING_POKER" | "FIBONACCI" | "SEQUENTIAL";
export type TPokerCard = number | "INFINITY" | "QUESTION" | "COFFEE" | null;

export type TPlayer = {
  id: string;
  card: TPokerCard;
  name: string;
  isWatchOnly: boolean;
  createdAt: Timestamp;
};

export type TPlayers = Record<string, TPlayer>;

export type TRoom = {
  id: string;
  uid: string;
  name: string;
  createdAt: Timestamp;
  technique?: TPokerTechnique;
  players?: TPlayers;
  showEstimates?: boolean;
};

export type TRoomCreatePayload = Partial<Pick<TRoom, "name" | "uid">>;

export type TRoomUpdatePayload = Partial<
  Pick<TRoom, "name" | "technique" | "showEstimates" | "players">
>;
