import React from "react";

export default function BAButton({ sx, className = "", children, ...props }) {
    return (
        <button
            className={`button button--primary ${className}`}
            style={{
                cursor: 'pointer',
                ...sx
            }}
            {...props}
        >
            {children}
        </button>
    );
}
