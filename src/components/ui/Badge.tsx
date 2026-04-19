import type {ReactNode} from "react";
import {cn} from "../../lib/classmerger.ts";

interface BadgeProps{
    type:"notification" | "nonNotification"
    variant:"default" | "secondary" | "success" | "info"| "outline" | "danger" | "ghost" | "warning"
    showContent: boolean
    children?: ReactNode
}

const variantStyles: Record<BadgeProps["variant"], string> = {
    default:   "bg-neutral-800 text-white border-transparent",
    secondary: "bg-neutral-200 text-neutral-800 border-transparent",
    success:   "bg-green-600 text-white border-transparent",
    info:      "bg-blue-500 text-white border-transparent",
    outline:   "bg-transparent text-neutral-800 border border-neutral-400",
    danger:    "bg-red-500 text-white border-transparent",
    ghost:     "bg-neutral-100 text-neutral-600 border-transparent hover:bg-neutral-300",
    warning:   "bg-yellow-400 text-neutral-900 border-transparent",
};

const Badge = ({ type, variant, showContent = false, children }: BadgeProps) => {
    if (type === "notification") {
        return (
            <div
                className={cn(
                    "inline-flex items-center justify-center",
                    "min-w-5 h-5 rounded-full",
                    "text-xs font-semibold leading-none",
                    variantStyles[variant]
                )}
            >
                {showContent && children}
            </div>
        );
    }

    return (
        <div
            className={cn(
                "inline-flex items-center justify-center",
                "h-4 rounded-sm",
                "text-xs font-medium leading-none",
                "py-0 px-1",
                variantStyles[variant]
            )}
        >
            {showContent && children}
        </div>
    );
};
export default Badge