import React from "react";
import image from "../../images/big_image_2.jpg";
import "./css/espaceCoach.css";
import image1 from "../../images/article.jpg";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Newsletter from "../coach/Newsletter";
import Footer from "../coach/Footer";

const EspaceCoach = () => {
  const navigate = useNavigate();
  const handleFormulaire = () => navigate("/formulaire");
  const handleAddArticle = () => navigate("/ajouter_article");
  const handleARTICLES = () => navigate("/articles");

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
        <div style={{ width: "100%" }}>
          <h3 className="coach_Titre">Vous êtes coach?</h3>
          <form className="FORMECOACH">
            <div className="fieldsCOACH d-block d-lg-flex">
              <h3 className="formulairecoach">
                Rejoignez votre plateforme
                <button
                  className="remplirFormulaire"
                  onClick={handleFormulaire}
                >
                  Formulaire à remplir
                </button>
              </h3>
            </div>
          </form>
        </div>
      </div>

      <div className="Add-Article">
        <button className="remplir-Article" onClick={handleAddArticle}>
          Partagez article, offre
        </button>

        <div className="ARTICLEright">
          <h2 className="ParcourArticle">
            Parcourez les articles, les offres d'emploi!
          </h2>
          <div className="ContainerArticle" onClick={handleARTICLES} style={{ cursor: 'pointer' }}>
            <div className="image-container">
              <img
                src={image1}
                alt="image placeholder"
                className="image-Article"
              />
              <FaPlay className="icon-play" />
            </div>
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default EspaceCoach;
