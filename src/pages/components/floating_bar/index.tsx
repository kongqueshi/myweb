import React from 'react';
import styles from './index.less';

const FloatingBar = ({ actions }: { actions: any[] }) => {
  return (
    <div className={styles.floatingBar} onClick={(event: any) => event.stopPropagation()}>
      {
        actions
      }
    </div>
  );
}

export default FloatingBar;