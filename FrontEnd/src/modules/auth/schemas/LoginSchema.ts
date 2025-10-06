import z from "zod";

export const LoginFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is requried"),
});

export type LoginFormData = z.infer<typeof LoginFormSchema>;
