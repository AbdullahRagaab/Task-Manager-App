export function formatDateToInput(date: Date | undefined): string {
  if (date === undefined) return "";
  return date.toISOString().split("T")[0];
}
