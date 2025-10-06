// src/common/ui/AsyncSelectInput.tsx
import AsyncSelect from "react-select/async";
import { Controller } from "react-hook-form";
import type { AsyncProps } from "react-select/async";
import type { GroupBase } from "react-select";

type OptionType = {
  label: string;
  value: number | string;
};

type AsyncSelectInputProps = {
  name: string;
  label?: string;
  control: any;
  error?: string;
  className?: string;
} & Omit<AsyncProps<OptionType, false, GroupBase<OptionType>>, "name">;

export default function AutoComplete({
  name,
  label,
  control,
  error,
  className = "",
  ...rest // all other props to pass to AsyncSelect
}: AsyncSelectInputProps) {
  return (
    <div className={`mb-4 w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-1 text-gray-700">
          {label}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        defaultValue={rest.defaultValue ?? null}
        render={({ field }) => (
          <AsyncSelect
            {...field}
            {...rest}
            onChange={(val) => {
              console.log("val", val);

              field.onChange(val);
            }}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: error ? "#f87171" : "#d1d5db",
                boxShadow: state.isFocused ? "0 0 0 2px rgba(59,130,246,0.5)" : "",
                "&:hover": {
                  borderColor: error ? "#f87171" : "#60a5fa",
                },
              }),
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
              ...(rest.styles || {}),
            }}
          />
        )}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
