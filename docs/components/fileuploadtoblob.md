---
sidebar_position: 28
---

# FileUploadToBlob Component

## Description

The `FileUploadToBlob` component is a specialized wrapper around the Ant Design `Upload` component designed to handle file selection and immediately pass the native JavaScript `File` object (often referred to as a "blob" or file reference) to a parent component's handler without initiating an automatic HTTP upload request.

It uses a custom `BAButton` for the upload trigger and hides the default Ant Design upload list for a cleaner interface.

## 📦 Installation / Import

```javascript
import FileUploadToBlob from "@site/src/components/FileUploadToBlob";
```

## 🔗 Dependencies

*   **Internal Components**: `<BAButton />`.
*   **External Libraries**: `Upload` (Ant Design).
*   **External Icons**: `UploadOutlined` (Ant Design Icons).

## 🛠️ Usage

This example demonstrates how to use `FileUploadToBlob` to select a single file and log its details (name and size) to the console without uploading it to a server.

### Example

```javascript
import React, { useState } from 'react';
import FileUploadToBlob from '@site/src/components/FileUploadToBlob';
import { Typography } from 'antd';

const { Text } = Typography;

function DocumentUploader() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelection = (file) => {
        // The 'file' argument here is the standard File object.
        console.log('File selected:', file);
        setSelectedFile(file);
        // Returning false here prevents Ant Design from attempting to upload the file.
        return false; 
    };

    return (
        <div style={{ padding: 20 }}>
            <Text strong>Select Document to Process:</Text>
            <div style={{ marginTop: 10 }}>
                <FileUploadToBlob
                    onFileUpload={handleFileSelection}
                    accept=".pdf, .docx, image/*" // Custom file types
                    uploadText="Choose File"
                />
            </div>
            
            {selectedFile && (
                <div style={{ marginTop: 15 }}>
                    <Text type="success">File Ready:</Text>
                    <Text> <strong>{selectedFile.name}</strong> ({Math.round(selectedFile.size / 1024)} KB)</Text>
                </div>
            )}
        </div>
    );
}

export default DocumentUploader;
```

## ⚙️ Props

This component extends the standard Ant Design `UploadProps` and adds specific properties for its file handling logic.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `onFileUpload` | `(blob: any) => void` | N/A | **Required**. The handler function called when a file is selected. It receives the selected file as a standard browser File object (blob or File). **Note**: Returning `false` or a `Promise.reject()` from this function will prevent the file from being selected (or uploaded if auto-upload was active, though this component prevents that). |
| `accept` | string | `".jpg, .jpeg, .png, .pdf, .xls, .xlsx"` | Specifies the file types that are acceptable. Uses standard HTML `accept` attribute values. |
| `multiple` | boolean | `false` | Whether to allow selection of multiple files. |
| `disabled` | boolean | `false` | Whether the upload button should be disabled. |
| `uploadText` | string | `"Upload"` | The text displayed on the custom `BAButton`. |
| `...rest` | `UploadProps` | N/A | All other standard Ant Design `Upload` properties (e.g., `listType`, `maxCount`) can be passed through. |

## 🔑 Internal Logic

The core functionality relies on overriding the `beforeUpload` prop of the Ant Design `Upload` component. By defining this function to call `onFileUpload(file)`, the component prevents the default HTTP upload behavior and instead passes the file object to the consumer component immediately upon selection.
