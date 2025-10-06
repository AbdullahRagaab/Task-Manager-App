import type { UseFormSetError, Path, FieldValues } from "react-hook-form";

export function handleServerErrors<T extends FieldValues>(error: any, setError: UseFormSetError<T>) {
  if (error?.response?.data) {
    const serverErrors = error.response.data;

    Object.entries(serverErrors).forEach(([field, messages]) => {
      setError(field as Path<T>, {
        type: "server",
        message: (Array.isArray(messages) ? messages[0] : messages) || "Error",
      });
    });
  } else {
    console.error("Unknown error:", error);
  }
}
