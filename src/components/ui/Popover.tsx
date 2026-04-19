import {type ReactNode, useEffect, useRef, useState} from "react";
import {cn} from "../../lib/classmerger.ts";

type Placement = "top" | "bottom" | "left" | "right";

interface PopoverProps {
    trigger: ReactNode;
    children: ReactNode;
    placement?: Placement;
    className?: string;
    contentClassName?: string;
}
const placementStyles: Record<Placement, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export function Popover({
                            trigger,
                            children,
                            placement = "bottom",
                            className,
                            contentClassName,
                        }: PopoverProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div ref={ref} className={cn("relative inline-block", className)}>
            <div
                onClick={() => setOpen((prev) => !prev)}
                className="cursor-pointer"
                role="button"
                aria-haspopup="true"
                aria-expanded={open}
            >
                {trigger}
            </div>

            {open && (
                <div
                    role="dialog"
                    className={cn(
                        "absolute z-50 min-w-[10rem] rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-sm text-zinc-100 shadow-xl",
                        placementStyles[placement],
                        contentClassName
                    )}
                >
                    {children}
                </div>
            )}
        </div>
    );
}