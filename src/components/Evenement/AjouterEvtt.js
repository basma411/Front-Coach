// AjouterEvtt.js
import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react'; 
import image1 from "../../images/big_image_2.jpg";
import { getImageUrl } from '../..';
import { AddEvenement, GetEvenement } from '../../Redux/Slice/EvenementSlice';
import { useDispatch, useSelector } from 'react-redux';
import "./css/ajouterEvnt.css";
import Model from './Model';

const AjouterEvtt = () => {
  const dispatch = useDispatch();
  const { Evenement } = useSelector((state) => state.evenement);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [Texte, settexte] = useState('');
  const [image, setimage] = useState('');

  const titreRef = useRef();
  const lieuRef = useRef();
  const dateRef = useRef();
  const lienRef = useRef();

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

  const handleFileChange = (e) => {
    setimage(e.target.files[0]);
  };

  const handleEditorChange = (content, editor) => {
    settexte(content);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Titre = titreRef.current.value;
    const Lien = lienRef.current.value;
    const Lieu = lieuRef.current.value;
    const Dates = dateRef.current.value;
    const Photo = image;

    console.log(Titre, Texte, Lien, Lieu, Dates, Photo);

    const formDataToSend = new FormData();
    formDataToSend.append('titre', Titre);
    formDataToSend.append('texte', Texte);
    formDataToSend.append('lien', Lien);
    formDataToSend.append('lieu', Lieu);
    formDataToSend.append('dates', Dates);
    formDataToSend.append('photo', Photo);

    dispatch(AddEvenement(formDataToSend));
  };

  return (
    <>
      <div
        className="ImagePlatformeEvn"
        style={{
          position: "relative",
          textAlign: "center",
          height: "300px",
          backgroundImage: `url(${image1})`,
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
              <img src={getImageUrl(article.photo)} alt="Article" />
              <h1 onClick={() => handleTitleClick(article)}>{article.titre}</h1>
              <h2>{article.dates}</h2>
              <hr />
            </div>
          ))}
        </div>
        <div className="right-Evnt">
          <h1 style={{ margin: '20px 0  100px 0' }}>Pour partager un article, une offre, cet espace est pour vous!</h1>
          <form onSubmit={handleSubmit}>
            <label>Titre:</label>
            <input type="text" name="titre" placeholder="" required ref={titreRef} />
            <label>Texte:</label>
            <Editor
  apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8"
  init={{
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
      { value: 'First.Name', title: 'First Name' },
      { value: 'Email', title: 'Email' },
    ],
    toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
  }}
  value={Texte}
  onEditorChange={handleEditorChange}
/>
            <label>Lien:</label>
            <input type="text" name="lien" placeholder="" required ref={lienRef} />
            <label>Lieu:</label>
            <input type="text" name="lieu" placeholder="" required ref={lieuRef} />
            <label>Date:</label>
            <input type="date" name="dates" placeholder="" required ref={dateRef} />
            <label>Photo:</label>
            <input type="file" name="photo" onChange={handleFileChange} />
            <button type="submit" className='AddEvnt'>Envoyer</button>
          </form>
        </div>
      </div>

      {showModal && (
        <Model selectedEvent={selectedEvent} closeModal={closeModal} />
      )}
    </>
  );
};

export default AjouterEvtt;
