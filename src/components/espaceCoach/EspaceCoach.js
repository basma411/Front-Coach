import React from "react";
import image from "../../images/big_image_2.jpg";
import "./css/espaceCoach.css";
import image1 from "../../images/article.jpg";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import Newsletter from "../coach/Newsletter";
import Footer from "../coach/Footer";

const EspaceCoach = () => {
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
        <div >
          <h3 className="coachTitre">Vous êtes coach?</h3>
          <form class="d-block d-lg-flex mb-4">
            <div class="fields">
              <h3 className="formulairecoch">
                Rejoignez votre plateforme
                <Link to="/formulaire" >

                <button className="remplir">Formulaire à remplir</button>
                </Link>

              </h3>
            </div>
          </form>
        </div>
      </div>

      <div className="AddArticle">
      <Link to="/ajouter_article" >

        <button className="remplirArticle">Partagez article,offre</button>
        </Link>

        <div>
          <h2>Parcourez les articles, les offres d'emploi!</h2>
          <div className="ContainerArticle">
            <img src={image1} alt="image placeholder" />
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
