import React from "react";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number" | "textarea";
  placeholder?: string;
  rows?: number;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type = "number",
  placeholder,
  rows = 3,
  className = "",
}) => {
  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (value === "0") {
      onChange("");
    }
    e.target.select();
  };

  const handleBlur = () => {
    if (type === "number" && (value === "" || value === "0")) {
      onChange("0");
    }
  };

  const baseClasses = `input-field ${className}`;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          rows={rows}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder || "0"}
          className={baseClasses}
          inputMode={type === "number" ? "numeric" : undefined}
        />
      )}
    </div>
  );
};
