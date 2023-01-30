import { PageContainer } from '@ant-design/pro-components';
import { Alert } from 'antd';
import { DataNode } from 'antd/lib/tree';
import React, { useState } from 'react';
import MyEditor from './MyEditor';
import OutLineTree from './OutLineTree';
import styles from './Welcome.less';

const Welcome: React.FC = () => {
  const [treeData, setTreeData] = useState<DataNode[]>([])
  const [scrollItem, setScrollItem] = useState<DataNode>()

  return (
    <PageContainer>
      <div className={styles.editor}>
        <div className={styles.editor_tree}>
          <Alert message="大纲" type="info" showIcon />
          <OutLineTree treeData={treeData} setScrollItem={setScrollItem} />
        </div>
        <div className={styles.editor_main}>
          <MyEditor setTreeFunc={setTreeData} scrollItem={scrollItem} />
        </div>
      </div>
    </PageContainer>
  );
};

export default Welcome;
