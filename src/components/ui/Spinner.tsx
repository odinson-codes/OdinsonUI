import type { ReactNode } from "react";

type SpinnerSize = "small" | "medium" | "large";
interface SpinnerProps {
    children?:ReactNode;
    size?: SpinnerSize;
    color?: string;
}


const Spinner = ({ size = "medium",children, color = "#000000" }: SpinnerProps) => {
    const spinnerSize: Record<SpinnerSize, string> = {
        small: "w-4 h-4",
        medium: "w-8 h-8",
        large: "w-12 h-12",
    }; return (
        <div className={"flex flex-col items-center "}>
            <div className="flex flex-col items-center justify-center">
                <div
                    className={`${spinnerSize[size]} rounded-full border-2 border-t-transparent animate-spin`}
                    style={{
                        borderColor: `${color}40`,
                        borderTopColor: color,
                    }}
                />
            </div>
            {children}
        </div>
    );
};

export default Spinner;