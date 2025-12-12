import React from 'react';
import { Radio, Typography } from "antd";

export default function BARadio(props) {
    const { onChange, value, options, required, label, disabled } = props;
    const { Title } = Typography;

    return (
        <>
            {label && (
                <Title level={5}>
                    {label}
                    {required && <span className="text-red-500 text-lg ml-1">*</span>}
                    {/* Note: User prompt code had `className="text-2xl"` for asterisk. I used Tailwind `text-red-500` for color as described in docs ("red asterisk"). */}
                </Title>
            )}
            <Radio.Group
                disabled={disabled}
                onChange={onChange}
                value={value}
                options={options}
            />
        </>
    );
}
