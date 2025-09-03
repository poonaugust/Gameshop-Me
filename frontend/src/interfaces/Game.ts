import type { OwnerGame } from "./OwnerGame";
import type { Mod } from "./Mod";

export interface Game {
  ID: number;
  Title: string;
  Description?: string;
  OwnerGame?: OwnerGame[];
  Mod?: Mod[];
}