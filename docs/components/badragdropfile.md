---
sidebar_position: 8
---

# 📤 BADragDropFile Component

## Description

The `BADragDropFile` component provides a versatile, drag-and-drop interface for uploading files, built upon the Ant Design `Upload.Dragger`. Crucially, this component is designed for **client-side file handling**, meaning it captures files (as standard JavaScript `File` objects/Blobs) and passes them to a parent handler via `onFileUpload`, rather than performing an immediate server upload. It supports previewing and managing the uploaded file list. 

## 📦 Installation / Import

```javascript
import BADragDropFile from "@site/src/components/BADragDropFile";
// Note: This component requires Ant Design and its dependencies to be installed.
```

## 🔗 Dependencies

*   **antd**: Provides the core UI components: `Upload` (specifically `Dragger`), `message`, `Image`, and `InboxOutlined` from `@ant-design/icons`.

## 🛠️ Usage

The primary interaction is through the `onFileUpload` prop, which receives the list of client-side file objects.

### Example

```javascript
import React, { useState } from 'react';
import BADragDropFile from '@site/src/components/BADragDropFile';

function DocumentUploader() {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleFiles = (files) => {
        // 'files' will be an array of standard JavaScript File objects
        setUploadedFiles(files);
        console.log(`Total files ready for submission: ${files.length}`);
    };

    return (
        <div>
            <h3>Upload Supporting Documents</h3>
            <BADragDropFile
                onFileUpload={handleFiles}
                uploadText="Drag files here or click to browse"
                accept=".pdf,.doc,.docx" // Override default accepted types
            />
            {uploadedFiles.length > 0 && (
                <p className="mt-2">Files pending upload: {uploadedFiles.map(f => f.name).join(', ')}</p>
            )}
        </div>
    );
}
export default DocumentUploader;
```

## ⚙️ Props

The component extends standard Ant Design `UploadProps` and adds specific handling props:

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `onFileUpload` | `(file: File \| File[]) => void` | N/A | **Required**. Callback triggered when files are added, removed, or dropped. Receives the updated array of client-side File objects. |
| `accept` | string | `".jpg, .jpeg, .png, .pdf, .xls, .xlsx"` | String defining accepted file types (MIME types or extensions). |
| `multiple` | boolean | `false` | Allows selecting multiple files simultaneously. |
| `disabled` | boolean | `false` | Disables the upload area. |
| `uploadText` | string | `"Click or drag file to this area to upload"` | The main text displayed in the drag-and-drop area. |
| `action` | string | `undefined` | The target URL for upload. **NOTE**: The default server upload is prevented; this prop is mostly unused. |

## 🔑 Key Logic & Constraints

### File Handling

*   **Client-Side Only**: The component explicitly prevents the default server upload behavior using `beforeUpload: return false;`. All file objects are managed in the component's state and returned to the parent via `onFileUpload`.
*   **Output Data**: The `onFileUpload` prop consistently provides an array of standard JavaScript `File` objects (client-side data) representing the current list of files selected by the user.
*   **Preview Functionality**: The component includes a `handlePreview` function using `getBase64` to generate a base64 URL for image files, enabling the Ant Design `Image` component to display a large preview when the thumbnail is clicked.

### Constraints

*   **Maximum File Count**: The component enforces a hard limit of **3 files** per upload instance via the `maxCount={3}` prop on `<Dragger>` and an explicit check in `beforeUpload`. An error message is displayed if the user tries to upload more.
*   **Accepted Types**: By default, it accepts common image, document, and spreadsheet formats: `.jpg`, `.jpeg`, `.png`, `.pdf`, `.xls`, `.xlsx`. This can be overridden using the `accept` prop.
