// components/Select.tsx
import React from "react";

type Option = {
  label: string;
  value: string | number;
};

type SelectProps = {
  label?: string;
  name: string;
  options: Option[];
  register?: any; // from react-hook-form
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string | number;
  error?: string;
  className?: string;
  disabled?: boolean;
};

export default function Select({ label, name, options, register, onChange, value, error, className = "", disabled = false }: SelectProps) {
  const registerProps = register ? register(name) : {};

  return (
    <div className={`h-fit w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-1 text-gray-700 ">
          {label}
        </label>
      )}

      <select id={name} name={name} disabled={disabled} value={value} onChange={onChange} {...registerProps} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error ? "border-red-500" : "border-gray-300"} ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"} ${className}`}>
        {/* <option value="">-- Select --</option> */}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
