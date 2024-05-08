import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetBiblio } from "../../Redux/Slice/BiblioSlice";
import { Card } from "react-bootstrap"; // Importez le composant de carte Bootstrap
import "./css/biblio.css"; // Importez le fichier CSS externe

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
    <div className="Container">
      <h2>BiblioCoaching</h2>
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
                      src={`http://localhost:8000/${Biblio.image}`}
                      style={{ width: "370px", height: "427px" }}
                    />
                  </Card>
                </div>
                <Card
                  className="back"
                >
                  <Card.Body>
                    <Card.Text                   style={{ width: "370px", height: "400px" }}
>
                      <p
                        style={{
                          fontStyle: "italic",
                          color: "#000",
                          margintop: "0",
                          marginbottom: "1rem",
                          fontSize:"12px"
                        }}
                      >
                        {" "}
                        {Biblio.description}
                      </p>
                      <div className="author d-flex">
                        <img
                          src={`http://localhost:8000/${Biblio.image}`}
                          width="60px"
                          height="80px"
                        />
                        <div className="name align-self-center">
                        
<h3>{Biblio.auteur1}</h3>
<h4>{Biblio.annee}</h4>

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
  );
};

export default BiblioCoaching;
