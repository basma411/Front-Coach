import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetBiblio } from "../../Redux/Slice/BiblioSlice";
import { Card } from "react-bootstrap"; // Importez le composant de carte Bootstrap
import "./css/biblio.css"; // Importez le fichier CSS externe
import { getImageUrl } from "../..";

const BiblioCoaching = () => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(null);

  const { Biblios } = useSelector((state) => state.biblio);
  useEffect(() => {
    dispatch(GetBiblio());
  }, [dispatch]);

  const handleHover = (index) => {
    setIsHovered(index);
  };

  const handleLeave = () => {
    setIsHovered(null);
  };

  return (
    <div className="biblioAccueil">
<div className="ContainerBiblio">
      <h3 className="titreBiblio">BiblioCoaching</h3>
      <div className="site-section">
        {Biblios &&
          Biblios.map((Biblio, index) => (
            <div
              key={index}
              className="flip-container"
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleLeave}
            >
              <div
                className={`flipper ${isHovered === index ? "flipped" : ""}`}
              >
                <div className="front">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={getImageUrl(Biblio.photo_c)}
                      style={{ width: "350px", height: "427px" }}
                    />
                  </Card>
                </div>
                <Card
                  className="back"
                >
                  <Card.Body>
                    <Card.Text                   style={{ width: "350px", height: "400px" }}
>
                      <p
                        style={{
                          fontStyle: "italic",
                          color: "#000",
                          margintop: "0",
                          marginbottom: "1rem",
                          fontSize:"12px"
                        }}
                        className="BiblioDescrip"
                      >
                        {" "}
                        {Biblio.descrip}
                      </p>
                      <div className="author d-flex">
                        <img
                          src={getImageUrl(Biblio.photo_c)}
                          width="60px"
                          height="80px"
                          className="author-img"
                        />
                        <div className="name align-self-center">
                        
<h3 className="BiblioAut">{Biblio.auteur1}</h3>
<h3 className="BiblioAnne">{Biblio.annee}</h3>

                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          ))}
      </div>
    </div>
    </div>
  );
};

export default BiblioCoaching;
