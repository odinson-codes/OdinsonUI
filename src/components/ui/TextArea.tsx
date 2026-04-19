import { useEffect, useState } from "react";
import { Controller, type Path, type PathValue } from "react-hook-form";
import type {
    Control,
    RegisterOptions,
    FieldPath,
    FieldValues,
} from "react-hook-form";

interface TextAreaCompProps<T extends FieldValues> {
    name: FieldPath<T>;
    label?: string;
    control: Control<T>;
    rules?: RegisterOptions<T>;
    className?: string;
    placeholder?: string;
    defaultValue?: string;
    disabled?: boolean;
    required?: boolean;
}

const TextArea = <T extends FieldValues>({
                                                 name,
                                                 label,
                                                 control,
                                                 rules,
                                                 className = "",
                                                 placeholder,
                                                 defaultValue,
                                                 disabled = false,
                                             }: TextAreaCompProps<T>) => {
    // Initialize with actual window width if available (for client-side rendering)
    const [screenWidth, setScreenWidth] = useState(() =>
        typeof window !== "undefined" ? window.innerWidth : 1024
    );
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        // Only set up resize listener, no setState needed here
        const handleResize = () => setScreenWidth(window.innerWidth);

        // Set initial width if it wasn't set during useState initialization
        if (screenWidth === 1024 && window.innerWidth !== 1024) {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty dependency array is fine now

    const getRows = () => {
        if (screenWidth >= 1536) return 10; // 2xl
        if (screenWidth >= 1280) return 8; // xl
        if (screenWidth >= 1024) return 6; // lg
        if (screenWidth >= 768) return 4; // md
        return 4; // default for smaller screens
    };

    return (
        <div className="w-full">
            <Controller
                name={name}
                control={control}
                defaultValue={(defaultValue || "") as PathValue<T, Path<T>>}
                rules={rules}
                render={({ field, fieldState }) => (
                    <>
                        <div className="relative">
              <textarea
                  {...field}
                  id={name}
                  rows={getRows()}
                  placeholder={placeholder || " "} // Space placeholder for floating effect
                  disabled={disabled}
                  style={{
                      outline: "none",
                      boxShadow: "none",
                  }}
                  className={`
                  peer w-full px-3 pt-6 pb-2 border shadow-sm resize-y
                  disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                  ${
                      fieldState?.error
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300"
                  }
                  ${className}
                  ${isFocused ? "border-2" : ""}
                `}
                  onBlur={() => {
                      setIsFocused(false);
                      field.onBlur();
                  }}
                  onFocus={() => setIsFocused(true)}
              />

                            {label && (
                                <label
                                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                                        field.value || isFocused
                                            ? "top-2 text-xs "
                                            : "top-4 text-sm text-gray-500"
                                    } ${fieldState.error ? "text-red-500" : ""}`}
                                    htmlFor={name}>
                                    {label}
                                </label>
                            )}
                        </div>

                        {fieldState?.error && (
                            <p className="mt-1 text-sm text-red-600">
                                {fieldState.error.message}
                            </p>
                        )}
                    </>
                )}
            />
        </div>
    );
};

export default TextArea;
