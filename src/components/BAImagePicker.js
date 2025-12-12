"use client";

import React, { useRef, useState } from "react";
import { CloseOutlined } from '@ant-design/icons';
import { theme } from "antd";

const BAImagePicker = ({
    onChange,
    accept = "image/*",
    disabled = false,
    uploadText = "Select Image",
    value
}) => {
    const { token } = theme.useToken();
    // image state holds { file: File, url: string } or null
    const [image, setImage] = useState(null);
    const inputRef = useRef(null);

    const handleFiles = (files) => {
        if (!files || files.length === 0) return;
        const file = files[0];
        const imgObj = { file, url: URL.createObjectURL(file) };
        setImage(imgObj);
        onChange([file]);
    };

    const handleRemove = () => {
        setImage(null);
        onChange([]);
    };

    return (
        <div>
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={false}
                style={{ display: "none" }}
                disabled={disabled}
                onChange={(e) => handleFiles(e.target.files)}
            />
            <div
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-500 rounded-lg cursor-pointer"
                onClick={() => inputRef.current?.click()}
                style={{ display: "flex", gap: 8, marginTop: 8, width: 100, height: 100 }}
            >
                {image ? (
                    <div style={{ position: "relative" }}>
                        <img
                            className="rounded-lg"
                            src={image.url}
                            alt="preview"
                            style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 4 }}
                        />
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                            style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                background: token.colorPrimary,
                                color: "white",
                                border: "none",
                                borderRadius: "20%",
                                width: 20,
                                height: 20,
                                cursor: "pointer",
                                padding: 0,
                            }}
                        >
                            <CloseOutlined />
                        </button>
                    </div>
                ) : value && !image ? (
                    // If externally provided value exists and no new image selected, show remote image
                    <div style={{ position: "relative" }}>
                        <img
                            src={value}
                            alt="preview-value"
                            style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 4 }}
                        />
                        {/* Optional: Allow removing the initial value too? The prompt logic implies value is fallback. 
                             The prompt says "External Image Preview: If no new image is selected, it falls back to displaying the image provided via the value prop".
                             Logic in provided code:
                             `image ? (...) : value ? (...) : (...)`
                             Wait, the provided code logic was:
                             `image ? (...) : value ? (...) : (...)`
                             My logic above matches. 
                             Does the user want to be able to remove the *initial* value?
                             The provided code snippet for the 'value' case:
                             `value ? ( <img ... /> )`
                             It does NOT have a remove button.
                             So I will stick to the provided code logic.
                          */}
                    </div>
                ) : (
                    <span style={{ color: "#aaa", textAlign: 'center', fontSize: '12px' }}>{uploadText}</span>
                )}
            </div>
        </div>
    );
};

export default BAImagePicker;
