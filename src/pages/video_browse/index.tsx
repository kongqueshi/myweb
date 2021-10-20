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

const VideoBrowse = () => {
  const [videos, setVideos] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<string>("");

  useEffect(() => {
    listAllVideos();
  }, []);

  const listAllVideos = () => {
    request(HOST + "/videos", {}).then((data) => {
      setVideos(data);
    });
  };

  return (
    <div>
      {videos.map((video) => (
        <a href={`${HOST}/video?filename=${video}`}>{video}</a>
      ))}
    </div>
  );
};

export default VideoBrowse;
