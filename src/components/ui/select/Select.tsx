import { useState } from "react";
import { Controller } from "react-hook-form";
import type {
    Control,
    RegisterOptions,
    FieldValues,
    PathValue,
    Path,
} from "react-hook-form";
import {cn} from "../../../lib/classmerger.ts";

type Variant = "flat" | "bordered" | "underline";

interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}

interface SelectComponentProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    rules?: Omit<
        RegisterOptions<T, Path<T>>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
    label?: string;
    className?: string;
    isReadOnly?: boolean;
    id?: string;
    defaultValue?: string;
    placeholder?: string;
    options: SelectOption[];
    showError?: boolean;
    disabled?: boolean;
    variant?: Variant;
}

const Select = <T extends FieldValues>({
                                           name,
                                           control,
                                           label,
                                           rules,
                                           className = "",
                                           isReadOnly = false,
                                           id,
                                           defaultValue = "",
                                           placeholder,
                                           options = [],
                                           showError = true,
                                           disabled = false,
                                           variant = "bordered",
                                       }: SelectComponentProps<T>) => {
    const [isFocused, setIsFocused] = useState(false);

    const baseSelectClasses = cn(
        "text-sm block w-full transition-all duration-200 appearance-none bg-white outline-none",
        label ? "pt-5 pb-1.5" : "py-2.5",
        disabled || isReadOnly
            ? "bg-gray-100 cursor-not-allowed opacity-60"
            : "cursor-pointer"
    );

    const variantClasses: Record<Variant, (hasError: boolean, hasValue: boolean) => string> = {
        flat: (hasError, hasValue) =>
            cn(
                "px-3 rounded-lg border-0",
                hasError
                    ? "bg-red-50 text-red-700 ring-2 ring-red-300"
                    : hasValue || isFocused
                        ? "bg-gray-100 text-gray-900"
                        : "bg-gray-100 text-gray-400",
                isFocused && !hasError && "ring-2 ring-gray-400"
            ),

        bordered: (hasError, hasValue) =>
            cn(
                "px-3 rounded-md border-2",
                hasError
                    ? "border-red-500 text-red-700 ring-4 ring-red-100"
                    : hasValue || isFocused
                        ? "border-gray-800 text-gray-900"
                        : "border-gray-300 text-gray-400",
                isFocused && !hasError && "ring-4 ring-gray-200",
                !disabled && !isReadOnly && "hover:border-gray-400"
            ),

        underline: (hasError, hasValue) =>
            cn(
                "px-0 border-0 border-b-2 rounded-none bg-transparent",
                hasError
                    ? "border-red-500 text-red-700"
                    : hasValue || isFocused
                        ? "border-gray-800 text-gray-900"
                        : "border-gray-300 text-gray-400",
                isFocused && !hasError && "border-gray-800"
            ),
    };

    const labelBaseClasses =
        "absolute left-3 transition-all duration-200 pointer-events-none";

    const labelVariantClasses: Record<Variant, string> = {
        flat: "left-3",
        bordered: "left-3",
        underline: "left-0",
    };

    const floatedLabelClasses = "top-1.5 text-xs font-medium";
    const defaultLabelClasses = "top-1/2 -translate-y-1/2 text-sm";

    return (
        <div className="w-full">
            <Controller
                control={control}
                defaultValue={(defaultValue || "") as PathValue<T, Path<T>>}
                name={name}
                rules={rules}
                render={({
                             field: { onChange, onBlur, value: fieldValue, ref },
                             fieldState: { error },
                         }) => {
                    const hasError = !!error;
                    const hasValue = !!fieldValue;

                    return (
                        <>
                            <div className="relative">
                                <select
                                    ref={ref}
                                    id={id || name}
                                    value={fieldValue || ""}
                                    onChange={onChange}
                                    onBlur={() => {
                                        onBlur();
                                        setIsFocused(false);
                                    }}
                                    onFocus={() => setIsFocused(true)}
                                    disabled={disabled || isReadOnly}
                                    className={cn(
                                        baseSelectClasses,
                                        variantClasses[variant](hasError, hasValue),
                                        className
                                    )}
                                >
                                    <option value="" disabled>
                                        {placeholder}
                                    </option>
                                    {options.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                            disabled={option.disabled}
                                            className="bg-white text-gray-900 disabled:text-gray-400"
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>

                                {/* Floating Label */}
                                {label && (
                                    <label
                                        htmlFor={id || name}
                                        className={cn(
                                            labelBaseClasses,
                                            labelVariantClasses[variant],
                                            hasValue || isFocused
                                                ? floatedLabelClasses
                                                : defaultLabelClasses,
                                            hasError
                                                ? "text-red-500"
                                                : hasValue || isFocused
                                                    ? "text-gray-700"
                                                    : "text-gray-400"
                                        )}
                                    >
                                        {label}
                                    </label>
                                )}

                                {/* Dropdown Arrow */}
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Error Message */}
                            {hasError && showError && (
                                <p className="text-xs mt-1 text-red-500">
                                    {error.message}
                                </p>
                            )}
                        </>
                    );
                }}
            />
        </div>
    );
};

export default Select;