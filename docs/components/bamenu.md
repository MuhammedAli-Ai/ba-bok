---
sidebar_position: 16
---

# 🍔 BAMenu Component

## Description

The `BAMenu` component is a high-level wrapper around the Ant Design `<Dropdown>` component, designed to simplify the creation of contextual action menus. It takes a structured array of `options` (containing labels, handlers, and optional icons) and automatically renders them as a clickable dropdown menu.

## 📦 Installation / Import

```javascript
import BAMenu from "@site/src/components/BAMenu";
```

## 🔗 Dependencies

*   **antd**: Provides the core UI component, `<Dropdown />`.
*   **DownOutlined**: An Ant Design Icon used as the default trigger if no children are provided.

## 🛠️ Usage

The component is configured primarily using the `options` array. The visual trigger for the menu can be customized by passing any React Node via the `children` prop.

### Example

```javascript
import React from 'react';
import BAMenu from '@site/src/components/BAMenu';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import BAButton from '@site/src/components/BAButton'; // Example custom trigger

function ActionMenu() {
    const menuOptions = [
        { 
            label: 'Edit Record', 
            onClick: () => alert('Editing...'),
            icon: <EditOutlined />
        },
        { 
            label: 'View Details', 
            onClick: () => console.log('Viewing details'),
            icon: <InfoCircleOutlined />
        },
        { 
            label: 'Delete', 
            onClick: () => confirm('Are you sure?'),
            icon: <DeleteOutlined style={{ color: 'red' }} />
        }
    ];

    return (
        <div>
            {/* Custom Trigger using BAButton */}
            <BAMenu options={menuOptions}>
                <BAButton label="Actions" type="default" />
            </BAMenu>

            {/* Default Trigger (DownOutlined icon) */}
            <BAMenu options={menuOptions} />
        </div>
    );
}
export default ActionMenu;
```

## ⚙️ Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `options` | `object[]` | N/A | **Required**. An array defining the items within the menu (see structure below). |
| `children` | `React.ReactNode` | `<DownOutlined />` | The element that acts as the trigger for the dropdown menu. If not provided, a default down arrow icon is used. |

## 🏗️ options Array Structure

Each object within the `options` array must define the look and behavior of a single menu item:

| Key | Type | Description |
| :--- | :--- | :--- |
| `label` | string | The text displayed for the menu item. |
| `onClick` | `() => void` | **Required**. The function executed when this menu item is clicked. |
| `icon` | `React.ReactNode` | Optional icon to display next to the label (e.g., an Ant Design icon). |

## 🔑 Key Configuration

*   **Trigger Type**: The menu is fixed to open on click (`trigger={['click']}`). Hover or context menu triggers are not supported by this wrapper.
*   **Menu Generation**: The `options` array is mapped directly to the `MenuProps['items']` format required by Ant Design, automatically generating unique keys (`key: index.toString()`).
