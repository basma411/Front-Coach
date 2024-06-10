import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import image from "../../images/big_image_2.jpg";
import logo from "../../images/logo.jpg";
import { getImageUrl } from '../..';
import { GetEvenement } from '../../Redux/Slice/EvenementSlice';
import { useDispatch, useSelector } from 'react-redux';
import "./css/ajouterEvnt.css";

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

  return (
    <div className='EvntConta'>
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
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={logo} alt="logo" width="220px" height="70" />
            <hr />
            <img src={getImageUrl(selectedEvent.photo)} alt="Event" width="200px" />
            <h2>{selectedEvent.titre}</h2>
<div dangerouslySetInnerHTML={{ __html: selectedEvent.texte }} />
            <h2>{selectedEvent.dates}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

// export default AjouterEvtt;
