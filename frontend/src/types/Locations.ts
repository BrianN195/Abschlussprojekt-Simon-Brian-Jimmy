import type { Animal } from "./Animal";

export type Location = {
  id: number;
  name: string;
  description: string;
  region?: string;
  latitude: number
  longtitude: number
  depth: number
};
export type LocationDetail = {
  id: number;
  name: string;
  description: string;
  region?: string;
  animals: Animal[]
  latitude: number
  longtitude: number
  depth: number
};