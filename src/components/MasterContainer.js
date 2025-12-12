"use client";

import React from 'react';
import { App, ConfigProvider, theme } from "antd";
import '@ant-design/v5-patch-for-react-19';

// Global exports intended for utility access throughout the application
// Initialized to no-op or placeholders strictly following the structure implied
export let displayError = (messageTxt, severity) => { console.warn("displayError not initialized", messageTxt, severity); };
export let showLoader = (messageTxt) => { console.warn("showLoader not initialized", messageTxt); };
export let appTheme = {};

export default function MasterContainer({ colorPrimary, children }) {

    appTheme = {
        algorithm: theme.darkAlgorithm,
        token: {
            colorPrimary: colorPrimary || '#3b82f6', // Brighter Blue
            colorBgBase: '#0f172a', // Slate 900 Background (Lighter)
            colorBgContainer: '#1e293b', // Slate 800 Container (Lighter)
        },
        components: {
            Button: {
                colorPrimary: colorPrimary || '#3b82f6',
                borderRadius: 4,
            },
            Input: {
                borderRadius: 4,
                colorBgContainer: 'rgba(30, 41, 59, 0.6)', // Slate-800 transparent
            },
            Select: {
                borderRadius: 4,
                colorBgContainer: 'rgba(30, 41, 59, 0.6)',
            },
            DatePicker: {
                borderRadius: 4,
                colorBgContainer: 'rgba(30, 41, 59, 0.6)',
            },
            Checkbox: {
                borderRadius: 4,
            },
            Table: {
                colorBgContainer: 'transparent',
            },
            Modal: {
                contentBg: '#1e293b', // Slate 800
                headerBg: '#1e293b',
            }
        },
    }

    return (
        <ConfigProvider
            theme={appTheme}
        >
            <App>
                {children}
            </App>
        </ConfigProvider>
    );
}
