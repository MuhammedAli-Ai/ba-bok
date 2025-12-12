import React from 'react';
import { Typography, Switch } from "antd";
import BABox from "./BABox";

export default function BASwitch(props) {
    const { label, value, onChange, disabled, required, className, labelClass, size } = props;
    const { Title } = Typography;

    return (
        <BABox className={className}>
            {label && (
                <Title level={5} className={labelClass}>
                    {label}
                    {required && <span className="text-red-500 text-lg ml-1">*</span>}
                </Title>
            )}
            <BABox>
                <Switch
                    size={size}
                    checked={value} // Switch uses checked, not value, but prompt code used value in defaultChecked and value props. Controlled switch usually uses 'checked'. Code in prompt: defaultChecked={value} ... value={value}.
                    // If controlled, we should use 'checked'. The prompt used 'defaultChecked={value}' which suggests uncontrolled intially or mixed.
                    // But standard controlled Antd Switch uses 'checked={value}'. 
                    // I will interpret 'value' as the checked state as per usage example: "value={isEnabled}".
                    checked={value}
                    onChange={onChange}
                    disabled={disabled}
                />
            </BABox>
        </BABox>
    );
}
