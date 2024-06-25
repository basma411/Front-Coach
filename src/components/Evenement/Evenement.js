import React, { useEffect, useState } from 'react'
import image from "../../images/big_image_2.jpg";
import './css/evenement.css'
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

const Evenement = () => {
  const dispatch = useDispatch();
  const { Evenement } = useSelector((state) => state.evenement); 

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
          position: "relative",
          textAlign: "center",
          height: "300px",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <div style={{ paddingTop: "100px" }}>
          <h2>Évènements</h2>
        </div>
      </div>
      <div className="Evnement">
        <div className="ContainerEvnement">
          <Link to="/Evenement/ajouter">
            <button className='partageEvnt'>Partagez votre évènement</button>
          </Link>
        </div>
        <div className="article-list">
          {Evenement && Evenement.map((Evt, index) => (
            <div key={index} className="article-card"> 
              <Card>
                <Card.Img
                  variant="top"
                  src={getImageUrl(Evt.photo)}
                  width='100px'
                  height="250px"
                />
                <Card.Body>
                  <Card.Title className="article-card-title" onClick={() => handleTitleClick(Evt)}>{Evt.titre}</Card.Title>
                  <Card.Text>
                    <div className="article-card-author"> 
                      <MdPerson className="article-card-author-icon" /> 
                      <h5>{Evt.dates}</h5>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <div className="modalBaghroundEvnt">
          <span className="close" onClick={closeModal}>&times;</span>
          <div className="modalcontainerEvnt">
            <img src={logo} alt="logo" width="220px" height="70" />
            <hr />
            <div >
              <img src={getImageUrl(selectedEvent.photo)} alt="Event" className="Evnt-image" />
              
            </div>
             <div className="modal-Evnt">
                <h2 className="Evnt-titre">{selectedEvent.titre}</h2>
                
                <div dangerouslySetInnerHTML={{ __html: selectedEvent.texte }} />
                <hr />
                <div className="Evnt-info">
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <CiCalendarDate style={{ color: 'gray' }} />
    <h5 className="info">{selectedEvent.dates}</h5>
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <GiPositionMarker style={{ color: 'gray' }} />
    <h5 className="info">{selectedEvent.lieu}</h5>
  </div>
</div>

              </div>
             <div className='partage'>
              <button className="linkedin-button">
                <GrLinkedin /> Partage
              </button>
              <button className="facebook-button">
                <FaFacebook /> Partage
              </button>
            </div> 
          </div>
        </div>
      )}
      <Newsletter />
      <Footer />
    </>
  )
}

export default Evenement;
