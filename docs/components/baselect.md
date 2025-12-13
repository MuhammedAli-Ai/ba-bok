---
sidebar_position: 23
---

# BASelect Component

## Description

The `BASelect` component is a flexible, controlled wrapper for the Ant Design `<Select />` component. It standardizes common features required for form inputs, including mandatory state management (`value`, `onChange`), dedicated labeling with a required indicator, and options for single or multiple selection.

## 📦 Installation / Import

```javascript
import BASelect from "@site/src/components/BASelect";
```

## 🔗 Dependencies

*   **Internal Components**: `<BABox />` (Used for container layout).
*   **External Libraries**: `Select`, `Typography` (Ant Design).

## 🛠️ Usage

The component is controlled and requires a `value`, `options`, and an `onChange` handler to function correctly.

### Example

```javascript
import React, { useState } from 'react';
import BASelect from '@site/src/components/BASelect';

function SelectForm() {
    const [selectedUsers, setSelectedUsers] = useState([]);

    const userOptions = [
        { value: 1, label: 'Alice' },
        { value: 2, label: 'Bob' },
        { value: 3, label: 'Charlie', disabled: true },
        { value: 4, label: 'Diana' },
    ];

    const handleChange = (newValue, selectedOption) => {
        setSelectedUsers(newValue);
        console.log('Selected:', newValue, selectedOption);
    };

    return (
        <BASelect
            label="Assign Users"
            required={true}
            options={userOptions}
            value={selectedUsers}
            onChange={handleChange}
            multiple={true} // Enable multi-select mode
            showSearch={true}
            width="300px"
        />
    );
}
export default SelectForm;
```

## ⚙️ Props

### Required/Core

| Prop | Type | Description |
| :--- | :--- | :--- |
| `options` | `object[]` | **Required**. Array defining the selectable items. |
| `value` | any \| any[] | **Required**. The currently selected value(s) (single value or array of values). |
| `onChange` | `(value, option) => void` | **Required**. Callback function triggered upon selection. Receives the new value and the selected option object(s). |
| `label` | string | **Required**. The text title displayed above the select box. |

### Presentation/Behavior

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `multiple` | boolean | `false` | If true, enables Ant Design's multi-select mode (`mode="multiple"`). |
| `required` | boolean | `false` | If true, adds a red asterisk (*) to the label. |
| `disabled` | boolean | `false` | Disables the select input. |
| `showSearch` | boolean | `false` | Enables the built-in search functionality for filtering options. |
| `loading` | boolean | `false` | Displays a loading spinner inside the select box. |
| `width` | string \| number | `'100%'` | Custom width of the select component. |
| `onFocus` | `(event) => void` | `undefined` | Callback function triggered when the select input gains focus. |

### Unused API Related

`api`, `apiParams`, `valueField`, `displayField`. (These props are defined in the type but are not currently implemented or used within the component's internal logic).

## 🏗️ options Array Structure

Each object within the `options` array must adhere to the Ant Design standard structure:

| Key | Type | Description |
| :--- | :--- | :--- |
| `value` | any | The unique identifier or data payload for the option. |
| `label` | string | The text displayed to the user in the dropdown list. |
| `disabled` | boolean | Optional. If true, the user cannot select this option. |

## ⭐ Key Features

*   **Multiple Mode**: By setting `multiple={true}`, the component utilizes `mode="multiple"` internally, allowing the user to select several options, and ensuring the `value` and `onChange` handle an array of values.
*   **Integrated Labeling**: The component uses Ant Design's `Typography.Title` (level 5) to consistently render the label. The `required` prop automatically appends a styled asterisk to enforce form consistency.
*   **Full Width Default**: The component defaults to `width: '100%'` to easily fit into responsive form layouts.
