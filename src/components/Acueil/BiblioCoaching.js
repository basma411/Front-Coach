import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetBiblio } from "../../Redux/Slice/BiblioSlice";
import { Card } from "react-bootstrap";
import "./css/biblio.css";
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
                <div className={`flipper ${isHovered === index ? "flipped" : ""}`}>
                  <div className="front">
                    <Card>
                      <div className="image-containerBiblio ">
                        <Card.Img
                          variant="top"
                          src={getImageUrl(Biblio.photo_c)}
                          className="IMAGE-biblio"
                        />
                      </div>
                    </Card>
                  </div>
                  <Card className="back">
                    <Card.Body>
                      <Card.Body className="textCard">
                        <p className="Bibliodesc">
                          {Biblio.descrip}
                        </p>
                        <div className="author">
                          <div>
                            <img
                              src={getImageUrl(Biblio.photo_c)}
                              width="60px"
                              height="80px"
                              className="author-img"
                            />
                          </div>
                          <div className="name">
                            <h3 className="BiblioAut">{Biblio.auteur1}</h3>
                            <h3 className="BiblioAnne">{Biblio.annee}</h3>
                          </div>
                        </div>
                      </Card.Body>
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
