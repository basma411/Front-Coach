import React from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/faq.css";
import image from "../../../images/big_image_2.jpg";
import {  useNavigate } from "react-router-dom";
import Deconnection from "../Deconnection";
const Faq = () => {
  const navigator=useNavigate()
  const handleLogout = () => {
 navigator("/admin/login")
  };
  return (
<>

<BarheaderAdmin />
      <NavBarAdmin />
    <Deconnection/>
      <div className="ConsultFAQ">
        <div className="ConsultFAQContainer">
          <button className="AccueilFAQ" onClick={()=>navigator('/admin/add-faq')}>Ajouter un FAQ</button>
          <button className="AccueilFAQ" onClick={()=>navigator('/admin/list-faq')}>Liste des FAQ</button>

        </div>
      </div>
      </>  )
}


export default Faq