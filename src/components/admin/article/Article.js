import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/articleA.css";
import image from "../../../images/big_image_2.jpg";

import { Link, useNavigate } from "react-router-dom";
const Article = () => {
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
      <div className="ConsultArticles">
        <div className="ConsultArticlesContainer">
          <Link to='/admin/article/invisible'>
          <button className="AccueilArticles">Liste des articles invisibles</button>
          </Link>
          <Link to='/admin/article/visible'>
          <button className="AccueilArticles">Liste des articles visibles </button>
          </Link>
         
        </div>
      </div>
      </>  )
}

export default Article