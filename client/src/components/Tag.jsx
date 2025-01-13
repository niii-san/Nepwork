import React, { Children, useState } from "react";
import PropTypes from "prop-types";

function Tag({
    children
}) {
    return (
        <div>
            <label
                className="border border-grey_border rounded-xl text-xs px-2 py-1"
                htmlFor=""
            >
                {children}
            </label>
        </div>
    );
}

Tag.propTypes = {
    children: PropTypes.node.isRequired
};

export default Tag;
