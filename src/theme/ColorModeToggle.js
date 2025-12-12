import React from 'react';
import ColorModeToggle from '@theme-original/ColorModeToggle';

export default function ColorModeToggleWrapper(props) {
    return (
        <div className="color-mode-toggle-wrapper">
            <ColorModeToggle {...props} />
        </div>
    );
}
