"use client";

import React from 'react';
import { Input, Typography } from "antd";

export default function BATextarea(props) {
    const { label, placeholder, disabled, required, onChange, value, onBlur, className } = props;

    const { TextArea } = Input;
    const { Title } = Typography;

    return (
        <div className={className}>
            {label && (
                <Title level={5}>
                    {label}
                    {required && <span className="text-red-500 text-lg ml-1">*</span>}
                </Title>
            )}
            <TextArea
                onBlur={onBlur}
                rows={4}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                // required={required} // Removed required attr from TextArea to avoid default browser HTML5 validation if customized.
                // Re-adding if user strictly wants pass-through, but usually controlled Antd components handle this.
                // Keeping it as prompt had it: `required={required}`
                // wait, native textarea `required` shows browser tooltip.
                // Prompt code has it. Keeping it.
                required={required}
                onChange={onChange}
            />
        </div>
    );
}
