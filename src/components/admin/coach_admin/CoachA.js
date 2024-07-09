import React from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/coachA.css";
import { Link, useNavigate } from "react-router-dom";
import Deconnection from "../Deconnection";
const CoachA = () => {

  return (
<>

<BarheaderAdmin />
      <NavBarAdmin />
      <Deconnection/>
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