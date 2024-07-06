import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import image from "../../images/big_image_2.jpg";
import './css/evenement.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetEvenement } from '../../Redux/Slice/EvenementSlice';
import Card from "react-bootstrap/Card";
import { MdPerson } from "react-icons/md";
import { getImageUrl } from '../../index.js';
import Newsletter from '../coach/Newsletter';
import Footer from '../coach/Footer';
import { Link } from 'react-router-dom';
import { GrLinkedin } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";
import logo from "../../images/logo.jpg";
import { CiCalendarDate } from "react-icons/ci";
import { GiPositionMarker } from "react-icons/gi";
import { MdGpsFixed } from "react-icons/md";
import { FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';

const Evenement = () => {
  const dispatch = useDispatch();
  const { Evenement } = useSelector((state) => state.evenement); 
  const shareURL = 'http://facebook.com'; 

  useEffect(() => {
    dispatch(GetEvenement());
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleTitleClick = (article) => {
    setSelectedEvent(article);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <div
        className="ImagePlatformeEvn"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <h3 className="TitreEnvt">Évènements</h3>
      </div>
      <div className="Evnement">
        <div className="ContainerEvnement">
          <Link to="/Evenement/ajouter">
            <button className='partageEvnt'>Partagez votre évènement</button>
          </Link>
          <div className="evnt-list">
            {Evenement && Evenement.map((Evt, index) => (
              <div key={index} className="evnt-card"> 
                <Card>
                  <Card.Img
                    variant="top"
                    src={getImageUrl(Evt.photo)}
                    className='Imageevnt'
                  />
                  <Card.Body>
                    <Card.Title className="evnt-card-title" onClick={() => handleTitleClick(Evt)}>{Evt.titre}</Card.Title>
                    <Card.Text>
                      <div className="evnt-card-author"> 
                        <div style={{display:'flex',alignItems:"center"}} className='LieuEvnt'>
                          <CiCalendarDate className="evnt-card-author-icon" /> 
                          <h5 className='Dateevnt'>{Evt.dates}</h5>
                        </div>
                        <div style={{display:'flex',alignItems:"center"}} className='LieuEvnt'>
                          <MdGpsFixed className="evnt-card-author-icon" /> 
                          <h5 className='Dateevnt'>{Evt.lieu}</h5>
                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Dialog open={showModal} onClose={closeModal} fullWidth maxWidth="md">
      <div style={{ padding: '40px' }}>
      <IconButton 
            aria-label="close" 
            onClick={closeModal} 
            style={{ position: 'absolute', top: "0", right: "0",  color:"#000",zIndex:'1000'}}
          >
            <CloseIcon />
          </IconButton>
          <img src={logo} alt="logo" width="220px" height="70" />
          <hr />
          <div>
            <img src={getImageUrl(selectedEvent?.photo)} alt="Event" className="Evnt-image" />
          </div>
          <div className="modal-Evnt">
            <h2 className="Evnt-titre">{selectedEvent?.titre}</h2>
            <div className="Evnt-descri" dangerouslySetInnerHTML={{ __html: selectedEvent?.texte }} />
            <div className="Evnt-info">
              <div  className="info-item">
                <CiCalendarDate className='info-icon' />
                <h5 className="info-date">{selectedEvent?.dates}</h5>
              </div>
              <div className="info-item">
                <MdGpsFixed className='info-icon' />
                <h5 className="info-lieu">{selectedEvent?.lieu}</h5>
              </div>
            </div>
            <div className='partagerEVNT' >
            <div>
              <FacebookShareButton url={shareURL} quote={selectedEvent?.titre} hashtag='#evenement'>
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
        </div>
      </Dialog>
      <Newsletter />
      <Footer />
    </>
  );
}

export default Evenement;
