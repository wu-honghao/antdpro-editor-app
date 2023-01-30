import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import React from 'react';

interface Iprops {
    treeData: DataNode[]
    setScrollItem: Function
}
const OutLineTree: React.FC<Iprops> = (props: Iprops) => {
    const { treeData, setScrollItem } = props
    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        setScrollItem(info.selectedNodes[0])
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