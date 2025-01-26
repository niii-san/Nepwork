function Tag({ name, className}) {
    return (
        <label
            className={`border border-gray-500 rounded-xl text-xs px-2 py-1 ${className || ""}`}
        >
            {name}
        </label>
    );
}

export default Tag;