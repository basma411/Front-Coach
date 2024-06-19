import React, { useState } from 'react';
import { FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';
import { getImageUrl } from '../..';
import { FaPlayCircle } from 'react-icons/fa';

const VideoCard = ({ video }) => {
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

  const handlePlayClick = () => {
    window.open(video.lien, '_blank'); // Replace video.link with the actual video URL
  };

  const shareURL = 'http://example.com'; // Update with actual URL to be shared
  const shareTitle = video.titre;
  const truncateText = (htmlText, maxLength) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    const textContent = doc.body.textContent || "";
    return textContent.length > maxLength ? textContent.substring(0, maxLength) + '...' : textContent;
  };

  return (
    <>
      <div className="video-card">                   
        <h3 style={{ color: 'rgb(39, 84, 145)', fontSize: "16px", fontWeight: "300", lineHeight: '32px' }}>{truncateText(video.titre)}</h3>
        <div style={{ position: 'relative', width: '500px', height: '300px' }}>
          <img src={getImageUrl(video.images)} alt={video.titre} width="500px" height="300px" />
          <FaPlayCircle 
            onClick={handlePlayClick}
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '80px', color: 'white', cursor: 'pointer', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '50%' }} 
          />
        </div>
        <h3 
          style={{ color: "rgb(227, 216, 10)", cursor: "pointer", fontSize: "16px", fontWeight: "300", margin: '20px' }} 
          onClick={() => handleTitleClick(video)}
        >
          Partage...
        </h3>
      </div>

      {showModal && (
       <div className='modalBagh'>
        <div className='modalcontai'>
          <span className="closePartage" onClick={closeModal}>&times;</span>
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
      )}
    </>
  );
};

export default VideoCard;
