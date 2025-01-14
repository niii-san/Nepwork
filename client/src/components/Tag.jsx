function Tag({ children, className}) {
    return (
        <label
            className={`border border-grey_border rounded-xl text-xs px-2 py-1 ${className || ""}`}
        >
            {children}
        </label>
    );
}

export default Tag;