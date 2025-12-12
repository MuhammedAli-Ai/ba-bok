"use client";

import React from 'react';
import { DatePicker, Typography } from 'antd';
import dayjs from 'dayjs';
import BABox from './BABox';

export default function BADate(props) {
    const { label, disabled, required, onChange, value, showTime, minDate, maxDate, picker } = props;
    const { Title } = Typography;
    const validatePeriod = (date, dateString) => {
        if (!date) {
            onChange(null, dateString);
            return;
        }
        // Use local timezone (dayjs returns local by default)
        const localDate = dayjs(date).toDate();
        onChange(localDate, dateString);
    };

    return (
        <BABox className=''>
            {label && <Title level={5}>{label}<span className="text-2xl">{required && "*"}</span></Title>}
            <BABox>
                <DatePicker
                    picker={picker}
                    minDate={minDate}
                    maxDate={maxDate}
                    required={required}
                    style={{ width: '100%' }}
                    onChange={validatePeriod}
                    value={value ? dayjs(value) : null}
                    disabled={disabled}
                    placeholder=''
                    showTime={showTime}
                    format={'DD-MMM-YYYY'}
                />
            </BABox>
        </BABox>
    );
}
