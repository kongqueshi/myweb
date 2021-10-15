import React, { useState } from "react";
import styles from "./index.less";

const FloatingBar = ({ actions }: { actions: any[] }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={styles.floatingBar}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {visible && actions}
    </div>
  );
};

export default FloatingBar;
