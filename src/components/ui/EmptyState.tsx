import type {ReactNode} from "react";
import {cn} from "../../lib/classmerger.ts";

interface EmptyStateAction{
    label: string;
    onClick?: () => void;
}

interface EmptyStateProps{
    icon?: ReactNode;
    title?: string;
    description?: string;
    action?: EmptyStateAction;
    className?: string;
}

const EmptyState = ({
                        icon,
                        title = "Nothing here yet",
                        description = "There's no data to display at the moment.",
                        action,
                        className,
                    }: EmptyStateProps) => {
    return (
        <div className={cn("flex flex-col items-center justify-center gap-4 py-16 px-6 text-center", className)}>
            {icon && (
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted text-muted-foreground">
                    {icon}
                </div>
            )}

            <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold text-foreground">{title}</h3>
                {description && (
                    <p className="text-sm text-muted-foreground max-w-xs">{description}</p>
                )}
            </div>

            {action && (
                <button
                    onClick={action.onClick}
                    className="mt-2 px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
};

export default EmptyState;