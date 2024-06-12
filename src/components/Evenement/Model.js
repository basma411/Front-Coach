import React from 'react';
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton } from 'react-share';
import logo from "../../images/logo.jpg";
import { CiCalendarDate } from "react-icons/ci";
import { GiPositionMarker } from "react-icons/gi";
import { getImageUrl } from '../..';
import "./css/model.css"
const Model = ({ selectedEvent, closeModal }) => {
    const shareURL =`https://moncoach.tn/even/${selectedEvent._id}`
    const shareTitle = `Découvrez cet événement: ${selectedEvent.titre} - ${selectedEvent.lieu} - ${selectedEvent.dates}`;
  return (
    <div className="modalBaghround">
      <span className="close" onClick={closeModal}>&times;</span>
      <div className="modalcontainer">
        <img src={logo} alt="logo" width="220px" height="70" />
        <hr />
        <div className="modal-content">
          <img src={getImageUrl(selectedEvent.photo)} alt="Event" className="modal-image" />
          <div className="modal-text-content">
            <h2 className="modal-title">{selectedEvent.titre}</h2>
            <div dangerouslySetInnerHTML={{ __html: selectedEvent.texte }} />
            <hr />
            <div className="modal-info">
              <CiCalendarDate />
              <h5>{selectedEvent.dates}</h5>
              <GiPositionMarker />
              <h5>{selectedEvent.lieu}</h5>
            </div>
          </div>
        </div>
        <div className='partage' >
      <div>    <FacebookShareButton
            url={shareURL}
            quote={shareTitle}
            hashtag='#evenement'
          >
         <div style={{display:'flex',alignItems:'centre',justifyContent:'center',backgroundColor:'#0965FE' ,paddingRight:'5px'}}>
         <FacebookIcon size={20}  />
         <h3 style={{fontSize:'15px'}}>Partage</h3>
              
             </div>

          </FacebookShareButton></div>
<div>
          < LinkedinShareButton  url={shareURL}>
        <div  style={{display:'flex',alignItems:'centre',justifyContent:'center',backgroundColor:'#0077B5' ,paddingRight:'5px'}}>


        <LinkedinIcon  size={20} />
         <h3 style={{fontSize:'15px'}}>Partage</h3>

        </div>
 

          </LinkedinShareButton></div>
        </div>
      </div>
    </div>
  );
}

export default Model;
