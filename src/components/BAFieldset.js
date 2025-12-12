"use client";

import React from 'react';
import { theme } from "antd";

export default function BAFieldset({ title, body }) {
    const { token } = theme.useToken();

    // Fallback if token is not available or colorPrimary is structure differently
    const primaryColor = token?.colorPrimary || '#1677ff';

    return (
        <fieldset className="rounded-lg border-2 bg-white p-2" style={{ border: '2px solid #e5e7eb', borderRadius: '0.5rem', padding: '0.5rem', backgroundColor: 'white' }}>
            <legend
                style={{ backgroundColor: primaryColor }}
                className="rounded-lg p-2 px-4"
            >
                <span className="text-white" style={{ color: 'white' }}>{title}</span>
            </legend>
            {body}
        </fieldset>
    );
}
