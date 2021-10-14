import React, { useState, useEffect } from 'react';
import { request } from 'umi';
import ImageView from './components/image_view';

const HOST = 'http://115.199.102.124:8111';
let index = -1;
let timer: NodeJS.Timeout | undefined;

const ImageBrowse = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<string>("");

  useEffect(() => {
    listAllImages();
  }, []);

  useEffect(() => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      nextImage();
    }, 1000);
  }, [currentImage]);

  const listAllImages = () => {
    request(HOST + '/files', {}).then((data) => {
      setImages(data);
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

  return (<ImageView src={currentImage} onClick={nextImage} />);
}

export default ImageBrowse;