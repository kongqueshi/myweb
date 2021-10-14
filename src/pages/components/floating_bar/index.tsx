import React from 'react';
import styles from './index.less';

const FloatingBar = ({ actions }: { actions: any[] }) => {
  return (
    <div className={styles.floatingBar}>
      {
        actions
      }
    </div>
  );
}

export default FloatingBar;