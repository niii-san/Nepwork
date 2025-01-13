import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

/*
 * Button Component
 * Props:
 * - id: unique identifier for the button
 * - type: button type (button, submit, reset)
 * - className: additional Tailwind classes
 * - disabled: disables the button
 * - style: outline or filled button styles
 * - onClick: event handler for click event
 * - children: content inside the button
 * - rest: additional props passed to the button element
 */
function Button({
    id,
    type = "button",
    className,
    disabled = false,
    loading = false,
    variant = "outline",
    onClick,
    children,
    ...rest
}) {
    const baseStyle =
        "w-full py-2 border-2 border-primary rounded-lg text-background text-base flex justify-center items-center cursor-pointer transition ease-in-out duration-300";

    const ButtonVariants = {
        outline: "text-dark_text hover:bg-primary hover:bg-opacity-20",
        filled: "bg-primary hover:bg-opacity-80 ",
    };

    const disabledStyle =
        "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed hover:bg-gray-300";
    const loadingStyle = "cursor-wait opacity-80";

    const buttonVariant = !disabled
        ? ButtonVariants[variant] || ButtonVariants.filled
        : disabledStyle;

    const handleClick = (e) => {
        if (disabled || loading) {
            e.preventDefault();
            return;
        }
        onClick?.(); // Only call the onClick if not disabled/loading
    };

    return (
        <button
            disabled={disabled}
            onClick={handleClick}
            className={twMerge(
                `${baseStyle} ${buttonVariant} ${disabled ? disabledStyle : ""} ${loading ? loadingStyle : ""}`,
                className,
            )}
            {...rest}
        >
            {loading ? (
                <div className="flex justify-center items-center gap-x-2">
                    <span className="w-6 h-6 border-4 border-t-primary border-secondary rounded-full animate-spin"></span>
                    <span>{children}</span>
                </div>
            ) : (
                children
            )}
        </button>
    );
}

// Prop validation for Button
Button.propTypes = {
    id: PropTypes.string,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    variant: PropTypes.oneOf(["outline", "filled"]),
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired, // Ensures children are passed
};

export default Button;
