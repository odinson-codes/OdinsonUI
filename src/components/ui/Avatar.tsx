import {useState} from "react";

interface AvatarProps{
    url: string;
    alt: string;
    fallback: string;
    size: "sm" | "md" | "lg" | "xl"
    color?: string;
    className?: string;

}
const sizeMap = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl",
};

const  Avatar = ({ url,
                     alt,
                     fallback,
                     size = "md",
                     color = "bg-gray-700",
                     className = "",}:AvatarProps) => {
    const [imgError, setImgError] = useState(false);
    const showFallback = !url || imgError;
return(
    <div
        className={`
        relative inline-flex items-center justify-center
        rounded-full overflow-hidden shrink-0
        ${sizeMap[size]}
        ${showFallback ? color : ""}
        ${className}
      `}
    >
        {showFallback ? (
            <span className="font-semibold text-white select-none uppercase">
          {fallback.slice(0, 2)}
        </span>
        ) : (
            <img
                src={url}
                alt={alt}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
            />
        )}
    </div>
);
};
export default Avatar;