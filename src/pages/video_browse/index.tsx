import React, { useState, useEffect } from "react";
import { request } from "umi";
import ReactPlayer from "react-player";
import styles from "./index.less";

const HOST = "http://115.199.102.130:8111";
let index = -1;
let timer: NodeJS.Timeout | undefined;
let timeGap = 1000;

const rootRef = React.createRef();

const VideoBrowse = () => {
  const [videos, setVideos] = useState<string[]>([]);
  const [currentVideo, setCurrentVidoe] = useState<string>("");

  useEffect(() => {
    listAllVideos();
  }, []);

  useEffect(() => {
    next();
  }, [videos]);

  const listAllVideos = () => {
    request(HOST + "/videos", {}).then((data) => {
      setVideos(data.map((video: any) => `${HOST}/video?filename=${video}`));
    });
  };

  const next = () => {
    console.log("fsfsd");
    index += 1;
    if (index >= videos.length) {
      index = 0;
    }
    setCurrentVidoe(videos[index]);
  };

  return (
    <div>
      {videos.length && (
        <ReactPlayer
          playing
          controls
          url={currentVideo}
          onEnded={() => next()}
        />
      )}
    </div>
  );
};

export default VideoBrowse;
