import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown } from "antd";

export default function BAMenu({ options = [], children }) {
    const items = options.map((option, index) => ({
        label: option.label,
        key: index.toString(),
        onClick: option.onClick,
        icon: option.icon
    }));

    return (
        <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()} style={{ cursor: 'pointer' }}>
                {children ? children : <DownOutlined />}
            </a>
        </Dropdown>
    );
}
