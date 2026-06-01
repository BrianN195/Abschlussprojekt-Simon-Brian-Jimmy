import { z } from "zod";

export const animalSchema = z.object({
  name: z.string().min(2),
  scientificName: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),

  dangerLevel: z.coerce.number().min(0).max(10),

  size: z.string().optional(),
  weight: z.string().optional(),
  habitat: z.string().optional(),

  bestViewingTime: z.preprocess((value) => {
    if (typeof value === "string") {
      if (value === "") return undefined;
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // ignore parse errors
      }
      return [value];
    }
    return value;
  }, z.array(z.string()).optional()),

  depthRange: z.string().optional(),
  diet: z.string().optional(),

  isSchooling: z.coerce.boolean().optional(),
});