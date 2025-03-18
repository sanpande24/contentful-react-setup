import React, { useState, useEffect } from "react";
//import { createClient } from "contentful";
import _ from "lodash";

const Video = ({ fields }) => {
    console.log("fields", fields);
  const [videoUrl, setVideoUrl] = useState("");
    const title = _.get(fields,"title");
    const video = _.get(fields,"assets");
    const videoId = _.get(video, "sys.id");


  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const asset = await client.getAsset(videoId);
        if (asset.fields.file) {
          setVideoUrl(asset.fields.file.url);
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [videoId]);

  return (
    <div className="video-container">
      {videoUrl ? (
        <video controls width="100%">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default Video;