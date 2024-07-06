import React, { useEffect, useState, useRef } from "react";
import image from "../../images/big_image_2.jpg";
import logo from "../../images/logo.jpg";
import { GrLinkedin } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";
import { MdPerson } from "react-icons/md";

import "./css/ajouterarticle.css";
import { useDispatch, useSelector } from "react-redux";
import { AddArticle, GetArticle } from "../../Redux/Slice/ArticleSlice";
import { Editor } from '@tinymce/tinymce-react';
import { getImageUrl } from "../..";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AjoutArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Articles } = useSelector((state) => state.article);
  const [imageArticle, setImageArticle] = useState(null);
  const editorRef = useRef(null);
  const authorRef = useRef(null);
  const titleRef = useRef(null);
  const linkRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);

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

  const handleClickOpen = (article) => {
    setCurrentArticle(article);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentArticle(null);
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
            <h3 className="left-ArticlePartager">Articles, offres déjà partagé(e)s</h3>
            {latestArticles.map((article, index) => (
              <div key={index}>
                <img src={getImageUrl(article.photo)} alt="Article" className="left-Article-img" />
                <h1 className="titreART" onClick={() => handleClickOpen(article)}>{article.titre}</h1>
                <div style={{display:'flex' , alignItems:"center"}}>
                <MdPerson className="artic-author-icon"  />
                <h2 className="auteurART">{article.auteur}</h2>

                </div>
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

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
  <DialogContent style={{ padding: '20px' }}>
    {currentArticle && (
      <div className="ArticleContai">
        <img src={logo} alt="Article" style={{ width: '180px'}} />
        <hr />
        <img src={getImageUrl(currentArticle.photo)} alt="Article" style={{ display: "block", margin: "0 auto", width: '200px' }} />
        <h3 className="titreARTDialo">{currentArticle.titre}</h3>
        <div  className="textARTDialo" dangerouslySetInnerHTML={{ __html: currentArticle.texte }} />
        <div className="Artc-inf">
               
                
              
               <div className="Artc-author">
             <div style={{paddingLeft:'30px'}} >
          <div  style={{display:'flex',alignItems:'center'}}>
          <MdPerson className="artic-author-icon"  />
          <h5 className="articl-auteur">{currentArticle.auteur} </h5>
          </div>
             <div className='partageArticle'>
           <button className="linkedin-buttonArt">
             <GrLinkedin /> Partage
           </button>
           <button className="facebook-buttonArt">
             <FaFacebook /> Partage
           </button>
         </div> 
             </div>
             
               </div>
             </div>
      </div>
    )}
  </DialogContent>
</Dialog>

    </>
  );
};

export default AjoutArticle;
