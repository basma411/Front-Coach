import React, { useEffect, useState } from "react";
import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import image from "../../images/big_image_2.jpg";
import "./css/evenement.css";
import { useDispatch, useSelector } from "react-redux";
import { GetEvenement } from "../../Redux/Slice/EvenementSlice";
import Card from "react-bootstrap/Card";
import { getImageUrl } from "../../index.js";
import Newsletter from "../coach/Newsletter";
import Footer from "../coach/Footer";
import { Link } from "react-router-dom";
import { CiCalendarDate } from "react-icons/ci";
import { MdGpsFixed } from "react-icons/md";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import logo from "../../images/logo.jpg";


const Evenement = () => {
  const dispatch = useDispatch();
  const { Evenement, selectedEvenement } = useSelector((state) => state.evenement);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [metadata, setMetadata] = useState({});
  const [ShowModal, SetShowModal] = useState(false);
  const handleTitleClick = (event) => {
    setSelectedEvent(event);
console.log(event._id)
    SetShowModal(true);

  };
  const closeModal = () => {
    SetShowModal(false);
    setSelectedEvent(null);
  };
  useEffect(() => {
    dispatch(GetEvenement());
  }, [dispatch]);



  useEffect(() => {
    if (selectedEvenement) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(selectedEvenement, 'text/html');
      setMetadata({
        title: doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || 'Default Title',
        description: doc.querySelector('meta[name="description"]')?.textContent || 'Default Description',
        ogTitle: doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || 'Default OG Title',
        ogDescription: doc.querySelector('meta[property="og:description"]')?.textContent || 'Default OG Description',
        ogImage: doc.querySelector('meta[property="og:image"]')?.getAttribute('content')?.replace(/\\/g, '/') || 'default-image-url.jpg',
      });
    }
  }, [selectedEvenement]);

  const shareUrl = selectedEvent ? `https://ce28-197-15-129-6.ngrok-free.app/Evenement/${selectedEvent._id}` : '';
  const ogImage = selectedEvent ? getImageUrl(selectedEvent.photo) : 'default-image-url.jpg';
  const ogTitle = selectedEvent ? selectedEvent.titre : 'Titre de l\'événement';
  const ogDescription = selectedEvent ? selectedEvent.texte : 'Description de l\'événement';
  const [metaTags, setMetaTags] = useState({
    title: 'Default Title',

});
useEffect(() => {
  setTimeout(() => {
      setMetaTags({
          title: 'Updated Title',
    
      });
  }, 2000);
}, []);
  return (
    <>
 

<div className="ImagePlatformeEvn" style={{ backgroundImage: `url(${image})` }}>
        <h3 className="TitreEnvt">Évènements</h3>
      </div>
      <div className="Evnement">
        <div className="ContainerEvnement">
          <Link to="/Evenement/ajouter">
            <button className="partageEvnt">Partagez votre évènement</button>
          </Link>
          <div className="evnt-list">
            {Evenement && Evenement.length > 0 && Evenement.map((Evt) => (
              <div key={Evt._id} className="evnt-card">
                <Card>
                  <Card.Img variant="top" src={getImageUrl(Evt.photo)} className="Imageevnt" />
                  <Card.Body>
                    <Card.Title
                      className="evnt-card-title"
                      onClick={() => handleTitleClick(Evt)}
                    >
                      {Evt.titre}
                    </Card.Title>
                    <Card.Body>
                      <div className="evnt-card-author">
                        <div style={{ display: "flex", alignItems: "center" }} className="LieuEvnt">
                          <CiCalendarDate className="evnt-card-author-icon" />
                          <h5 className="Dateevnt">{Evt.dates}</h5>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }} className="LieuEvnt">
                          <MdGpsFixed className="evnt-card-author-icon" />
                          <h5 className="Dateevnt">{Evt.lieu}</h5>
                        </div>
                      </div>
                    </Card.Body>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Dialog open={ShowModal} onClose={closeModal} fullWidth maxWidth="md">
        <div style={{ padding: "40px" }}>
          <IconButton
            aria-label="close"
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              color: "#000",
              zIndex: "1000",
            }}
          >
            <CloseIcon />
          </IconButton>
          <img src={logo} alt="logo" width="220px" height="70" />
          <hr />
          <div>
            <img
              src={selectedEvent ? getImageUrl(selectedEvent.photo) : ''}
              alt="Event"
              className="Evnt-image"
            />
          </div>
          <div className="modal-Evnt">
            <h2 className="Evnt-titre">{selectedEvent?.titre}</h2>
            <div
              className="Evnt-descri"
              dangerouslySetInnerHTML={{ __html: selectedEvent?.texte }}
            />
            <div className="Evnt-info">
              <div className="info-item">
                <CiCalendarDate className="info-icon" />
                <h5 className="info-date">{selectedEvent?.dates}</h5>
              </div>
              <div className="info-item">
                <MdGpsFixed className="info-icon" />
                <h5 className="info-lieu">{selectedEvent?.lieu}</h5>
              </div>
            </div>
            <div className="partagerEVNT">
              <div>
                <FacebookShareButton
                  url={shareUrl}
                  quote={selectedEvent?.titre} 
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#0965FE",
                      paddingRight: "5px",
                    }}
                  >
                    <FacebookIcon size={20} />
                    <h3 className="info-item">Partage</h3>
                  </div>
                </FacebookShareButton>
              </div>
              <div>
                <LinkedinShareButton
                  url={shareUrl}
                 
                
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#0077B5",
                      paddingRight: "5px",
                    }}
                  >
                    <LinkedinIcon size={20} />
                    <h3 className="info-item">Partage</h3>
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
};

export default Evenement;