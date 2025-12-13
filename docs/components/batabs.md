---
sidebar_position: 26
---

# BATabs Component

## Description

The `BATabs` component is a lightweight wrapper around the Ant Design `Tabs` component, specifically designed to render card-styled tabs. It simplifies the setup by accepting a structured array of tab data (`tabsData`), where each element defines the tab's label, key, and content.

## 📦 Installation / Import

```javascript
import BATabs from "@site/src/components/BATabs";
```

## 🔗 Dependencies

*   **External Libraries**: `Tabs` (Ant Design).

## 🛠️ Usage

This example demonstrates how to define the `tabsData` array and use the `BATabs` component to display three different sections.

### Example

```javascript
import React from 'react';
import BATabs from '@site/src/components/BATabs';
import { Typography } from 'antd';

const { Text } = Typography;

function UserProfileTabs() {
    // Define the data structure for the tabs
    const profileTabs = [
        {
            label: 'Profile',
            key: '1',
            content: <Text>This section contains personal user details.</Text>,
        },
        {
            label: 'Settings',
            key: '2',
            content: <div><Text>Manage account preferences here.</Text></div>,
        },
        {
            label: 'Activity Log',
            key: '3',
            content: <Text type="secondary">View recent actions and history.</Text>,
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <h2>User Management</h2>
            <BATabs 
                tabsData={profileTabs} 
                className="custom-tabs-style"
            />
        </div>
    );
}

export default UserProfileTabs;
```

## ⚙️ Props

| Prop | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `tabsData` | `TabData[]` | Yes | An array of objects defining the structure and content of each tab. See the TabData interface below. |
| `className` | string | No | Custom CSS classes to apply to the main Ant Design Tabs container. |

### TabData Interface Structure

| Key | Type | Description |
| :--- | :--- | :--- |
| `label` | string | The title text displayed on the tab header. |
| `key` | string | A unique identifier for the tab, used internally by Ant Design for state management. |
| `content` | `React.ReactNode` | The actual JSX or React component that will be rendered when this tab is active. |
