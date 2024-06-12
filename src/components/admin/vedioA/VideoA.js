import React from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/video.css";
import image from "../../../images/big_image_2.jpg";

import { Link, useNavigate } from "react-router-dom";
const VideoA = () => {
  const navigator=useNavigate()
  const handleLogout = () => {
 navigator("/admin/login")
  };
  return (
<>

<BarheaderAdmin />
      <NavBarAdmin />
      <div
        className="ImagePlatforme"
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
        <h4 style={{ fontSize: "20px", cursor: "pointer" }} onClick={handleLogout}>
  Déconnexion
</h4>

          <h4 style={{ fontSize: "20px" }}>
          Menu principal

          </h4>
        </div>
      </div>
      <div className="Consultvideo">
        <div className="ConsultvideoContainer">
          <Link to='/admin/videoCoching/ajouter'>
          <button className="Accueilvideo">Ajouter une Vidéo</button>
          </Link>
          <Link to='/admin/videoCoching/liste'>
          <button className="Accueilvideo">Liste des Vidéos </button>
          </Link>
         
        </div>
      </div>
      </>  )
}


export default VideoA