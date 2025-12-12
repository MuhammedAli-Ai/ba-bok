---
sidebar_position: 5
---

# 🗂️ BACollapse Component

## Description

The `BACollapse` component creates a simple, vertical collapsible panel. It allows users to toggle the visibility of a content area using a clickable header, saving screen space and organizing complex information.

## 📦 Installation / Import

Ensure the component file is accessible, and import it along with its required dependencies:

```javascript
import BACollapse from '@site/src/components/BACollapse';
// Assuming these are also imported or available in your environment
// import BABox from "../src/components/BA/BABox";
// import BAPera from "../src/components/BA/BAPera";
```

## 🛠️ Usage

The component accepts a label for the clickable header and the content to be collapsed/expanded as children.

### Example

The following example shows two instances of `BACollapse`: one starting expanded and one starting collapsed.

```javascript
import React from 'react';
import BACollapse from '@site/src/components/BACollapse';
import { UserOutlined, SettingOutlined } from "@ant-design/icons";

function MyCollapsibleContainer() {
    // Example using expand prop for initial state
    return (
        <div>
            {/* Initial State: Collapsed (Default) */}
            <BACollapse label="Personal Information" icon={<UserOutlined />}>
                <p>User Name: John Doe</p>
                <p>Email: john.doe@example.com</p>
            </BACollapse>

            {/* Initial State: Expanded (using expand prop) */}
            <BACollapse label="Configuration Settings" expand={true} icon={<SettingOutlined />}>
                <p>Theme: Dark</p>
                <p>Notifications: Enabled</p>
            </BACollapse>
        </div>
    );
}

export default MyCollapsibleContainer;
```

## ⚙️ Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | string | N/A | **Required**. The text displayed in the header of the collapsible panel. |
| `children` | any | N/A | **Required**. The content that will be hidden/shown when the panel is toggled. |
| `icon` | any | `undefined` | An optional element (like an Ant Design icon) to display next to the label in the header. |
| `expand` | boolean | `undefined` | If set to `true`, the panel will be open by default upon initial render. |
| `labelClick` | function | `undefined` | An optional callback function executed when the header label is clicked, in addition to the component's internal toggle logic. |

## 🔗 Dependencies

This component relies on several external components and libraries:

*   **BABox**: Used for the main container and the content wrapper.
*   **BAPera**: Used to create the clickable header element that displays the label.
*   **@ant-design/icons**: Provides the visual indicators for the expanded (`<DownOutlined />`) and collapsed (`<RightOutlined />`) states.

## 🎨 Styling & Structure

The component's structure consists of a main wrapper (`<BABox>`) containing the header and the content area:

*   **Header (`<BAPera>`)**:
    *   It is clickable via `onClick={handleOpen}`.
    *   It uses flex layout (`flex justify-between items-center`) to position the label/icon on the left and the expand indicator icon on the right.
    *   It includes hover effects (`hover:bg-[rgba(0,0,0,.1)]`) and border styling to clearly delineate the clickable area.

*   **Content (`<BABox>`)**:
    *   The content (`{children}`) is only rendered when the internal state `open` is `true` (`{open && <BABox className="p-2">`).

The overall component is wrapped in a bordered container (`className="mb-2 border"`) for visual separation on the page.
