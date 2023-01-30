import { PageContainer } from '@ant-design/pro-components';
import { DataNode } from 'antd/lib/tree';
import React, { useEffect, useState } from 'react';
import MyEditor from './MyEditor';
import OutLineTree from './OutLineTree';
import styles from './Welcome.less';

const Welcome: React.FC = () => {
  const [treeData, setTreeData] = useState<DataNode[]>([
    {
      title: '大纲',
      key: '0-0',
      children: []
    }
  ])
  useEffect(() => {
    console.log(treeData)
  }, [treeData])
  return (
    <PageContainer>
      <div className={styles.editor}>
        <div className={styles.editor_tree}>
          <OutLineTree treeData={treeData} />
        </div>
        <div className={styles.editor_main}>
          <MyEditor setTreeFunc={setTreeData} />
        </div>
      </div>
    </PageContainer>
  );
};

export default Welcome;
