import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/articleA.css";
import image from "../../../images/big_image_2.jpg";

import { Link, useNavigate } from "react-router-dom";
import Deconnection from "../Deconnection";
const Article = () => {

  return (
<>

<BarheaderAdmin />
      <NavBarAdmin />
   <Deconnection/>
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