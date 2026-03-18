import { cn } from "../../lib/classmerger.ts";

interface SeperatorProps {
    orientation:"vertical" | "horizontal"
    className?: string;
}
const Separator  = ({orientation="horizontal", className }:SeperatorProps) => {
    return(
        <div className={cn("bg-gray-200 shrink-0", orientation === "horizontal" ? "h-px w-full" : "w-px h-full", className)} />
    )
}

export default Separator;