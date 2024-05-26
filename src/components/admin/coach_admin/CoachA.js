import React from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/coachA.css";
import image from "../../../images/big_image_2.jpg";
import { Link, useNavigate } from "react-router-dom";
const CoachA = () => {
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
        <div>
      
<h4 style={{ fontSize: "20px", cursor: "pointer" }} onClick={handleLogout}>
  Déconnexion
</h4>

          <h4 style={{ fontSize: "20px" , padding:"0px"}}>
          Menu principal

          </h4>
        </div>
      </div>
      <div className="ConsultCoach">
        <div className="ConsultCoachContainer">
          <Link to='/admin/Coachs/invisible'>
          <button className="AccueilCoach">Liste des coachs non validés sur la plateforme</button>
          </Link>
          <Link to='/admin/Coachs/visible'>
          <button className="AccueilCoach">Liste des coachs validés sur la plateforme </button>
          </Link>
         
        </div>
      </div>
      </>  )
}

export default CoachA