import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import React from 'react';

interface Iprops {
    treeData: DataNode[]
}
const OutLineTree: React.FC<Iprops> = (props: Iprops) => {
    const { treeData } = props
    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    return (
        <Tree
            showLine
            switcherIcon={<DownOutlined />}
            defaultExpandedKeys={['0-0-0']}
            onSelect={onSelect}
            treeData={treeData}
        />
    );
};

export default OutLineTree;