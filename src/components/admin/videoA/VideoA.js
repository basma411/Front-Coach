import React from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/video.css";

import { Link } from "react-router-dom";
import Deconnection from "../Deconnection";
const VideoA = () => {

  return (
<>

<BarheaderAdmin />
      <NavBarAdmin />
     <Deconnection/>
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