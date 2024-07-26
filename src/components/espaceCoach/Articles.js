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
import { Helmet, HelmetProvider } from 'react-helmet-async'; 

import { MdPerson } from "react-icons/md";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';

const Articles = () => {
  const dispatch = useDispatch();
  const { Articles } = useSelector((state) => state.article);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(GetArticle());
  }, [dispatch]);

  const pageSize = 6;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, Articles.length);

  const openModal = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedArticle(null);
  };

  return (
    <>
    <HelmetProvider>
     <Helmet>
        <meta property="og:url" content={selectedArticle ? `https://8ade-41-225-78-122.ngrok-free.app/articles/${selectedArticle._id}` : ''} />
        <meta property="og:title" content={selectedArticle ? selectedArticle.titre : ''} />
        <meta property="og:description" content={selectedArticle ? selectedArticle.texte : ''} />
        <meta property="og:image" content={selectedArticle ? getImageUrl(selectedArticle.photo) : ''} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MonCoach" />
        <title>{selectedArticle ? selectedArticle.titre : 'Articles'}</title>
      </Helmet>
      <div
        className="PlatformeArticle"
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
          <h3 className="ArtcTitre">Articles</h3>
        </div>
      </div>
      <div className="Article-Containe">
        <div className="article-list">
          {Articles.slice(startIndex, endIndex).map((article, index) => (
            <div key={index} className="article-card" onClick={() => openModal(article)}>
              <Card>
                <Card.Img variant="top" src={getImageUrl(article.photo)} width="100%" height="300px" />
                <Card.Body>
                  <Card.Title className="article-card-title">{article.titre}</Card.Title>
                  <Card.Body>
                    <div style={{ display: "flex" }}>
                      <MdPerson className="article-card-author-icon" />
                      <h3 className="article-card-author">{article.auteur}</h3>
                    </div>
                  </Card.Body>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
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
      <Dialog open={showModal} onClose={closeModal} fullWidth maxWidth="md">
        <DialogContent style={{ padding: '20px', position: 'relative' }}>
          <IconButton
            style={{ position: 'absolute', top: '10px', right: '10px' }}
            onClick={closeModal}
          >
            <CloseIcon />
          </IconButton>
          {selectedArticle && (
            <div className="ArticleContai">
              <img src={logo} alt="Article" style={{ width: '180px' }} />
              <hr />
              <img src={getImageUrl(selectedArticle.photo)} alt="Article" style={{ display: "block", margin: "0 auto", width: '200px' }} />
              <h3 className="ART-titre">{selectedArticle.titre}</h3>
              <div className="Art-Descrip" dangerouslySetInnerHTML={{ __html: selectedArticle.texte }} />
              <div className="Artc-inf">
                <div className="Artc-author">
                  <div style={{ paddingLeft: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <MdPerson className="artic-author-icon" />
                      <h5 className="articl-auteur">{selectedArticle.auteur}</h5>
                    </div>
                    <div className='partageArticle' style={{ display: "flex", justifyContent: 'center', padding: "20px" }}>
                      <div>
                        <FacebookShareButton url={`https://8ade-41-225-78-122.ngrok-free.app/articles/${selectedArticle._id}`} quote={selectedArticle.titre} hashtag='#evenement'>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#0965FE',
                            paddingRight: '5px'
                          }}>
                            <FacebookIcon size={20} />
                            <h3 className="info-item">Partage</h3>
                          </div>
                        </FacebookShareButton>
                      </div>
                      <div>
                        <LinkedinShareButton url={`https://8ade-41-225-78-122.ngrok-free.app/articles/${selectedArticle._id}`}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#0077B5',
                            paddingRight: '5px'
                          }}>
                            <LinkedinIcon size={20} />
                            <h3 className="info-item">Partage</h3>
                          </div>
                        </LinkedinShareButton>
                      </div>
                    </div> 
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Newsletter />
      <Footer />
      </HelmetProvider>
    </>
  );
};

export default Articles;
