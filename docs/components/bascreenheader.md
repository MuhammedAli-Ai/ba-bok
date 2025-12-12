---
sidebar_position: 21
---

# 🔝 BAScreenHeader Component

## Description

The `BAScreenHeader` component provides a standardized and responsive top bar for application screens. It combines essential features like navigation control, a primary screen title, and a flexible right-hand section for custom action buttons or menu options.

## 📦 Installation / Import

```javascript
import BAScreenHeader from "@site/src/components/BAScreenHeader";
```

## 🔗 Dependencies

*   **Internal Components**: `<BABox />`, `<BAIconButton />`, `<BAPera />`.
*   **Internal Helper**: `goBack` (Assumed to use history or router for navigation).
*   **External Icons**: `ArrowLeftOutlined` (Ant Design Icon).

## 🛠️ Usage

The component primarily requires a `title`. Custom action buttons are passed via the `headerOptions` array, which allows for rendering any custom JSX/Components (like other `<BAIconButton />` or `<BAButton />`).

### Example

```javascript
import React from 'react';
import BAScreenHeader from '@site/src/components/BAScreenHeader';
import BAIconButton from '@site/src/components/BAIconButton';
import { SaveOutlined, SettingOutlined } from '@ant-design/icons';

function UserProfileScreen() {
    const options = [
        {
            isHide: false,
            displayField: () => (
                <BAIconButton icon={<SaveOutlined />} onClick={() => alert('Saving...')} />
            )
        },
        {
            isHide: false,
            displayField: () => (
                <BAIconButton icon={<SettingOutlined />} type="default" />
            )
        }
    ];

    return (
        <BAScreenHeader
            title="User Profile"
            headerOptions={options}
            extraTitle={<span>(ID: 1001)</span>}
        />
    );
}
export default UserProfileScreen;
```

## ⚙️ Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `title` | string | **Required**. The main text title for the screen. |
| `headerOptions` | `object[]` | Optional array defining custom action elements (buttons, menus) to be displayed on the right side of the header. |
| `extraTitle` | `React.ReactNode` | Optional JSX or text content to append directly next to the main title. |
| `disableBack` | boolean | If true, the default Back button (`<ArrowLeftOutlined />`) is hidden. |
| `disableNav` | any | Optional, currently unused navigation props. |
| `onFirst` | any | Optional, currently unused navigation props. |
| `onPrevious` | any | Optional, currently unused navigation props. |
| `onNext` | any | Optional, currently unused navigation props. |
| `onLast` | any | Optional, currently unused navigation props. |
| `authorInfo` | object | Optional, currently unused props related to displaying metadata. |
| `showAuthorInfo` | boolean | Optional, currently unused props related to displaying metadata. |

## 🏗️ headerOptions Array Structure

The `headerOptions` array allows fine-grained control over the action buttons displayed in the header. Each object must contain:

| Key | Type | Description |
| :--- | :--- | :--- |
| `displayField` | `() => React.ReactNode` | **Required**. A function that returns the component (e.g., `<BAIconButton />`) to be rendered as an action item. |
| `isHide` | boolean | If true, this specific option will be excluded from rendering in the header. |

## ⭐ Key Features

*   **Default Back Navigation**: By default, a circular back button is displayed on the left. Clicking it executes the imported `goBack()` helper function (typically navigating to the previous history state).
*   **Custom Disabling**: The `disableBack` prop allows the back button to be easily hidden for screens where navigation backward is not appropriate (e.g., a landing page).
*   **Visual Separation**: The header features a fixed bottom border (styled using Tailwind classes) for clear visual separation from the main screen content.
*   **Responsive Title**: The title size adjusts based on screen size (`md:text-3xl text-xl`).
