import React from "react";
import { twMerge } from "tailwind-merge";

function Button({
    id,
    type,
    className,
    disabled = false,
    style = "outline",
    onClick = () => {},
    children,
}) {
    return (
        <button
            id={id}
            type={type}
            disabled={disabled}
            className={twMerge(
                `${style === "outline" ? "border  px-6 py-2 rounded-md" : ""} ${className}`,
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
