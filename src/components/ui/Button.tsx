import {cn} from "../../lib/classmerger.ts";
import type { ReactNode } from "react";
interface ButtonComponentProps {
    variant?: "solid" | "faded" | "bordered" | "flat" | "ghost" | "danger";
    children: ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
    radius?: "sm" | "md" | "lg" | "xl" | "full";
}

const variantMap = {
    danger:   "bg-red-500 text-white hover:bg-red-300",
    solid:    "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 hover:text-white",
    faded:    "bg-zinc-900/60 border-2 border-zinc-700 hover:bg-zinc-800/60 text-zinc-50 hover:text-white",
    bordered: "border-2 border-zinc-700 text-zinc-900 bg-zinc-900/10 hover:text-white hover:border-zinc-600",
    flat:     "bg-zinc-900/20 text-zinc-900 hover:bg-zinc-900/30 hover:text-zinc-900/30",
    ghost:    "border-2 border-zinc-700 text-zinc-900 bg-zinc-900/10 hover:bg-zinc-800 hover:border-zinc-600 hover:text-white",
} as const;

const radiusMap = {
    sm:   "rounded-sm",
    md:   "rounded-md",
    lg:   "rounded-lg",
    xl:   "rounded-xl",
    full: "rounded-full",
} as const;

const Button = ({
                    variant = "flat",
                    children,
                    onClick,
                    type = "button",
                    disabled = false,
                    className,
                    radius = "md",
                }: ButtonComponentProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "px-4 py-2 transition-all duration-200",
                variantMap[variant],
                radiusMap[radius],
                disabled && "opacity-50 cursor-not-allowed bg-buttonDisabled",
                className
            )}
        >
            {children}
        </button>
    );
};

export default Button;