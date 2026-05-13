import type { Location } from "./Locations";

export type Animal = {
  id: number;
  name: string;
  scientificName: string;
  description: string;
  category: string;
  dangerLevel: number;
  imageUrl: string;
  size?: string;
  weight?: string;
  habitat?: string; 
  bestViewingTime: string[];
  depthRange?: string; 
  diet?: string; 
  isSchooling?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
export type AnimalDetail = {
  id: number;
  name: string;
  scientificName: string;
  description: string;
  category: string;
  dangerLevel: number;
  imageUrl: string;
  size?: string;
  weight?: string;
  habitat?: string; 
  bestViewingTime: string[];
  depthRange?: string; 
  diet?: string; 
  isSchooling?: boolean;

  createdAt?: string;
  updatedAt?: string;
  locations: Location[];
};