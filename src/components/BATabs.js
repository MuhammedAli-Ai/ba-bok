import React from 'react';
import { Tabs } from 'antd';

const BATabs = ({ tabsData, className }) => (
    <Tabs
        type="card"
        items={tabsData.map((tab) => ({
            label: tab.label,
            key: tab.key,
            children: tab.content,
        }))}
        className={className}
    />
);

export default BATabs;
