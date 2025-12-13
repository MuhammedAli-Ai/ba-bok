---
sidebar_position: 17
---

# BAModal Component

## Description

The `BAModal` component is a wrapper around the powerful Ant Design `<Modal>`, offering a simplified interface for standard use cases. It centralizes control flow via dedicated props (`open`, `close`, `content`) and exposes common Ant Design customization options.

## 📦 Installation / Import

```javascript
import BAModal from "@site/src/components/BAModal";
```

## 🔗 Dependencies

*   **antd**: Provides the core UI component, `<Modal />`.

## 🛠️ Usage

The modal's visibility must be controlled by state managed in the parent component. The `close` prop is typically passed the state setter function to hide the modal.

### Example

```javascript
import React, { useState } from 'react';
import BAModal from '@site/src/components/BAModal';
import BAButton from '@site/src/components/BAButton';

function ModalDemo() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOK = () => {
        // Handle form submission or confirmation logic here
        alert("Action Confirmed!");
        setIsModalOpen(false);
    };

    const modalContent = (
        <p>
            Please confirm your action. This modal uses the **content** prop for its body.
        </p>
    );

    return (
        <div>
            <BAButton label="Open Modal" onClick={() => setIsModalOpen(true)} />

            <BAModal
                title="Confirm Operation"
                open={isModalOpen}
                close={() => setIsModalOpen(false)} // Maps to onCancel
                content={modalContent}
                handleOK={handleOK} // Maps to onOk
            />
        </div>
    );
}
export default ModalDemo;
```

## ⚙️ Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `title` | string | **Required**. The header text displayed at the top of the modal. |
| `open` | boolean | **Required**. Controls the visibility of the modal (true = visible). |
| `close` | `() => void` | **Required**. The function executed when the user clicks the close (X) icon or clicks outside the modal (maps to Ant Design's `onCancel`). |
| `content` | `React.ReactNode` | **Required**. The content (JSX, components, text) to display in the modal body. |
| `handleOK` | `() => void` | Optional function executed when the primary OK button is clicked (maps to Ant Design's `onOk`). |
| `footer` | `React.ReactNode` | Optional. Used to override the default Ant Design footer buttons. Pass custom buttons or JSX. If `footer` is defined, the default OK/Cancel buttons are hidden. |
| `width` | string \| number | Custom width of the modal (e.g., 500 or '70%'). |
| `style` | object | Custom inline styles for the modal container. |
| `className` | string | Custom CSS classes for the modal container. |

## 🔄 Control Flow and Structure

The `BAModal` component simplifies the core interactions of the Ant Design modal:

*   **Visibility Control**: The modal is a controlled component. Its visibility is entirely dictated by the `open` prop from the parent state.
*   **Cancellation**: The `close` prop function is bound directly to the Ant Design `onCancel` handler. This handles:
    *   Clicking the X button.
    *   Pressing the ESC key.
    *   Clicking the Cancel button (if default footer is used).
*   **Content Injection**: The body content is passed via the dedicated `content` prop, making the component structure clean.
*   **Footer Override**: If the `footer` prop is provided, it replaces the default Ant Design OK and Cancel buttons entirely. If no footer is provided, Ant Design defaults (which respond to `handleOK` and `onCancel`) are used.
