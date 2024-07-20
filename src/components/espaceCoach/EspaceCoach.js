import React from "react";
import image from "../../images/big_image_2.jpg";
import "./css/espaceCoach.css";
import image1 from "../../images/article.jpg";
import { FaPlay } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Newsletter from "../coach/Newsletter";
import Footer from "../coach/Footer";

const EspaceCoach = () => {
  const navigate=useNavigate()
  const handelFormilaire = () => navigate("/formulaire");

  return (
    <>
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
        <div style={{width:"100%"}} >
          <h3 className="coach_Titre">Vous êtes coach?</h3>
          <form class="FORMECOACH">
            <div class="fieldsCOACH  d-block d-lg-flex">
              <h3 className="formulairecoach">
                Rejoignez votre plateforme

                <button className="remplirFormulaire" onClick={handelFormilaire}>Formulaire à remplir</button>

              </h3>
            </div>
          </form>
        </div>
      </div>

      <div className="AddArticle">
      <Link to="/ajouter_article" >

        <button className="remplirArticle">Partagez article,offre</button>
        </Link>

        <div className="ARTICLEright">
          <h2 className="ParcourArticle">Parcourez les articles, les offres d'emploi!</h2>
          <div className="ContainerArticle">
            <img src={image1} alt="image placeholder" width="100%" height="100vh" />
            <Link to="/articles" className="icon-play">
              <FaPlay />
            </Link>
          </div>
        </div>
      </div>
      <Newsletter/>
      <Footer/>
    </>
  );
};

export default EspaceCoach;
