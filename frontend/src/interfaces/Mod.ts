import type { GameUser } from "./GameUser";
import type { Game } from "./Game";
import type { ModTags } from "./ModTags"

export interface Mod {
  ID: number;
  Title: string;
  Description?: string;
  UploadDate?: string;
  FilePath?: string;
  Status?: string;
  GameUserID?: number;
  GameID?: number;
  GameUser?: GameUser;
  Game?: Game;
  ModTags?: ModTags[];
}