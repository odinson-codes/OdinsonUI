import { Controller, type Path } from "react-hook-form";
import type { Control, RegisterOptions, FieldValues } from "react-hook-form";
import "./RadioButton.css";

interface RadioButtonProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?:
    | Omit<
        RegisterOptions<T, Path<T>>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  label: string;
  value: string | number;
  isReadOnly?: boolean;
  className?: string;
  disabled?: boolean;
}

const RadioButton = <T extends FieldValues>({
  control,
  name,
  label,
  value: radioValue,
  className = "",
  isReadOnly = false,
  disabled = false,
  rules,
}: RadioButtonProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value: fieldValue, ref },
        fieldState: { error },
      }) => (
        <div className={`relative ${className}`}>
          <label className="flex items-center space-x-2 cursor-pointer">
            <div className="custom-radio">
              <input
                type="radio"
                ref={ref}
                checked={fieldValue === radioValue}
                onChange={(e) => {
                    if (!isReadOnly) {
                        const v = typeof radioValue === "number" ? Number(e.target.value) : e.target.value;
                        onChange(v);
                    }
                }}
                onBlur={onBlur}
                value={radioValue}
                disabled={disabled}
                readOnly={isReadOnly}
              />
              <span className={`custom-radio-box ${error ? "error" : ""}`} />
            </div>
            <span
              className={`text-sm ${
                error ? "text-red-500" : "text-black"
              } ${disabled ? "opacity-50" : ""}`}>
              {label}
            </span>
          </label>

          {error && (
            <p className="text-xs text-red-500 ml-6 mt-1">
              {error.message ?? "This field has an error"}
            </p>
          )}
        </div>
      )}
      rules={rules}
    />
  );
};

export default RadioButton;
