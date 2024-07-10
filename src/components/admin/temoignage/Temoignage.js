import React from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/temoignage.css";
import image from "../../../images/big_image_2.jpg";

import { Link } from "react-router-dom";
import Deconnection from "../Deconnection";
const Temoignage = () => {
  return (
<>

<BarheaderAdmin />
      <NavBarAdmin />
   <Deconnection/>
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