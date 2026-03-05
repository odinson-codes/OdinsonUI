import { useState, useRef, useEffect } from "react";
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

interface MultiSelectComponentProps<T extends FieldValues> {
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
    defaultValue?: (string | number)[];
    placeholder?: string;
    options: SelectOption[];
    showError?: boolean;
    disabled?: boolean;
    variant?: Variant;
}

const MultiSelect = <T extends FieldValues>({
                                                name,
                                                control,
                                                label,
                                                rules,
                                                className = "",
                                                isReadOnly = false,
                                                id,
                                                defaultValue = [],
                                                placeholder = "Select options...",
                                                options = [],
                                                showError = true,
                                                disabled = false,
                                                variant = "bordered",
                                            }: MultiSelectComponentProps<T>) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleOption = (
        value: string | number,
        currentValues: (string | number)[],
        onChange: (value: (string | number)[]) => void
    ) => {
        const newValues: (string | number)[] = currentValues.includes(value)
            ? currentValues.filter((v) => v !== value)
            : [...currentValues, value];
        onChange(newValues);
    };

    const removeOption = (
        value: string | number,
        currentValues: (string | number)[],
        onChange: (value: (string | number)[]) => void,
        e: React.MouseEvent
    ) => {
        e.stopPropagation();
        const filtered: (string | number)[] = currentValues.filter((v) => v !== value);
        onChange(filtered);
    };

    const getSelectedLabels = (values: (string | number)[]) =>
        values
            .map((val) => options.find((opt) => opt.value === val)?.label)
            .filter(Boolean);

    // --- Variant styles for the trigger ---
    const triggerVariantClasses: Record<
        Variant,
        (hasError: boolean, hasValue: boolean) => string
    > = {
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
                        : "border-gray-300 text-gray-400"
            ),
    };

    // --- Variant styles for the dropdown panel ---
    const dropdownVariantClasses: Record<Variant, string> = {
        flat: "bg-white border border-gray-200 rounded-lg shadow-md",
        bordered: "bg-white border-2 border-gray-800 rounded-md shadow-lg",
        underline: "bg-white border border-gray-200 rounded-md shadow-md",
    };

    // --- Label positioning per variant ---
    const labelLeftClass: Record<Variant, string> = {
        flat: "left-3",
        bordered: "left-3",
        underline: "left-0",
    };

    return (
        <div className="w-full" ref={dropdownRef}>
            <Controller
                control={control}
                defaultValue={(defaultValue || []) as PathValue<T, Path<T>>}
                name={name}
                rules={rules}
                render={({
                             field: { onChange, onBlur, value: fieldValue = [], ref },
                             fieldState: { error },
                         }) => {
                    const selectedValues = Array.isArray(fieldValue) ? fieldValue : [];
                    const selectedLabels = getSelectedLabels(selectedValues);
                    const hasError = !!error;
                    const hasValue = selectedValues.length > 0;

                    return (
                        <>
                            <div className="relative">
                                {/* Trigger */}
                                <div
                                    ref={ref}
                                    onClick={() => {
                                        if (!disabled && !isReadOnly) {
                                            setIsOpen(!isOpen);
                                            setIsFocused(true);
                                        }
                                    }}
                                    onBlur={onBlur}
                                    style={{ outline: "none" }}
                                    className={cn(
                                        "text-sm block w-full transition-all duration-200",
                                        label ? "pt-5 pb-1.5" : "py-2.5",
                                        disabled || isReadOnly
                                            ? "bg-gray-100 cursor-not-allowed opacity-60"
                                            : "cursor-pointer",
                                        triggerVariantClasses[variant](hasError, hasValue),
                                        className
                                    )}
                                >
                                    {/* Selected Tags */}
                                    {hasValue ? (
                                        <div className="flex flex-wrap gap-1 pr-6">
                                            {selectedLabels.map((lbl, index) => (
                                                <span
                                                    key={selectedValues[index]}
                                                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-200 text-gray-800 rounded text-xs"
                                                >
                                                    {lbl}
                                                    {!disabled && !isReadOnly && (
                                                        <button
                                                            type="button"
                                                            onClick={(e) =>
                                                                removeOption(
                                                                    selectedValues[index],
                                                                    selectedValues,
                                                                    onChange,
                                                                    e
                                                                )
                                                            }
                                                            className="hover:text-red-500 transition-colors"
                                                        >
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-gray-400">{placeholder}</span>
                                    )}
                                </div>

                                {/* Floating Label */}
                                {label && (
                                    <label
                                        htmlFor={id || name}
                                        className={cn(
                                            "absolute transition-all duration-200 pointer-events-none",
                                            labelLeftClass[variant],
                                            hasValue || isFocused
                                                ? "top-1.5 text-xs font-medium"
                                                : "top-1/2 -translate-y-1/2 text-sm",
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

                                {/* Arrow Icon */}
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                    <svg
                                        className={cn(
                                            "w-4 h-4 transition-transform duration-200",
                                            isOpen && "rotate-180"
                                        )}
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

                                {/* Dropdown */}
                                {isOpen && !disabled && !isReadOnly && (
                                    <div
                                        className={cn(
                                            "absolute z-50 w-full mt-1 max-h-60 overflow-auto",
                                            dropdownVariantClasses[variant]
                                        )}
                                    >
                                        {options.map((option) => {
                                            const isSelected = selectedValues.includes(option.value);
                                            return (
                                                <div
                                                    key={option.value}
                                                    onClick={() => {
                                                        if (!option.disabled) {
                                                            toggleOption(option.value, selectedValues, onChange);
                                                        }
                                                    }}
                                                    className={cn(
                                                        "flex items-center gap-2 px-4 py-2 transition-colors text-sm",
                                                        option.disabled
                                                            ? "text-gray-300 cursor-not-allowed"
                                                            : "text-gray-800 cursor-pointer hover:bg-gray-100",
                                                        isSelected && "bg-gray-100"
                                                    )}
                                                >
                                                    {/* Checkbox */}
                                                    <div
                                                        className={cn(
                                                            "w-4 h-4 border-2 rounded flex items-center justify-center shrink-0 transition-colors",
                                                            isSelected
                                                                ? "bg-gray-800 border-gray-800"
                                                                : "border-gray-400"
                                                        )}
                                                    >
                                                        {isSelected && (
                                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <span>{option.label}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Error */}
                            {hasError && showError && (
                                <p className="text-xs mt-1 text-red-500">{error.message}</p>
                            )}
                        </>
                    );
                }}
            />
        </div>
    );
};

export default MultiSelect;