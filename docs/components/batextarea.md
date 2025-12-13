---
sidebar_position: 27
---

# BATextarea Component

## Description

The `BATextarea` component is a client-side wrapper around the Ant Design `Input.TextArea` component. It provides a standardized interface for multi-line text input fields, including a mandatory label, optional placeholder text, and state management capabilities. It utilizes Ant Design's `Typography.Title` for consistent label styling.

## 📦 Installation / Import

```javascript
import BATextarea from "@site/src/components/BATextarea";
```

## 🔗 Dependencies

*   **External Libraries**: `Input`, `Typography` (Ant Design).

## 🛠️ Usage

This example demonstrates how to use `BATextarea` to capture user feedback, managing the input state with `useState`.

### Example

```javascript
import React, { useState } from 'react';
import BATextarea from '@site/src/components/BATextarea';
import { Button } from 'antd';

function FeedbackForm() {
    const [feedback, setFeedback] = useState('');

    const handleChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleBlur = () => {
        console.log('Textarea lost focus. Current value:', feedback.trim());
    };
    
    const handleSubmit = () => {
        alert('Submitting feedback: ' + feedback);
    };

    return (
        <div style={{ padding: 20 }}>
            <BATextarea
                label="Your Feedback"
                value={feedback}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Share your thoughts on the service..."
                required={true}
            />
            <p style={{ marginTop: '10px' }}>
                Characters remaining: {200 - feedback.length}
            </p>
            <Button 
                type="primary" 
                onClick={handleSubmit} 
                disabled={feedback.length === 0}
            >
                Submit
            </Button>
        </div>
    );
}

export default FeedbackForm;
```

## ⚙️ Props

| Prop | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `label` | string | Yes | The text displayed above the textarea (rendered as a `Typography.Title` level 5). |
| `value` | string | No | The current value of the input field, typically managed by a parent component's state. |
| `onChange` | `(e: React.ChangeEvent<HTMLTextAreaElement>) => void` | No | Callback function triggered when the content of the textarea changes. |
| `placeholder` | string | No | Text displayed inside the textarea when it is empty. |
| `disabled` | boolean | No | If set to `true`, the textarea is greyed out and uneditable. |
| `required` | boolean | No | If set to `true`, an asterisk (*) is appended to the label. |
| `onBlur` | `() => void` | No | Callback function triggered when the input loses focus. |
| `className` | string | No | Custom CSS classes. |
| `type` | any | No | Placeholder for input type (Note: this prop is defined but not used in the current implementation). |
