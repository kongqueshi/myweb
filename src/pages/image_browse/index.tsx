import React, { useState, useEffect } from 'react';
import { request } from 'umi';
import ImageView from './components/image_view';

const HOST = '';
let index = -1;

const ImageBrowse = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<string>("");

  const timer = setInterval(() => {
    nextImage();
  }, 1000);

  useEffect(() => {
    listAllImages();
    return () => {
      clearInterval(timer);
    }
  }, []);

  const listAllImages = () => {
    request('/files', {}).then(({ success, data }: { success: boolean, data: string[] }) => {
      if (success) {
        setImages(data);
      }
    });
  }

  const nextImage = () => {
    if (images.length > 0) {
      index += 1;
      if (index >= images.length) {
        index = 0;
      }

      setCurrentImage(HOST + "/file/" + images[index]);
    }
  }

  return (<ImageView src="https://tse1-mm.cn.bing.net/th?id=OIP-C.0jcDIcBuAuCytqPdmBrRgQHaEo&w=200&h=139&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2" />);
}

export default ImageBrowse;