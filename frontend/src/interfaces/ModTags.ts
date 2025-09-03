import type { Tags } from "./Tags";
import type { Mod } from "./Mod";

export interface ModTags {
  ID: number;
  ModID?: number;
  TagsID?: number;
  Mod?: Mod;
  Tags?: Tags;
}