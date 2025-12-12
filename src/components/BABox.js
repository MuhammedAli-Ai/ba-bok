import React from "react";

export default function BABox({ sx, children, ...props }) {
    return <div style={sx} {...props}>{children}</div>;
}
