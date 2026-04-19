import { Controller } from "react-hook-form";
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import "./Checkbox.css";

interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  label: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

type CheckboxInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "checked" | "onChange" | "name" | "disabled"
>;

type FormCheckboxComponentProps<T extends FieldValues> = FormCheckboxProps<T> &
  CheckboxInputProps;

function Checkbox<T extends FieldValues>({
  name,
  control,
  rules = {},
  label,
  helperText,
  disabled = false,
  className = "",
  ...inputProps
}: FormCheckboxComponentProps<T>) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({
          field: { onChange, value, name: fieldName },
          fieldState: { error },
        }) => (
          <div className={`flex flex-col space-y-1 ${className}`}>
            <label className="flex items-center space-x-2 cursor-pointer">
              <div className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={Boolean(value)}
                  onChange={onChange}
                  name={fieldName}
                  disabled={disabled}
                  className={error ? "error" : ""}
                  {...inputProps}
                />
                <span
                  className={`custom-checkbox-box ${
                    error ? "error" : ""
                  }`}></span>
              </div>
              <span
                className={`text-sm ${disabled ? "opacity-50" : ""} ${error ? "text-red-500" : "text-black"}`}>
                {label}
              </span>
            </label>

            {helperText && !error && (
              <p
                className="text-xs ml-6 text-black"
              >
                {helperText}
              </p>
            )}

            {error && (
              <p
                className="text-xs ml-6 text-black"
                >
                {error.message ?? "This field has an error"}
              </p>
            )}
          </div>
        )}
      />
    </>
  );
}

export default Checkbox;
