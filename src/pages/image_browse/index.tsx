import React, { useState, useEffect } from "react";
import { request } from "umi";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import FloatingBar from "../components/floating_bar";
import ImageView from "./components/image_view";
import styles from "./index.less";

const HOST = "http://115.199.102.130:8111";
let index = -1;
let timer: NodeJS.Timeout | undefined;
let timeGap = 1000;

const rootRef = React.createRef();

const ImageBrowse = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<string>("");

  useEffect(() => {
    listAllImages();
  }, []);

  useEffect(() => {
    nextImage();
  }, [images]);

  useEffect(() => {
    nextImageWithDelay();
  }, [currentImage]);

  const listAllImages = () => {
    request(HOST + "/files", {}).then((data) => {
      setImages(data);
    });
  };

  const nextImageWithDelay = () => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      nextImage();
    }, timeGap);
  };

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
  };

  const addTimeGap = () => {
    console.log("add");
    timeGap += 500;
  };

  const minusTimeGap = () => {
    timeGap -= 500;
    if (timeGap < 500) {
      timeGap = 500;
    }

    nextImageWithDelay();
  };

  return (
    <div
      ref={rootRef}
      onClick={() => rootRef.current.requestFullscreen()}
      className={styles.imageBrowse}
    >
      <FloatingBar
        actions={[
          <PlusCircleOutlined onClick={addTimeGap} />,
          <MinusCircleOutlined onClick={minusTimeGap} />,
        ]}
      />
      <ImageView src={currentImage} onClick={nextImage} />
      {/* <ImageView src={"http://git.cn-hangzhou.oss-cdn.aliyun-inc.com/uploads/f2e-just/just/850b09e6c457af27e5a00d01aec87018/image.png#alt=image"} onClick={nextImage} /> */}
    </div>
  );
};

export default ImageBrowse;
