import React from "react";
import { getImageUrl } from "../..";

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <h3 style={{color:'rgb(39, 84, 145)',fontSize:"16px",fontWeight:"300",lineHeight:'32px'}}>{video.titre}</h3>
      <img src={getImageUrl(video.images)} alt={video.titre} width="500px" height="300px" />
<h3 style={{color:"rgb(227, 216, 10)",cursor:"pointer",fontSize:"16px",fontWeight:"300",margin:'20px'}}>Partage...</h3>
 </div>
  );
};

export default VideoCard;
