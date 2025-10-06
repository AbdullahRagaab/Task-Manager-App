import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "user"], {
    errorMap: () => ({ message: "Role must be either admin or user" }),
  }),
  username: z.string().min(1, "Username is required"),
  full_name: z.string().min(1, "Full name is required"),
  profile_picture: z.string().optional(),
});

export type UserData = z.infer<typeof UserSchema>;
