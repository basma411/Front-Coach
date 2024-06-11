import React, { useEffect } from "react";
import image from "../../images/big_image_2.jpg";
import "./css/vediocoach.css";
import { GetVedio } from "../../Redux/Slice/VedioSlice";
import { useDispatch, useSelector } from "react-redux";
import VideoCard from "./VideoCard";
import Newsletter from "../coach/Newsletter";
import Footer from "../coach/Footer";
const Vediocoach = () => {
  const dispatch = useDispatch();

  const { Vedio } = useSelector((state) => state.vedio);
  useEffect(() => {
    dispatch(GetVedio());
  }, [dispatch]);
  return (
    <>
      <div
        className="ImagePlatformeEvn"
        style={{
          position: "relative",
          textAlign: "center",
          height: "300px",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <div style={{ paddingTop: "100px" }}>
          <h2>VidéoCoaching</h2>
        </div>
      </div>

      <div className="vedioCoach">
        <div className="vedioCoachContainer">
          <h1 className="vedioTitre">
            Parcourez nos vidéos sur la chaîne YouTube : MonCoach.tn
          </h1>
          <div className="video-list">
            {Vedio && Vedio.map((VD) => <VideoCard key={VD.id} video={VD} />)}
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Vediocoach;
