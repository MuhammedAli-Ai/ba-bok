---
sidebar_position: 25
---

# 🔌 BASwitch Component

## Description

The `BASwitch` component is a reusable wrapper around the Ant Design `Switch` component. It standardizes the presentation by including a label (using Ant Design's `Typography.Title`) and nesting the control within a custom `BABox` container for consistent styling and layout. It is designed to handle boolean states and pass changes up via the `onChange` handler.

## 📦 Installation / Import

```javascript
import BASwitch from "@site/src/components/BASwitch";
```

## 🔗 Dependencies

*   **Internal Components**: `<BABox />`.
*   **External Libraries**: `Switch`, `Typography` (Ant Design).

## 🛠️ Usage

This example demonstrates importing `BASwitch` and using it within a React component to manage a state variable.

### Example

```javascript
import React, { useState } from 'react';
import BASwitch from '@site/src/components/BASwitch';
import { Typography } from 'antd';

const { Text } = Typography;

function MyForm() {
    const [isEnabled, setIsEnabled] = useState(true);

    const handleSwitchChange = (checked) => {
        setIsEnabled(checked);
        console.log('Switch toggled:', checked);
    };

    return (
        <div>
            <BASwitch
                label="Enable Notifications"
                value={isEnabled}
                onChange={handleSwitchChange}
                required={true}
                size="default"
                labelClass="font-weight-bold"
            />
            <Text type="secondary">
                Notifications are currently: <strong>{isEnabled ? 'ON' : 'OFF'}</strong>
            </Text>
        </div>
    );
}

export default MyForm;
```

## ⚙️ Props

| Prop | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `label` | string | Yes | The text displayed next to the switch (rendered as a Title level 5). |
| `value` | boolean | Yes | The current state of the switch (`true` for ON, `false` for OFF). |
| `onChange` | `(checked: boolean) => void` | Yes | Callback function triggered when the switch state changes. It receives the new boolean value. |
| `disabled` | boolean | No | If set to `true`, the switch cannot be interacted with. Passed directly to Ant Design Switch. |
| `required` | boolean | No | If set to `true`, an asterisk (*) is appended to the label to indicate a required field. |
| `className` | string | No | Custom CSS classes to apply to the outermost `BABox` container. |
| `labelClass` | string | No | Custom CSS classes to apply specifically to the label text (`Typography.Title`). |
| `size` | `'small' \| 'default'` | No | Defines the size of the Ant Design switch. Defaults to `'default'`. |
