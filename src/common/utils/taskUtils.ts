// /src/common/utils/taskUtils.ts
import type { TaskType } from "../../modules/tasks/types/TaskType";

export const extractTasksFromResponse = (data: unknown): TaskType[] => {
  if (!data) return [];
  
  if (Array.isArray(data)) {
    return data;
  }
  
  if (data && typeof data === 'object' && 'results' in data) {
    const typedData = data as { results?: unknown[] };
    return Array.isArray(typedData.results) ? typedData.results as TaskType[] : [];
  }
  
  console.warn('Unexpected tasks data format:', data);
  return [];
};