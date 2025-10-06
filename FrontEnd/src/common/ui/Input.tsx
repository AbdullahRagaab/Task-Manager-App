import React from "react";

type InputProps = {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any; // react-hook-form register
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  rows?: number;
};

export default function Input({ label, name, type = "text", placeholder, register, onChange, value, error, className = "", disabled = false, rows = 4 }: InputProps) {
  const registerProps = register ? register(name) : {};

  const commonProps = {
    id: name,
    name,
    placeholder,
    disabled,
    onChange,
    value,
    ...registerProps,
    className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error ? "border-red-500" : "border-gray-300"} ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`,
  };

  return (
    <div className={`h-fit w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-1 text-gray-700">
          {label}
        </label>
      )}

      {type === "textarea" ? <textarea {...commonProps} rows={rows} /> : <input type={type} {...commonProps} />}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
