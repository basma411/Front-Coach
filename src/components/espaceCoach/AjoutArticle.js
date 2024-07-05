import React, { useEffect, useState, useRef } from "react";
import image from "../../images/big_image_2.jpg";
import "./css/ajouterarticle.css";
import { useDispatch, useSelector } from "react-redux";
import { AddArticle, GetArticle } from "../../Redux/Slice/ArticleSlice";
import { Editor } from '@tinymce/tinymce-react';
import { getImageUrl } from "../..";
import { useNavigate } from "react-router-dom";

const AjoutArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Articles } = useSelector((state) => state.article);
  const [imageArticle, setImageArticle] = useState(null);
  const editorRef = useRef(null);
  const authorRef = useRef(null);
  const titleRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    dispatch(GetArticle());
  }, [dispatch]);

  const latestArticles = Articles.slice(-4);

  const handleImageChange = (e) => {
    setImageArticle(e.target.files[0]);
  };

  const handleEditorChange = (content) => {
    // Gérer le contenu de l'éditeur ici si nécessaire
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("auteur", authorRef.current.value);
    formData.append("titre", titleRef.current.value);
    formData.append("texte", editorRef.current.getContent());
    formData.append("imagee", imageArticle);
    formData.append("lien", linkRef.current.value);

    dispatch(AddArticle(formData));
    navigate('/EspaceCoach');
  };

  return (
    <>
      <div className="PlatformeArticle" style={{
        position: "relative",
        textAlign: "center",
        height: "300px",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <div>
          <h3 className="ArtcTitre">Partagez un article, une offre</h3>
        </div>
      </div>

      <div className="ajouterArtc">
        <div className="ajouterArtcContainer">
          <div className="left-Article">
            <h3>Articles, offres déjà partagé(e)s</h3>
            {latestArticles.map((article, index) => (
              <div key={index}>
                <img src={getImageUrl(article.photo)} alt="Article" />
                <h1>{article.titre}</h1>
                <h2>{article.auteur}</h2>
                <hr />
              </div>
            ))}
          </div>
          <div className="right-Article">
            <h3 className="FormulaireCoach">Pour partager un article, une offre, cet espace est pour vous!</h3>
            <form onSubmit={handleFormSubmit}>
              <label className="LabelArticle">Auteur(e)/ Entreprise:</label>
              <input type="text" placeholder="" ref={authorRef} className="inputArticle" />
              <label className="LabelArticle">Titre:</label>
              <input type="text" placeholder="" ref={titleRef} className="inputArticle" />
              <label className="LabelArticle">Texte:</label>

              <Editor
  apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8"
  onInit={(evt, editor) => {
    editorRef.current = editor;
  }}
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
    setup: (editor) => {
      editor.on('change', () => handleEditorChange(editor.getContent()));
    },
  }}
/>


              <label className="LabelArticle">Photo ou illustration:</label>
              <input type="file" placeholder="" onChange={handleImageChange} name="imagee" className="FileArticle" />

              <label className="LabelArticle">Lien (si votre texte est publié sur un site):</label>
              <input type="text" placeholder="" ref={linkRef} className="inputArticle" />

              <input className="BoutonArticle" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AjoutArticle;
