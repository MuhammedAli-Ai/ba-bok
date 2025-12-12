import React from 'react';

export default function BAPera(props) {
    const { children, className, sx, onClick } = props;
    return (
        <p onClick={onClick} style={sx} className={className}>
            {children}
        </p>
    );
}
