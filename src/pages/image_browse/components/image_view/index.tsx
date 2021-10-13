import React from 'react';
import { Image } from 'antd';
import styles from './index.less';

const ImageView = ({ src }: { src: string }) => {
  return (
    <div className={styles.imageView}>
      <Image src={src} width={'100%'} preview={false} />
    </div>
  );
}

export default ImageView;