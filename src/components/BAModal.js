import React from 'react';
import { Modal } from "antd";

export default function BAModal(props) {
    const { title, open, close, content, style, footer, width, handleOK, className } = props;
    const handleClose = () => {
        if (close) close();
    }

    return (
        <Modal
            width={width}
            style={style}
            title={title}
            open={open}
            onCancel={handleClose}
            footer={footer ? footer : null}
            onOk={handleOK}
            className={className}
        >
            {content}
        </Modal>
    );
}
