import { useState, useRef, useEffect } from "react";
import { Controller } from "react-hook-form";
import type {
    Control,
    RegisterOptions,
    FieldValues,
    PathValue,
    Path,
} from "react-hook-form";
import { cn } from "../../../lib/classmerger.ts";

type Variant = "flat" | "bordered" | "underline";

interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}

interface SelectComponentProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    rules?:
        | Omit<
        RegisterOptions<T, Path<T>>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >
        | undefined;
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

// Variant-specific class builders
const getInputClasses = (
    variant: Variant,
    hasError: boolean,
    hasValue: boolean,
    isFocused: boolean,
    disabled: boolean,
    isReadOnly: boolean,
    hasLabel: boolean,
    className: string
): string => {
    const base = `text-sm block w-full transition-all duration-200 cursor-pointer bg-white text-gray-900 placeholder:text-gray-400`;
    const padding = hasLabel ? "pt-5 pb-2 px-3" : "py-2.5 px-3";
    const disabledClasses = disabled || isReadOnly
        ? "bg-gray-100 cursor-not-allowed opacity-60"
        : "";

    const errorRing = hasError ? "ring-2 ring-red-300" : "";
    const focusRing = isFocused && !hasError ? "ring-2 ring-blue-200" : "";

    if (variant === "flat") {
        return cn(
            base,
            padding,
            "rounded-lg border-0",
            hasError
                ? "bg-red-50 text-red-800"
                : isFocused
                    ? "bg-blue-50"
                    : hasValue
                        ? "bg-gray-100"
                        : "bg-gray-100",
            errorRing,
            focusRing,
            disabledClasses,
            className
        );
    }

    if (variant === "bordered") {
        return cn(
            base,
            padding,
            "rounded-lg border-2",
            hasError
                ? "border-red-500 bg-red-50 text-red-800"
                : isFocused
                    ? "border-blue-500 bg-white"
                    : hasValue
                        ? "border-gray-400 bg-white hover:border-gray-500"
                        : "border-gray-300 bg-white hover:border-gray-400",
            errorRing,
            focusRing,
            disabledClasses,
            className
        );
    }

    // underline variant
    return cn(
        base,
        hasLabel ? "pt-5 pb-1 px-0" : "py-2 px-0",
        "rounded-none border-0 border-b-2 bg-transparent",
        hasError
            ? "border-red-500 text-red-800"
            : isFocused
                ? "border-blue-500"
                : hasValue
                    ? "border-gray-400 hover:border-gray-500"
                    : "border-gray-300 hover:border-gray-400",
        disabled || isReadOnly ? "opacity-60 cursor-not-allowed" : "",
        className
    );
};

const getLabelClasses = (
    variant: Variant,
    hasValue: boolean,
    isFocused: boolean,
    hasError: boolean
): string => {
    const active = hasValue || isFocused;
    const colorClass = hasError
        ? "text-red-600"
        : active
            ? "text-blue-600"
            : "text-gray-500";

    const base = `absolute transition-all duration-200 pointer-events-none ${colorClass}`;

    if (variant === "underline") {
        return cn(
            base,
            active
                ? "left-0 top-0.5 text-xs font-medium"
                : "left-0 top-1/2 -translate-y-1/2 text-sm"
        );
    }

    return cn(
        base,
        active
            ? "left-3 top-1.5 text-xs font-medium"
            : "left-3 top-1/2 -translate-y-1/2 text-sm"
    );
};

const SearchableSelect = <T extends FieldValues>({
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
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full" ref={wrapperRef}>
            <Controller
                control={control}
                defaultValue={(defaultValue || "") as PathValue<T, Path<T>>}
                name={name}
                render={({
                             field: { onChange, onBlur, value: fieldValue },
                             fieldState: { error },
                         }) => {
                    const selectedOption = options.find((opt) => opt.value === fieldValue);
                    const hasValue = Boolean(fieldValue);
                    const hasError = Boolean(error);

                    return (
                        <>
                            <div className="relative">
                                {/* Search Input */}
                                <input
                                    ref={inputRef}
                                    type="text"
                                    style={{ outline: "none" }}
                                    id={id || name}
                                    value={isOpen ? searchTerm : selectedOption?.label || ""}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        if (!isOpen) setIsOpen(true);
                                    }}
                                    onFocus={() => {
                                        setIsFocused(true);
                                        setIsOpen(true);
                                        setSearchTerm("");
                                    }}
                                    onBlur={() => {
                                        setIsFocused(false);
                                        onBlur();
                                        setTimeout(() => {
                                            setSearchTerm("");
                                        }, 200);
                                    }}
                                    disabled={disabled || isReadOnly}
                                    placeholder={!hasValue && !isFocused ? placeholder : ""}
                                    className={getInputClasses(
                                        variant,
                                        hasError,
                                        hasValue,
                                        isFocused,
                                        disabled,
                                        isReadOnly,
                                        Boolean(label),
                                        className
                                    )}
                                />

                                {/* Floating Label */}
                                {label && (
                                    <label
                                        className={getLabelClasses(variant, hasValue, isFocused, hasError)}
                                        htmlFor={id || name}>
                                        {label}
                                    </label>
                                )}

                                {/* Dropdown Arrow Icon */}
                                <div
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                                    onClick={() => {
                                        if (!disabled && !isReadOnly) {
                                            setIsOpen(!isOpen);
                                            inputRef.current?.focus();
                                        }
                                    }}>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>

                                {/* Dropdown Options */}
                                {isOpen && !disabled && !isReadOnly && (
                                    <div className={cn(
                                        "absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto",
                                        variant === "underline" && "left-0"
                                    )}>
                                        {filteredOptions.length === 0 ? (
                                            <div className="px-3 py-2 text-sm text-gray-400 italic">
                                                No options found
                                            </div>
                                        ) : (
                                            filteredOptions.map((option) => (
                                                <div
                                                    key={option.value}
                                                    onClick={() => {
                                                        if (!option.disabled) {
                                                            onChange(option.value);
                                                            setIsOpen(false);
                                                            setSearchTerm("");
                                                        }
                                                    }}
                                                    className={cn(
                                                        "px-3 py-2 text-sm cursor-pointer transition-colors",
                                                        option.disabled
                                                            ? "text-gray-300 cursor-not-allowed"
                                                            : "text-gray-800 hover:bg-blue-50 hover:text-blue-700",
                                                        fieldValue === option.value && "bg-blue-50 text-blue-700 font-medium"
                                                    )}>
                                                    {option.label}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
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
                rules={rules}
            />
        </div>
    );
};

export default SearchableSelect;