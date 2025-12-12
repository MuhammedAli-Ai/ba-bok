import React from 'react';
import { Button } from "antd";

export default function BAIconButton(props) {
    const { onClick, loading, icon, className, disabled, danger, type, shape, children } = props;

    // The previous implementation used children, but the new spec emphasizes the 'icon' prop.
    // To maintain backward compatibility with any potential usage of children (though unlikely given my previous step),
    // I will prioritize the 'icon' prop but fallback or include children if 'icon' is missing, 
    // OR just strictly follow the new spec.
    // The new spec is quite strict: "icon" is required.
    // However, for safety if I used children in BAFormGrid, I should ensure that works.
    // In BAFormGrid check: <BAIconButton><DeleteOutlined /></BAIconButton>.
    // So 'children' IS the icon there.
    // I will adapt the code to handle both or migrate BAFormGrid usage.
    // Wait, the user provided code has `icon={icon}`.
    // I will update BAFormGrid to use `icon` prop or just pass children as icon if icon is missing to be safe?
    // Actually, I'll stick to the user's provided code for BAIconButton and then I might need to check BAFormGrid.
    // Let's implement exactly what is requested first.

    return (
        <Button
            danger={danger}
            type={type ?? "primary"}
            disabled={disabled}
            className={className}
            shape={shape || "circle"}
            icon={icon}
            loading={loading}
            onClick={onClick}
        >
            {/* The user's code didn't have children */}
        </Button>
    );
}
