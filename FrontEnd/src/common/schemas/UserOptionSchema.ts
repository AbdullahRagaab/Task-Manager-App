import z from "zod";

export const UserOptionSchema = z.object({
  label: z.string(),
  value: z.number(),
});
