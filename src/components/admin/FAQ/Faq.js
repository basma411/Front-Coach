import React from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/faq.css";
import image from "../../../images/big_image_2.jpg";
import {  useNavigate } from "react-router-dom";
const Faq = () => {
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
      <div className="ConsultFAQ">
        <div className="ConsultFAQContainer">
          <button className="AccueilFAQ" onClick={()=>navigator('/admin/add-faq')}>Ajouter un FAQ</button>
          <button className="AccueilFAQ" onClick={()=>navigator('/admin/list-faq')}>Liste des FAQ</button>

        </div>
      </div>
      </>  )
}


export default Faq