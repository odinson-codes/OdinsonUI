import type {ReactNode} from "react";
import {cn} from "../../lib/classmerger.ts";

type TooltipSide = "top" | "bottom" | "left" | "right"

interface TooltipProps {
    children: ReactNode
    content?: string
    side?: TooltipSide
    className?: string
}

const sideClasses: Record<TooltipSide, string> = {
    top: "bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 translate-y-1 group-hover:translate-y-0",
    bottom: "top-[calc(100%+8px)] left-1/2 -translate-x-1/2 -translate-y-1 group-hover:translate-y-0",
    left: "right-[calc(100%+8px)] top-1/2 -translate-y-1/2 translate-x-1 group-hover:translate-x-0",
    right: "left-[calc(100%+8px)] top-1/2 -translate-y-1/2 -translate-x-1 group-hover:translate-x-0",
}

const arrowClasses: Record<TooltipSide, string> = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-gray-900 dark:border-t-gray-100",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 dark:border-b-gray-100",
    left: "left-full top-1/2 -translate-y-1/2 border-l-gray-900 dark:border-l-gray-100",
    right: "right-full top-1/2 -translate-y-1/2 border-r-gray-900 dark:border-r-gray-100",
}

export function Tooltip({
                            children,
                            content,
                            side = "top",
                            className,
                        }: TooltipProps) {
    return (
        <div className={cn("relative inline-flex group", className)}>
            {children}

            {/* Tooltip bubble */}
            <span
                className={cn(
                    "absolute z-50 whitespace-nowrap",
                    "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900",
                    "text-xs font-medium px-2.5 py-1.5 rounded-md",
                    "opacity-0 pointer-events-none",
                    "transition-all duration-150 ease-out",
                    "group-hover:opacity-100",
                    sideClasses[side]
                )}
            >
        {content}

                {/* Arrow */}
                <span
                    className={cn(
                        "absolute border-[5px] border-transparent",
                        arrowClasses[side]
                    )}
                />
      </span>
        </div>
    )
}