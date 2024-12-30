import React from "react";
import { twMerge } from "tailwind-merge";

/*
 *
 * style options : outline, filled
 *
 * */
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
                `${
                    style === "outline"
                        ? "border border-primary px-6 py-2 rounded-md hover:bg-primary hover:bg-opacity-20 transition ease-in-out duration-150 active:bg-opacity-50"
                        : "border border-primary px-6 py-2 rounded-md bg-primary text-primaryText hover:bg-primary hover:text-black hover:border-opacity-40 hover:bg-opacity-40 transition ease-in-out duration-150 active:bg-opacity-90"
                } ${className}`,
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
