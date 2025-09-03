import type { GameUser } from "./GameUser"; 
import type { Game } from "./Game";

export interface OwnerGame {
  ID: number;
  PurchaseDate?: string;
  Status?: string;
  GameUserID?: number;
  GameID?: number;
  GameUser?: GameUser;
  Game?: Game;
}