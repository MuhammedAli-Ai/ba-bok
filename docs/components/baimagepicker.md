---
sidebar_position: 14
---

# BAImagePicker Component

## Description

The `BAImagePicker` is a highly specialized file input wrapper designed for selecting a **single image**. It provides instant client-side preview of the selected image and returns the raw `File` object(s) to the parent component via the `onChange` handler, ready for form submission or server upload. It also supports displaying an initial image using a remote URL (`value`).

## 📦 Installation / Import

```javascript
import BAImagePicker from "@site/src/components/BAImagePicker";
```

## 🔗 Dependencies

*   **antd**: Used for theme integration (`theme.useToken`) to style the remove button.
*   **CloseOutlined**: An Ant Design icon used for the remove button.

## 🛠️ Usage

The component acts as a controlled input, receiving an initial URL via `value` (if the image is already saved) and notifying the parent via `onChange` whenever a new file is selected or the existing one is removed.

### Example

```javascript
import React, { useState } from 'react';
import BAImagePicker from '@site/src/components/BAImagePicker';

function ProfilePictureUploader() {
    const [fileToUpload, setFileToUpload] = useState([]);
    // Assume this URL comes from your API:
    const [currentImageUrl, setCurrentImageUrl] = useState("https://api.example.com/user/avatar.jpg"); 

    const handleFileChange = (files) => {
        // files is an array of File objects (max size 1)
        setFileToUpload(files);
        console.log("File ready for upload:", files[0]);

        if (files.length === 0) {
            // User removed the image, clear the remote URL for consistency
            setCurrentImageUrl(null);
        }
    };

    return (
        <BAImagePicker
            uploadText="Change Avatar"
            onChange={handleFileChange}
            value={currentImageUrl}
        />
    );
}
export default ProfilePictureUploader;
```

## ⚙️ Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `onChange` | `(files: File[]) => void` | N/A | **Required**. Callback function that returns an array containing the selected File object (`[File]`) or an empty array (`[]`) if the image is removed. |
| `value` | string | `undefined` | The URL string of an image already stored on the server, used to display the initial preview state. |
| `accept` | string | `"image/*"` | Defines the file types accepted by the browser file selector. |
| `disabled` | boolean | `false` | Disables the ability to select a new image. |
| `uploadText` | string | `"Select Image"` | The text displayed in the picker area when no image is selected. |

## 📐 Key Logic and Output

### Single File Constraint
The underlying file input is hardcoded with `multiple={false}`, ensuring only one image can ever be selected at a time.

### Preview and State
The component manages two states for display:
1.  **New Image Preview**: If a file has been selected in the current session (`image` state), it uses the local object URL (`URL.createObjectURL(file)`) for instant preview and displays a remove button.
2.  **External Image Preview**: If no new image is selected, it falls back to displaying the image provided via the `value` prop (a remote URL).

### Output Format
The `onChange` handler consistently returns an array of file objects:
*   **File Selected**: `onChange([file])`
*   **File Removed**: `onChange([])`

This allows the parent component to use a single piece of state (an array of files) to track the data that needs to be submitted to the server.
