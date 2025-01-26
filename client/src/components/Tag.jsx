function Tag({title, className}) {
    return (
        <span
            className={`border border-grey_border rounded-xl text-xs px-2 py-1 ${className || ""}`}
        >
            {title}
        </span>
    );
}

export default Tag;
