import React, { useEffect } from "react";
import image from "../../images/big_image_2.jpg";
import "./css/videocoach.css";
import { useDispatch, useSelector } from "react-redux";
import VideoCard from "./VideoCard";
import Newsletter from "../coach/Newsletter";
import Footer from "../coach/Footer";
import { Getvideo } from "../../Redux/Slice/videoSlice";
const Videocoach = () => {
  const dispatch = useDispatch();

  const { video } = useSelector((state) => state.video);
  useEffect(() => {
    dispatch(Getvideo());
  }, [dispatch]);
  return (
    <>
      <div
        className="ImagePlatformeVedio"
        style={{
          position: "relative",
          textAlign: "center",
          height: "300px",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <div >
          <h3 className="Vedio-Titre">VidéoCoaching</h3>
        </div>
      </div>

      <div className="videoCoach">
        <div className="videoCoachContainer">
          <h1 className="videoTitre">
            Parcourez nos vidéos sur la chaîne YouTube : MonCoach.tn
          </h1>
          <div className="video-list">
            {video && video.map((VD) => <VideoCard key={VD.id} video={VD} />)}
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Videocoach;
