import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import image from '../../images/big_image_atelier.jpg';
import { getImageUrl } from '../../index.js';
import { GetPublication } from '../../Redux/Slice/PubAtelierSlice.js';
import './css/ListPub.css';
import Newsletter from '../coach/Newsletter.js';
import Footer from '../coach/Footer.js';
import {
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';

import logo from '../../images/logo.jpg'
const ListePub = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pubatelier } = useSelector((state) => state.pubatelier);

  const [showModal, setShowModal] = useState(false);
  const [selectedBub, setselectedBub] = useState(null);
const shareURL="www.facebook.com"
  useEffect(() => {
    dispatch(GetPublication());
  }, [dispatch]);

  useEffect(() => {
    console.log('ID from useParams:', id);
    console.log('Pubatelier:', pubatelier);
  }, [id, pubatelier]);

  const filteredPublications = pubatelier && Array.isArray(pubatelier) ? pubatelier.filter(pub => pub.ouner === id) : [];

  useEffect(() => {
    console.log('Filtered Publications:', filteredPublications);
  }, [filteredPublications]);

  const openModal = (article) => {
    setselectedBub(article);
    setShowModal(true);
  };

  const closeModal = () => {
    setselectedBub(null);
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
        <div style={{ paddingTop: "30px", fontSize: '40px' }}>
          <h3 className='TitrePub'>Les Ateliers Dégustation Coaching</h3>
        </div>
      </div>
      <div className="atelier-Pub">
        <div className="atelierPub-container">
          {filteredPublications.map((pub) => {
            const imageUrl = getImageUrl(pub.img);
            return (
              <div className="cardPub" key={pub._id} onClick={() => openModal(pub)}>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={`Publication de ${pub.ouner}`}
                    className="cardPub-image"
                  />
                )}
                <div className="cardPub-content">
                  <h3 className="cardPub-title">{pub.titre}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Dialog open={showModal} onClose={closeModal} fullWidth maxWidth="md">
        <DialogContent style={{ padding: '20px', position: 'relative' }}>
          <IconButton
            style={{ position: 'absolute', top: '10px', right: '10px' }}
            onClick={closeModal}
          >
            <CloseIcon />
          </IconButton>
          {selectedBub && (
            <div className="BubContai">
              <img src={logo} alt="LOGO" style={{ width: '180px' }} />
              <hr />
              <img src={getImageUrl(selectedBub.img)} alt="atelier_degustation" style={{ display: "block", margin: "0 auto", width: '300px' }} />
              <h3 className="Bub-titre">{selectedBub.titre}</h3>
              <div className="Bub-inf">
              <div className='partageBub' style={{ display: "flex", justifyContent: 'center', padding: "20px" }}>
            <div>
              <FacebookShareButton url={shareURL} quote={selectedBub.titre} hashtag='#evenement'>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#0965FE',
                  paddingRight: '5px'
                }}>
                  <FacebookIcon size={20} />
                  <h3 className='info-item'>Partage</h3>
                </div>
              </FacebookShareButton>
            </div>
            <div>
              <LinkedinShareButton url={shareURL}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#0077B5',
                  paddingRight: '5px'
                }}>
                  <LinkedinIcon size={20} />
                  <h3 className='info-item'>Partage</h3>
                </div>
              </LinkedinShareButton>
            </div>
          </div>

              </div>
              <hr />
              <div  className="Bub-Descrip" dangerouslySetInnerHTML={{ __html: selectedBub.texte }} />

            </div>
          )}
        </DialogContent>
      </Dialog>
      <Newsletter />
      <Footer />
    </>
  );
};

export default ListePub;
