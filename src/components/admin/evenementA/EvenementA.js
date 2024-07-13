import React from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/evenementA.css";
import image from "../../../images/big_image_2.jpg";

import { Link, useNavigate } from "react-router-dom";
import Deconnection from "../Deconnection";
const EvenementA = () => {
  const navigator=useNavigate()
  const handelAddEvnt = () => {
    navigator("/admin/Evenements/AjouterEvenement")};
const handelListEvnt = () => {
  navigator("/admin/Evenements/liste")};
  return (
<>

<BarheaderAdmin />
      <NavBarAdmin />
   <Deconnection/>
      <div className="ConsultEvenement">
        <div className="ConsultEvenementContainer">
          <button className="AccuEvenement" onClick={()=>handelAddEvnt()}>Ajouter un événement</button>
          <button className="AccuEvenement" onClick={()=>handelListEvnt()}>Liste des événements </button>
         
        </div>
      </div>
      </>  )
}

export default EvenementA