import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/vedio.css";
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";
import { GetIcon } from "../../../Redux/Slice/IconSlice";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
const VedioA = () => {
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
      <div className="ConsultVedio">
        <div className="ConsultVedioContainer">
          <Link to='/admin/VedioCoching/ajouter'>
          <button className="AccueilVedio">Ajouter une Vidéo</button>
          </Link>
          <Link to='/admin/VedioCoching/vedio_liste'>
          <button className="AccueilVedio">Liste des Vidéos </button>
          </Link>
         
        </div>
      </div>
      </>  )
}


export default VedioA