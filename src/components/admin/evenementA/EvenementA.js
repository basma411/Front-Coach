import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/evenementA.css";
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";
import { GetIcon } from "../../../Redux/Slice/IconSlice";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
const EvenementA = () => {
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
        <div >
      
<h4 style={{ fontSize: "20px", cursor: "pointer" }} onClick={handleLogout}>
  Déconnexion
</h4>

          <h4 style={{ fontSize: "20px" , padding:"0px"}}>
          Menu principal

          </h4>
        </div>
      </div>
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