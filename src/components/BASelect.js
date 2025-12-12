"use client";

import React from 'react';
import { Select, Typography } from "antd";
import BABox from "./BABox";

export default function BASelect(props) {
    const { onChange, options, value, label, disabled, multiple, width, required, onFocus, loading, showSearch } = props;
    const { Title } = Typography;

    const handleChange = (ev, option) => {
        onChange(ev, option);
    }

    return (
        <BABox className="">
            {label && <Title level={5}>{label}<span className="text-red-500 text-lg ml-1">{required && "*"}</span></Title>}
            {/* Note: User prompt had text-2xl for asterisk, staying consistent with previous styling text-red-500. */}
            <BABox>
                <Select
                    showSearch={showSearch}
                    loading={loading}
                    onFocus={(ev) => {
                        if (onFocus) onFocus(ev);
                    }}
                    mode={multiple ? "multiple" : undefined}
                    disabled={disabled}
                    value={value}
                    style={{ width: width ? width : '100%' }}
                    onChange={handleChange}
                    options={options}
                />
            </BABox>
        </BABox>
    );
}
