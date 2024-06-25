import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react'; 
import image1 from "../../images/big_image_2.jpg";
import { getImageUrl } from '../..';
import { AddEvenement, GetEvenement } from '../../Redux/Slice/EvenementSlice';
import { useDispatch, useSelector } from 'react-redux';
import "./css/ajouterEvnt.css";
import Model from './Model';
import { useNavigate } from 'react-router-dom';

const AjouterEvtt = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Evenement } = useSelector((state) => state.evenement);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [Texte, setTexte] = useState('');
  const [image, setimage] = useState('');
  const editorRef = useRef(null);
  const photoRef = useRef(null);

  const [formData, setFormData] = useState({
    titre: '',
    texte: '',
    lien: '',
    lieu: '',
    dates: '', 
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

  const handleFileChange = (e) => {
    setimage(e.target.files[0]);
  };

  const handleEditorChange = (content, editor) => {
    setTexte(content);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Titre = formData.titre;
    const Lien = formData.lien;
    const Lieu = formData.lieu;
    const Dates = formData.dates;
    const Photo = photoRef.current.files[0];

    const formDataToSend = new FormData();
    formDataToSend.append('titre', Titre);
    formDataToSend.append('texte', Texte);
    formDataToSend.append('lien', Lien);
    formDataToSend.append('lieu', Lieu);
    formDataToSend.append('dates', Dates);
    formDataToSend.append('photo', Photo);

    dispatch(AddEvenement(formDataToSend));
    navigate('/Evenement');
  };

  return (
    <>
      <div className="ImagePlatformeEvn" style={{
        position: "relative",
        textAlign: "center",
        height: "300px",
        backgroundImage: `url(${image1})`,
        backgroundSize: "cover",
        overflow: "hidden",
      }}>
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
            <input type="text" name="titre" placeholder="" required value={formData.titre} onChange={(e) => setFormData({ ...formData, titre: e.target.value })} />
            <label>Texte:</label>
            <Editor
              apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8"
              onInit={(evt, editor) => {
                editorRef.current = editor;
                editor.setContent(formData.texte);
              }}
              initialValue={formData.texte}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                setup: (editor) => {
                  editor.on('change', () => handleEditorChange(editor.getContent()));
                }
              }}
            />
            <label>Lien:</label>
            <input type="text" name="lien" placeholder="" required value={formData.lien} onChange={(e) => setFormData({ ...formData, lien: e.target.value })} />
            <label>Lieu:</label>
            <input type="text" name="lieu" placeholder="" required value={formData.lieu} onChange={(e) => setFormData({ ...formData, lieu: e.target.value })} />
            <label>Date:</label>
            <input type="text" name="dates" placeholder="" required value={formData.dates} onChange={(e) => setFormData({ ...formData, dates: e.target.value })} />
            <label>Photo:</label>
            <input type="file" name="photo" onChange={handleFileChange} ref={photoRef} />
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
