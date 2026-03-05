import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { ComponentType } from "react";
import { Controller } from "react-hook-form";
import type {
    Control,
    RegisterOptions,
    FieldValues,
    Path,
    PathValue,
} from "react-hook-form";
import {cn} from "../../lib/classmerger.ts";

type Variant = "flat" | "bordered" | "underline";
type Radius = "none" | "sm" | "md" | "lg" | "xl" | "full";

interface InputComponentProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    variant?: Variant;
    rules?: Omit<
        RegisterOptions<T, Path<T>>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
    label?: string;
    type?: string;
    inputClassName?: string;
    icon?: ComponentType<{ className?: string }>;
    isReadOnly?: boolean;
    iconClassName?: string;
    id?: string;
    value?: string;
    placeholder?: string;
    maxLength?: number;
    numberOnly?: boolean;
    phoneNumber?: boolean;
    radius?: Radius;
}

const baseInput = [
    "w-full px-4 pt-6 pb-2",
    "text-sm text-zinc-800 placeholder-transparent",
    "outline-none transition-all duration-200",
    "caret-zinc-700",
    "peer",
];

const variantStyles: Record<Variant, {
    default: string;
    focus: string;
    error: string;
    errorFocus: string;
    readOnly: string;
}> = {
    flat: {
        default:    "bg-zinc-100 border-transparent border-2 rounded-lg",
        focus:      "focus:bg-zinc-200 focus:border-zinc-400",
        error:      "bg-red-50 border-transparent",
        errorFocus: "focus:bg-red-100 focus:border-red-400",
        readOnly:   "bg-zinc-200 border-transparent cursor-not-allowed",
    },
    bordered: {
        default:    "bg-transparent border-2 border-zinc-300 rounded-lg",
        focus:      "focus:border-zinc-700",
        error:      "bg-transparent border-2 border-red-400",
        errorFocus: "focus:border-red-600",
        readOnly:   "bg-transparent border-2 border-zinc-200 cursor-not-allowed",
    },
    underline: {
        default:    "bg-transparent border-b-2 border-zinc-300 rounded-none px-0",
        focus:      "focus:border-zinc-700",
        error:      "bg-transparent border-b-2 border-red-400",
        errorFocus: "focus:border-red-600",
        readOnly:   "bg-transparent border-b-2 border-zinc-200 cursor-not-allowed",
    },
};

const radiusMap: Record<Radius, string> = {
    none: "rounded-none",
    sm:   "rounded-sm",
    md:   "rounded-md",
    lg:   "rounded-lg",
    xl:   "rounded-xl",
    full: "rounded-full",
};

// Label floats up when focused or filled
const labelBase = "absolute left-4 pointer-events-none transition-all duration-200 text-zinc-400";
const labelFloat = "top-1 text-xs";
const labelRest  = "top-4 text-sm";

const Input = <T extends FieldValues>({
                                          name,
                                          control,
                                          variant = "bordered",
                                          rules,
                                          label,
                                          type = "text",
                                          inputClassName,
                                          icon: Icon,
                                          isReadOnly = false,
                                          iconClassName,
                                          id,
                                          maxLength,
                                          value,
                                          placeholder,
                                          phoneNumber = false,
                                          radius = "md",
                                          numberOnly = false,
                                      }: InputComponentProps<T>) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused]       = useState(false);
    const isPasswordField = type === "password";
    const styles = variantStyles[variant];
    // underline variant ignores radius
    const radiusClass = variant === "underline" ? "" : radiusMap[radius];

    return (
        <div className="relative flex flex-col gap-1">
            <Controller
                control={control}
                defaultValue={(value || "") as PathValue<T, Path<T>>}
                name={name}
                rules={rules}
                render={({
                             field: { onChange, onBlur, value: fieldValue, ref },
                             fieldState: { error },
                         }) => (
                    <>
                        <div className="relative">
                            <input
                                ref={ref}
                                id={id || name}
                                style={{ outline: "none", boxShadow: "none" }}
                                className={cn(
                                    baseInput,
                                    radiusClass,
                                    isReadOnly
                                        ? styles.readOnly
                                        : error
                                            ? [styles.error, styles.errorFocus]
                                            : [styles.default, styles.focus],
                                    inputClassName
                                )}
                                placeholder={placeholder || label || ""}
                                readOnly={isReadOnly}
                                maxLength={maxLength}
                                type={isPasswordField && showPassword ? "text" : type}
                                value={fieldValue}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => { setIsFocused(false); onBlur(); }}
                                onChange={(e) => {
                                    let input = e.target.value;
                                    if (numberOnly) input = input.replace(/[^0-9*]/g, "");
                                    if (phoneNumber) {
                                        const filtered = input.replace(/[^0-9*]/g, "");
                                        input = filtered[0] === "9" ? filtered.slice(0, 10) : "";
                                    }
                                    onChange(input);
                                }}
                            />

                            {label && (
                                <label
                                    htmlFor={id || name}
                                    className={cn(
                                        labelBase,
                                        variant === "underline" && "left-0",
                                        fieldValue || isFocused ? labelFloat : labelRest,
                                        error
                                            ? "text-red-500"
                                            : fieldValue || isFocused
                                                ? "text-zinc-600"
                                                : "text-zinc-400"
                                    )}>
                                    {label}
                                </label>
                            )}
                        </div>

                        {error && (
                            <p className="text-xs text-red-500 mt-0.5">
                                {error.message}
                            </p>
                        )}
                    </>
                )}
            />

            {/* Password toggle */}
            {isPasswordField && (
                <button
                    type="button"
                    className="absolute right-3 top-4 text-zinc-400 hover:text-zinc-600 transition-colors z-10"
                    onClick={() => setShowPassword((p) => !p)}>
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
            )}

            {/* Custom icon (non-password fields only) */}
            {Icon && !isPasswordField && (
                <Icon className={cn("absolute right-3 top-4 text-zinc-400 text-xl", iconClassName)} />
            )}
        </div>
    );
};

export default Input;