import type { GameUser } from "./GameUser";
import type { Mod } from "./Mod";

export interface ModRating {
  ID: number;
  Rating: string;
  Review?: string;
  PurchaseDate?: string;
  GameUserID?: number;
  ModID?: number;
  GameUser?: GameUser;
  Mod?: Mod;
}