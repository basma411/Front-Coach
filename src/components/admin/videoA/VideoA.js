import React from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/video.css";

import { Link, useNavigate } from "react-router-dom";
import Deconnection from "../Deconnection";
const VideoA = () => {
  const navigate=useNavigate()
  const handelAdd = () => {
    navigate("/admin/videoCoching/ajouter");
  };
  const handelList = () => {
    navigate("/admin/videoCoching/liste");
  };
  return (
<>

<BarheaderAdmin />
      <NavBarAdmin />
     <Deconnection/>
      <div className="Consultvideo">
        <div className="ConsultvideoContainer">
          <button className="btn-AddVedio" onClick={()=>handelAdd()}>Ajouter une Vidéo</button>
          <button className="btn-ListVedio" onClick={()=>handelList()}>Liste des Vidéos </button>
         
        </div>
      </div>
      </>  )
}


export default VideoA