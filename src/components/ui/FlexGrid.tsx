import {cn} from "../../lib/classmerger.ts";
import React from "react"
import type { ReactNode } from "react"

type Orientation = "horizontal" | "vertical";
type FlexGridProps = {
    children:ReactNode,
    minWidth: number,
    gap?: string,
    orientation?: Orientation;
    className?: string,
}

const FlexGrid = ({children, minWidth, gap = "gap-4", className, orientation = "horizontal",}: FlexGridProps) => {
    const isVertical = orientation === "vertical";
    return (
        <div
            className={cn(
                "flex flex-wrap",
                isVertical ? "flex-col" : "flex-row",
                `gap-${gap}`,
                className
            )}
        >
            {React.Children.map(children, (child,) => (
                <div className={cn(
                    isVertical ? "w-full" : `flex-grow basis-[${minWidth}px]`
                )}>{child}</div>
            ))}
        </div>
    )
}
export default FlexGrid