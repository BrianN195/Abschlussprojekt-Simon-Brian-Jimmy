import type { Animal } from "./Animal";

export type Location = {
  id: number;
  name: string;
  description: string;
  region: string;
  latitude: number;
  longitude: number;
  depth: number;
  type: "reef" | "wreck" | "cave" | "wall" | "sandbank";
  imageUrl: string;
};
export type LocationDetail = {
  id: number;
  name: string;
  description: string;
  region: string;
  latitude: number;
  longitude: number;
  depth: number;
  type: "reef" | "wreck" | "cave" | "wall" | "sandbank";
  imageUrl: string;
  animals: Animal[];
};
