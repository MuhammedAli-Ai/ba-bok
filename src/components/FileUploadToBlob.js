import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import BAButton from "./BAButton";

const FileUploadToBlob = ({
    onFileUpload,
    accept = ".jpg, .jpeg, .png, .pdf, .xls, .xlsx",
    multiple = false,
    disabled = false,
    uploadText = "Upload",
    ...rest
}) => {
    const props = {
        showUploadList: false,
        beforeUpload(file) {
            onFileUpload(file);
            // Returning false to prevent automatic upload by Ant Design
            return false;
        },
        accept,
        multiple,
        ...rest,
    };

    return (
        <Upload {...props}>
            <BAButton
                icon={<UploadOutlined />}
                disabled={disabled}
                label={uploadText}
            />
        </Upload>
    );
};

export default FileUploadToBlob;
