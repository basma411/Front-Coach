import React from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/evenementA.css";
import image from "../../../images/big_image_2.jpg";

import { Link, useNavigate } from "react-router-dom";
import Deconnection from "../Deconnection";
const EvenementA = () => {
  const navigator=useNavigate()

  return (
<>

<BarheaderAdmin />
      <NavBarAdmin />
   <Deconnection/>
      <div className="ConsultEvenement">
        <div className="ConsultEvenementContainer">
          <Link to='/admin/Evenements/AjouterEvenement'>
          <button className="AccueilEvenement">Ajouter un événement</button>
          </Link>
          <Link to='/admin/Evenements/liste'>
          <button className="AccueilEvenement">Liste des événements </button>
          </Link>
         
        </div>
      </div>
      </>  )
}

export default EvenementA