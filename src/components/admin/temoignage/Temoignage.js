import React from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/temoignage.css";
import image from "../../../images/big_image_2.jpg";

import { Link } from "react-router-dom";
const Temoignage = () => {
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
        <Link to='/admin/login'>

          <h2 style={{ fontSize: "20px" }}>

          Déconnexion
          </h2>
          </Link>

          <h2 style={{ fontSize: "20px" }}>
          Menu principal

          </h2>
        </div>
      </div>
      <div className="ConsultTemoignage">
        <div className="ConsultTemoignageContainer">
          <Link to='/admin/témoignages/invisible'>
          <button className="AccueilTemoignage">Liste des témoignages invisibles</button>
          </Link>
          <Link to='/admin/témoignages/visible'>
          <button className="AccueilTemoignage">Liste des témoignages visibles </button>
          </Link>
         
        </div>
      </div>
      </>
)
}

export default Temoignage