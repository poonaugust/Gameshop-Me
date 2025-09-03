import type { OwnerGame } from "./OwnerGame";
import type { Mod } from "./Mod";
import type { ModRating } from "./ModRating";

export interface GameUser {
  ID: number;
  Username: string;
  Password?: string;
  Email: string;
  FirstName?: string;
  LastName?: string;
  Birthday?: string;
  OwnerGame?: OwnerGame[];
  Mod?: Mod[];
  ModRating?: ModRating[];
}