import React from "react";
import { useNavigate } from "react-router-dom";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/articleA.css";
import Deconnection from "../Deconnection";

const Article = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <Deconnection />
      <div className="Consult-Articles">
        <div className="ConsultArticles-Container">
          <button className="buttonListArtc" onClick={() => handleNavigation('/admin/article/invisible')}>
            Liste des articles invisibles
          </button>
          <button className="buttonListArtc" onClick={() => handleNavigation('/admin/article/visible')}>
            Liste des articles visibles
          </button>
        </div>
      </div>
    </>
  );
};

export default Article;
