import React from 'react';
import { Image } from 'antd';
import styles from './index.less';

const ImageView = ({ src, onClick }: { src: string, onClick: () => void }) => {
  return (
    <div className={styles.imageView}>
      <Image onClick={onClick} src={src} width={'100%'} preview={false} />
    </div>
  );
}

export default ImageView;