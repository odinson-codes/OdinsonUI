import { Search } from "lucide-react";
import { useState } from "react";
import type { ChangeEvent, ComponentType, SVGProps } from "react";

type Radius = "none" | "sm" | "md" | "lg" | "xl" | "full";

interface SearchInputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
    iconClassName?: string;
    radius?: Radius;
    disabled?: boolean;
}

const SearchInput = ({
                         value,
                         onChange,
                         placeholder = "Search...",
                         className = "",
                         icon: Icon = Search,
                         iconClassName = "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
                         radius = "md",
                         disabled = false,
                     }: SearchInputProps) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const getRadius = (radius: Radius): string => {
        const radiusMap: Record<Radius, string> = {
            none: "rounded-none",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
        };
        return radiusMap[radius];
    };

    return (
        <div className="relative">
            <Icon className={iconClassName}  />
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{ outline: "none", boxShadow: "none" }}
                className={`
          w-full pl-10 pr-4 py-2.5
          border border-gray-300
          ${getRadius(radius)}
          transition-all duration-200
          placeholder:text-gray-400
          hover:border-borderColor
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${isFocused ? "border-2 border-borderColor" : ""}
          ${className}
        `}
            />
        </div>
    );
};

export default SearchInput;
