import React, { useState } from 'react';
import { FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';
import { getImageUrl } from '../..';
import { FaRegCirclePlay } from "react-icons/fa6";
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './css/videocoach.css'; // Ensure you have this CSS file or include styles in your existing CSS file

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
    window.open(video.lien, '_blank'); 
  };

  const shareURL = 'http://facebook.com'; 
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
        <h3 className='TitreVideo'>
          {truncateText(video.titre)}
        </h3>
        <div className='ImageVideo'>
          <img src={getImageUrl(video.images)} alt={video.titre} width="549px" height="298px" />
          <FaRegCirclePlay
            onClick={handlePlayClick}
            className='iconVideo'
          />
        </div>
        <h3
          className='Partage'
          onClick={() => handleTitleClick(video)}
        >
          Partager...
        </h3>
      </div>

      <Dialog open={showModal} onClose={closeModal} fullWidth maxWidth="md">
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={closeModal}
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className='partage' style={{ display: "flex", justifyContent: 'center', padding: "20px" }}>
            <div>
              <FacebookShareButton url={shareURL} quote={shareTitle} hashtag='#evenement'>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#0965FE',
                  paddingRight: '5px'
                }}>
                  <FacebookIcon size={20} />
                  <h3 style={{ fontSize: '15px' }}>Partage</h3>
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
                  <h3 style={{ fontSize: '15px' }}>Partage</h3>
                </div>
              </LinkedinShareButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoCard;
