import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CiCalendarDate } from "react-icons/ci";
import { MdGpsFixed } from "react-icons/md";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { getImageUrl } from "../../index.js";
import { Evnt_OG, GetEvenement } from "../../Redux/Slice/EvenementSlice";
import logo from "../../images/logo.jpg";
import "./css/evenement.css";
import { Helmet } from "react-helmet-async";

const EvenementPartage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loadedEvent, setLoadedEvent] = useState(null);

  useEffect(() => {
 
    dispatch(GetEvenement(id));
    console.log(id)

  
}, [dispatch]);
const { Evenement, selectedEvenement } = useSelector((state) => state.evenement);

  const event =Evenement.find((evt) => evt._id === id)


  useEffect(() => {
 
   

    
      setLoadedEvent(event);
    console.log(loadedEvent)
    if(loadedEvent){
    dispatch(Evnt_OG(loadedEvent._id))
    console.log(loadedEvent._id)
  console.log(selectedEvenement)}
  }, [event]);

  const ogTitle = loadedEvent ? loadedEvent.titre : "événement";

  const share_Url = `https://ce28-197-15-129-6.ngrok-free.app/Evenement/${id}`;

  return (
    <>
      <Helmet>
        <title>{ogTitle}</title>

      </Helmet>
      <div style={{ padding: "40px" }}>
        <img src={logo} alt="logo" width="220px" height="70" />
        <hr />
        {loadedEvent && (
          <>
            <div>
              <img
                src={getImageUrl(loadedEvent.photo)}
                alt="Event"
                className="Evnt-image"
              />
            </div>
            <div className="modal-Evnt">
              <h2 className="Evnt-titre">{loadedEvent.titre}</h2>
              <div
                className="Evnt-descri"
                dangerouslySetInnerHTML={{ __html: loadedEvent.texte }}
              />
              <div className="Evnt-info">
                <div className="info-item">
                  <CiCalendarDate className="info-icon" />
                  <h5 className="info-date">{loadedEvent.dates}</h5>
                </div>
                <div className="info-item">
                  <MdGpsFixed className="info-icon" />
                  <h5 className="info-lieu">{loadedEvent.lieu}</h5>
                </div>
              </div>
              <div className="partagerEVNT">
                <div>
                  <FacebookShareButton url={share_Url} quote={ogTitle}>
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
                  <LinkedinShareButton url={share_Url}>
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
    </>
  );
};

export default EvenementPartage;
