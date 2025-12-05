import z from "zod";
import { UserOptionSchema } from "../../../common/schemas/UserOptionSchema";

export const TaskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  status: z.enum(["pending", "in-progress", "completed"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  dueDate: z.string().min(1, "Date is required"),
  assignee: UserOptionSchema,
});

export type TaskData = z.infer<typeof TaskFormSchema>;
