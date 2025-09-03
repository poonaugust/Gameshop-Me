import type { ModTags } from "./ModTags";

export interface Tags {
  ID: number;
  Title: string;
  ModTags?: ModTags[];
}