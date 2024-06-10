import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import image from "../../images/big_image_2.jpg";
import logo from "../../images/logo.jpg";
import { CiCalendarDate } from "react-icons/ci";
import { GiPositionMarker } from "react-icons/gi";
import { getImageUrl } from '../..';
import { GetEvenement } from '../../Redux/Slice/EvenementSlice';
import { useDispatch, useSelector } from 'react-redux';
import "./css/ajouterEvnt.css";
import { GrLinkedin } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";

const AjouterEvtt = () => {
  const dispatch = useDispatch();
  const { Evenement } = useSelector((state) => state.evenement);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    titre: '',
    texte: '',
    lien: '',
    lieu: '',
    dates: '',
    photo: null,
  });

  useEffect(() => {
    dispatch(GetEvenement());
  }, [dispatch]);

  const latestArticles = Evenement.slice(-4);

  const handleTitleClick = (article) => {
    setSelectedEvent(article);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData({ ...formData, texte: data });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch an action or perform an API call to submit the form data
  };

  const handleFacebookShare = () => {
    if (selectedEvent) {
      const shareUrl = `https://www.facebook.com/dialog/feed?app_id=332085763115778&display=popup&caption=Voici un événement intéressant : ${selectedEvent.titre}&link=${encodeURIComponent(window.location.href)}&redirect_uri=${encodeURIComponent(window.location.href)}`;
      window.open(shareUrl, "_blank");
    } else {
      // Gérer le cas où aucun événement n'est sélectionné
      console.error("Aucun événement sélectionné pour le partage sur Facebook.");
    }
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
          <h2>Partagez votre <br /> évènement</h2>
        </div>
      </div>

      <div className="ContainerEvnt">
        <div className="left-Evnt">
          <h3>Évènements déjà partagés</h3>
          {latestArticles.map((article, index) => (
            <div key={index}>
              <img
                src={getImageUrl(article.photo)}
                alt="Article"
              />
              <h1 onClick={() => handleTitleClick(article)}>{article.titre}</h1>
              <h2>{article.dates}</h2>
              <hr />
            </div>
          ))}
        </div>
        <div className="right-Evnt">
          <h1>Pour partager un article, une offre, cet espace est pour vous!</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="titre"
              placeholder="Titre"
              value={formData.titre}
              onChange={handleInputChange}
              required
            />
            <CKEditor
              editor={ClassicEditor}
              data={formData.texte}
              onChange={handleEditorChange}
            />
            <input
              type="text"
              name="lien"
              placeholder="Lien"
              value={formData.lien}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="lieu"
              placeholder="Lieu"
              value={formData.lieu}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="dates"
              placeholder="Dates"
              value={formData.dates}
              onChange={handleInputChange}
              required
            />
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              required
            />
            <button type="submit">Envoyer</button>
          </form>
        </div>
      </div>

      {showModal && (
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
                <div className="modal-info">
                  <CiCalendarDate />
                  <h5>{selectedEvent.dates}</h5>
                  <GiPositionMarker />
                  <h5>{selectedEvent.lieu}</h5>
                </div>
              </div>
            </div>
            <div className='partage'>
              <button className="linkedin-button" >
                <GrLinkedin /> Partage
              </button>
              <button className="facebook-button" onClick={handleFacebookShare}>
                <FaFacebook /> Partage
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AjouterEvtt;
