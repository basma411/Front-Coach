import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Helmet } from 'react-helmet';
import { CiCalendarDate } from "react-icons/ci";
import { MdGpsFixed } from "react-icons/md";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { getImageUrl } from "../../index.js";
import { GetEvenement } from "../../Redux/Slice/EvenementSlice"; // Assume you have an action to fetch event by ID
import logo from "../../images/logo.jpg";
import "./css/evenement.css";

const EvenementPartage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const event = useSelector((state) =>
    state.evenement.Evenement.find((evt) => evt._id === id)
  );

  useEffect(() => {
    if (!event) {
      dispatch(GetEvenement(id)); // Fetch event by ID if not already available in state
    }
  }, [dispatch, id, event]);

  const ogTitle = event ? event.titre : "Titre de l'événement";
  const ogDescription = event ? event.texte : "Description fixe";
  const ogImage = event ? getImageUrl(event.photo) : "http://localhost:8000/upload/images/1719330847015.png";
  const shareUrl = `https://8ade-41-225-78-122.ngrok-free.app/Evenement/${id}`;

  return (
    <div style={{ padding: "40px" }}>
      <Helmet>
        <meta property="og:url" content={shareUrl} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MonCoach" />
        <title>{ogTitle}</title>
      </Helmet>
  
      <img src={logo} alt="logo" width="220px" height="70" />
      <hr />
      {event && (
        <>
          <div>
            <img
              src={getImageUrl(event.photo)}
              alt="Event"
              className="Evnt-image"
            />
          </div>
          <div className="modal-Evnt">
            <h2 className="Evnt-titre">{event.titre}</h2>
            <div
              className="Evnt-descri"
              dangerouslySetInnerHTML={{ __html: event.texte }}
            />
            <div className="Evnt-info">
              <div className="info-item">
                <CiCalendarDate className="info-icon" />
                <h5 className="info-date">{event.dates}</h5>
              </div>
              <div className="info-item">
                <MdGpsFixed className="info-icon" />
                <h5 className="info-lieu">{event.lieu}</h5>
              </div>
            </div>
            <div className="partagerEVNT">
              <div>
                <FacebookShareButton
                  url={shareUrl}
                  quote={ogTitle}
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
        </>
      )}
    </div>
  );
};

export default EvenementPartage;
