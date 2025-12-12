import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import BABox from './BABox';
import BAButton from './BAButton';
import BAModal from './BAModal'; // Assumed to exist or will be created
import BALoader from './BALoader';

const { Dragger } = Upload;

export default function BAExcelUpload({
    onPickRecords,
    sampleFileURL = "./invoice_import_template_final.xlsx",
    fileDownloadApi,
    sampleFileName = "sample_template.xlsx"
}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const downloadFile = () => {
        const link = document.createElement('a');
        if (fileDownloadApi) {
            // Logic for API download would go here
            link.href = fileDownloadApi;
        } else {
            link.href = sampleFileURL;
        }
        link.download = sampleFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDrop = (info) => {
        const { status } = info.file;
        if (status !== 'uploading') {
            // console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file parsed successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const beforeUpload = (file) => {
        setLoading(true);
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                // Convert array of arrays
                const data = XLSX.utils.sheet_to_json(ws);

                if (onPickRecords) {
                    onPickRecords(data);
                }
                setOpen(false);
                setLoading(false);
                message.success("Excel processed successfully!");
            } catch (err) {
                console.error(err);
                message.error("Failed to parse Excel file");
                setLoading(false);
            }
        };
        reader.readAsBinaryString(file);
        return false; // Prevent upload
    };

    return (
        <>
            <BAButton onClick={() => setOpen(true)} className="flex items-center gap-2">
                <UploadOutlined /> Import Excel
            </BAButton>

            <BAModal
                title="Import Excel"
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <BABox className="space-y-4">
                    {loading ? (
                        <BABox className="flex justify-center p-8">
                            <BALoader />
                        </BABox>
                    ) : (
                        <>
                            <BABox className="mb-4">
                                <BAButton onClick={downloadFile} size="small" type="link">
                                    Download Sample Template
                                </BAButton>
                            </BABox>

                            <Dragger
                                name="file"
                                multiple={false}
                                beforeUpload={beforeUpload}
                                onChange={handleDrop}
                                accept=".xlsx,.xls,.csv"
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag Excel file to this area to upload</p>
                            </Dragger>
                        </>
                    )}
                </BABox>
            </BAModal>
        </>
    );
}
