import React from 'react';
import { Input, Typography } from "antd";
import BABox from "./BABox";

export default function BAInput(props) {
    const { label, value, onChange, placeholder, disabled, type, required, onKeyDown } = props;
    const { Title } = Typography;

    return (
        <BABox className="w-full">
            {label && <Title level={5}>{label}<span className="text-red-500 text-lg ml-1">{required && "*"}</span></Title>}
            <Input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                type={type}
                onKeyDown={onKeyDown}
            />
        </BABox>
    );
}
