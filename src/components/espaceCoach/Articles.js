import React, { useEffect, useState } from "react";
import image from "../../images/big_image_2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { GetArticle } from "../../Redux/Slice/ArticleSlice";
import Card from "react-bootstrap/Card";
import "./css/article.css";
import Newsletter from "../coach/Newsletter";
import Footer from "../coach/Footer";
import { getImageUrl } from "../..";
import logo from "../../images/logo.jpg";
import { GrLinkedin } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";
import { MdPerson } from "react-icons/md";

const Articles = () => {
  const dispatch = useDispatch();
  const { Articles } = useSelector((state) => state.article);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false); // État pour afficher/cacher le modal
  const [selectedArticle, setSelectedArticle] = useState(null); // État pour stocker l'article sélectionné

  useEffect(() => {
    dispatch(GetArticle());
  }, [dispatch]);

  const pageSize = 6; // Nombre d'articles par page

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, Articles.length);

  // Fonction pour ouvrir le modal et définir l'article sélectionné
  const openModal = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setShowModal(false);
  };

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
        <div style={{ paddingTop: "100px" }}>
          <h2>Articles</h2>
        </div>
      </div>

      <div className="article-list">
        {Articles.slice(startIndex, endIndex).map((article, index) => (
          <div key={index} className="article-card" onClick={() => openModal(article)}>
            <Card>
              <Card.Img variant="top" src={getImageUrl(article.photo)} height="250px" />
              <Card.Body>
                <Card.Title className="article-card-title">{article.titre}</Card.Title>
                <Card.Text>
                  <div className="article-card-author">
                    <MdPerson className="article-card-author-icon" />
                    <h5>{article.auteur}</h5>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {Array.from({ length: Math.ceil(Articles.length / pageSize) }).map((_, index) => (
          <button
            key={index}
            style={{
              width: "20px",
              textAlign: "center",
              margin: "5px",
              padding: "auto",
              background: index + 1 === currentPage ? "#275491" : "#ddd",
              color: index + 1 === currentPage ? "#fff" : "#000",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modal pour afficher les détails de l'article sélectionné */}
      {showModal && selectedArticle && (
        <div className="modalBaghroundArticle">
          <span className="close" onClick={closeModal}>&times;</span>
          <div className="modalcontainerArticle">
            <img src={logo} alt="logo" width="220px" height="70" />
            <hr />
            <div>
              <img src={getImageUrl(selectedArticle.photo)} alt="Article" className="Artc-image" width="100px" />
              <div className="modal-Artc">
              <h3>{selectedArticle.titre}</h3>
              <div dangerouslySetInnerHTML={{ __html: selectedArticle.texte }} />
                <div className="Artc-info">
               
                
              
                  <div className="Artc-author">
                <div  style={{display:'flex',alignItems:'center'}}>
                <MdPerson className="artic-author-icon"  />
                <h5 className="articl-auteur">{selectedArticle.auteur} </h5>
                </div>
                    <div className='partageArticle'>
              <button className="linkedin-buttonArt">
                <GrLinkedin /> Partage
              </button>
              <button className="facebook-buttonArt">
                <FaFacebook /> Partage
              </button>
            </div> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Newsletter />
      <Footer />
    </>
  );
};

export default Articles;
