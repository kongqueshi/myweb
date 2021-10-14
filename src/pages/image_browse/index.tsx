import React, { useState, useEffect } from 'react';
import { request } from 'umi';
import ImageView from './components/image_view';

const HOST = 'http://115.199.102.124:8111';
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
      console.log(images[index])
      setCurrentImage(HOST + "/file/" + images[index]);
    }
  }

  return (<ImageView src={currentImage} />);
}

export default ImageBrowse;