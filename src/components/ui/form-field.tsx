"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: string | null;
  validate?: (value: string) => string | null;
  rows?: number;
  min?: string | number;
  className?: string;
}

export function FormField({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  defaultValue,
  disabled,
  error: externalError,
  validate,
  rows,
  min,
  className = "",
}: FormFieldProps) {
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState(defaultValue || "");
  const [internalError, setInternalError] = useState<string | null>(null);

  const error = externalError || (touched ? internalError : null);

  const handleBlur = () => {
    setTouched(true);
    if (validate) {
      setInternalError(validate(value));
    } else if (required && !value.trim()) {
      setInternalError(`${label} wajib diisi`);
    } else {
      setInternalError(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (touched && validate) {
      setInternalError(validate(e.target.value));
    } else if (touched && required && !e.target.value.trim()) {
      setInternalError(`${label} wajib diisi`);
    } else if (touched) {
      setInternalError(null);
    }
  };

  const inputClasses = `w-full px-4 py-3 border rounded-xl bg-background text-foreground placeholder:text-muted focus:ring-2 focus:border-transparent outline-none transition-all disabled:opacity-50 ${
    error 
      ? "border-red-500 focus:ring-red-500" 
      : "border-border focus:ring-accent"
  } ${className}`;

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {rows ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          min={min}
          onBlur={handleBlur}
          onChange={handleChange}
          className={inputClasses}
        />
      )}

      {error && (
        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}
