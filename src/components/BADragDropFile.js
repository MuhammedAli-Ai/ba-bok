import React, { useState } from 'react';
import { Upload, message, Image } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import BABox from './BABox';

const { Dragger } = Upload;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default function BADragDropFile({
    onFileUpload,
    accept = ".jpg, .jpeg, .png, .pdf, .xls, .xlsx",
    multiple = false,
    disabled = false,
    uploadText = "Click or drag file to this area to upload",
    action,
    ...props
}) {
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);

        // Convert to standard File objects for onFileUpload
        const fileObjects = newFileList.map(f => f.originFileObj).filter(Boolean);

        if (onFileUpload) {
            onFileUpload(fileObjects);
        }
    };

    const beforeUpload = (file) => {
        if (fileList.length >= 3) {
            message.error('You can only upload up to 3 files!');
            return Upload.LIST_IGNORE;
        }
        return false; // Prevent auto upload
    };

    return (
        <BABox>
            <Dragger
                name="file"
                multiple={multiple}
                action={action}
                disabled={disabled}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={beforeUpload}
                accept={accept}
                maxCount={3}
                listType="picture"
                {...props}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">{uploadText}</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                </p>
            </Dragger>

            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </BABox>
    );
}
