---
sidebar_position: 10
---

# BAFieldset Component

## Description

The `BAFieldset` component is a dedicated wrapper for **grouping related form elements or content**. It utilizes the semantic HTML `<fieldset>` and `<legend>` elements, enhancing both visual organization and accessibility. It integrates with Ant Design's theming system to use the defined primary color for the title header.

## 📦 Installation / Import

```javascript
import BAFieldset from "@site/src/components/BAFieldset";
```

## 🔗 Dependencies

*   **antd**: Specifically, `theme.useToken` is imported to access the application's current theme variables, particularly the primary color (`colorPrimary`), for dynamic styling of the legend.

## 🛠️ Usage

The component requires a simple string for the `title` and any valid React node (like form components or text) for the `body`.

### Example

```javascript
import React from 'react';
import BAFieldset from '@site/src/components/BAFieldset';
// Assuming BAInput and BABox are available (or use placeholders)
import BAInput from '@site/src/components/BAInput'; 
import BABox from '@site/src/components/BABox'; 

function UserDetailForm() {
    return (
        <BAFieldset
            title="Contact Information"
            body={
                <BABox className="space-y-4">
                    <BAInput label="Email Address" type="email" />
                    <BAInput label="Phone Number" type="text" />
                </BABox>
            }
        />
    );
}
export default UserDetailForm;
```

## ⚙️ Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `title` | string | **Required**. The text displayed in the colored header (`<legend>`) that names the grouped content. |
| `body` | `React.ReactNode` | **Required**. The content (e.g., form inputs, tables, custom elements) to be rendered inside the `<fieldset>`. |

## 🎨 Styling & Structure

The component provides clear visual grouping:

### Structure
It is built using the semantic `<fieldset>` tag, which automatically draws a border around its contents, and the `<legend>` tag, which serves as the caption for the fieldset.

### Styling
*   **Container (`<fieldset>`)**: Has a 2-pixel border, rounded corners, white background, and padding.
*   **Header (`<legend>`)**: Automatically uses the **Ant Design Primary Color** (`token.token.colorPrimary`) as its background, with the title text displayed in white. This integration ensures the component respects global theme changes.

The use of these native tags helps with screen reader accessibility, making the form structure clearer for users with disabilities.
