import React from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/temoignage.css";
import image from "../../../images/big_image_2.jpg";

import { Link, useNavigate } from "react-router-dom";
import Deconnection from "../Deconnection";
const Temoignage = () => {
  const navigate=useNavigate()
  const handelListVesible = () => {
    navigate("/admin/témoignages/visible");
  };
  const handelListInvesible = () => {
    navigate("/admin/témoignages/invisible");
  };
  return (
<>

<BarheaderAdmin />
      <NavBarAdmin />
   <Deconnection/>
      <div className="ConsultTemoignage">
        <div className="ConsultTemoignageContainer">
          <button className="AccueilTemoignage" onClick={handelListInvesible}>Liste des témoignages invisibles</button>
          <button className="AccueilTemoignage" onClick={handelListVesible}>Liste des témoignages visibles </button>
         
        </div>
      </div>
      </>
)
}

export default Temoignage