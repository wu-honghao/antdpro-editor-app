import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import MyEditor from './MyEditor';
import OutLineTree from './OutLineTree';
import styles from './Welcome.less';

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <div className={styles.editor}>
        <div className={styles.editor_tree}>
          <OutLineTree />
        </div>
        <div className={styles.editor_main}>
          <MyEditor />
        </div>
      </div>
    </PageContainer>
  );
};

export default Welcome;
