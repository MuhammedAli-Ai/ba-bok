"use client";

import React from 'react';
import { App, ConfigProvider, theme } from "antd";
import '@ant-design/v5-patch-for-react-19';

// Global exports intended for utility access throughout the application
// Initialized to no-op or placeholders strictly following the structure implied
export let displayError = (messageTxt, severity) => { console.warn("displayError not initialized", messageTxt, severity); };
export let showLoader = (messageTxt) => { console.warn("showLoader not initialized", messageTxt); };
export let appTheme = {};

// Internal component to capture App context hooks
const GlobalAppHooks = () => {
    const { message, modal, notification } = App.useApp();

    React.useEffect(() => {
        // Bind global functions to Ant Design utilities
        displayError = (messageTxt, severity = 'error') => {
            if (severity === 'success') message.success(messageTxt);
            else if (severity === 'warning') message.warning(messageTxt);
            else if (severity === 'info') message.info(messageTxt);
            else message.error(messageTxt);
        };

        showLoader = (messageTxt, duration = 0) => {
            message.loading(messageTxt, duration);
        };

        // Expose more themes/utils if needed here
    }, [message, modal, notification]);

    return null;
};

export default function MasterContainer({ colorPrimary, children }) {
    const [colorMode, setColorMode] = React.useState('light');

    React.useEffect(() => {
        // Initial check
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme) {
            setColorMode(currentTheme);
        }

        // Observe changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    const newTheme = document.documentElement.getAttribute('data-theme');
                    setColorMode(newTheme);
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        return () => observer.disconnect();
    }, []);

    const isDark = colorMode === 'dark';

    appTheme = {
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
            colorPrimary: colorPrimary || '#2563eb',
            colorBgBase: isDark ? '#0f172a' : '#f8fafc',
            colorBgContainer: isDark ? '#1e293b' : '#ffffff',
            fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
        components: {
            Button: {
                colorPrimary: colorPrimary || '#2563eb',
                borderRadius: 6,
                controlHeight: 40,
            },
            Input: {
                borderRadius: 6,
                colorBgContainer: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff',
            },
            Select: {
                borderRadius: 6,
                colorBgContainer: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff',
            },
            DatePicker: {
                borderRadius: 6,
                colorBgContainer: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff',
            },
            Checkbox: {
                borderRadius: 4,
            },
            Table: {
                colorBgContainer: 'transparent',
            },
            Modal: {
                contentBg: isDark ? '#1e293b' : '#ffffff',
                headerBg: isDark ? '#1e293b' : '#ffffff',
            }
        },
    }

    return (
        <ConfigProvider
            theme={appTheme}
        >
            <App>
                <GlobalAppHooks />
                {children}
            </App>
        </ConfigProvider>
    );
}
