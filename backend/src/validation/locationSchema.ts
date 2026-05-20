import { z } from "zod";

export const locationSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  region: z.string().min(2),

  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  depth: z.coerce.number().optional(),

  type: z.enum(["reef", "wreck", "cave", "wall", "sandbank"]).default("reef"),
});