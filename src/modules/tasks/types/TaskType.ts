import type { UserOption } from "../../../common/types/UserOption";

export type TaskType = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  assignee: UserOption;
  dueDate: string;
};

export type TasksWithPagentation = {
  count: number;
  next?: string;
  previous?: string;
  total_pages?: number;
  results: TaskType[];
};
