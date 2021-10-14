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
    nextImage();
  }, []);

  useEffect(() => {
    nextImageWithDelay();
  }, [currentImage]);

  const listAllImages = () => {
    request(HOST + '/files', {}).then((data) => {
      setImages(data);
    });
  }

  const nextImageWithDelay = () => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      nextImage();
    }, 1000)
  }

  const nextImage = () => {
    let isIndexChanged = false;

    if (images.length > 0) {
      let newIndex = index + 1;
      if (newIndex >= images.length) {
        newIndex = 0;
      }

      if (newIndex != index) {
        isIndexChanged = true;
        index = newIndex;
      }
    }

    if (isIndexChanged) {
      setCurrentImage(HOST + "/file/" + images[index]);
    } else {
      nextImageWithDelay();
    }
  }

  return (<ImageView src={currentImage} onClick={nextImage} />);
}

export default ImageBrowse;