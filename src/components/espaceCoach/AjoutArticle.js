import React, { useEffect, useState, useRef } from "react";
import image from "../../images/big_image_2.jpg";
import "./css/ajouterarticle.css";
import { useDispatch, useSelector } from "react-redux";
import { AddArticle, GetArticle } from "../../Redux/Slice/ArticleSlice";
import { useForm } from "react-hook-form";
import { BsTypeBold } from "react-icons/bs";
import { MdOutlineFormatItalic } from "react-icons/md";
import { BsListOl, BsListUl } from "react-icons/bs";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const AjoutArticle = () => {
  const dispatch = useDispatch();
  const { Articles } = useSelector((state) => state.article);
  const [imageArticle, setImage] = useState(null);

  useEffect(() => {
    dispatch(GetArticle());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  // Getting the last four articles
  const latestArticles = Articles.slice(-4);

  const [text, setText] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const textRef = useRef(null);
  const authorRef = useRef(null);
  const titleRef = useRef(null);
  const photoRef = useRef(null);
  const linkRef = useRef(null);

  const handleBoldClick = () => {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      document.execCommand("bold");
    }
    setIsBold(!isBold); // Mettre à jour l'état de bold
  };

  const handleItalicClick = () => {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      document.execCommand("italic");
    }
    setIsItalic(!isItalic); // Mettre à jour l'état de l'italique
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };
console.log(imageArticle)
  const handleFormSubmit = () => {
    const formData = new FormData();
    formData.append("Auteur", authorRef.current.value);
    formData.append("Titre", titleRef.current.value);
    formData.append("Texte", textRef.current.value);
    formData.append("imagee", imageArticle); 
    formData.append("Lien", linkRef.current.value);

    dispatch(AddArticle(formData));
};

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <div
        className="ImagePlatforme"
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
          <h2>Partagez un article, une offre</h2>
        </div>
      </div>

      <div className="navigation-arrows">
        <div className="left-Article">
          <h3>Articles, offres déjà partagé(e)s</h3>
          {latestArticles.map((article, index) => (
            <div key={index}>
              <img
                src={`http://localhost:8000/${article.Photo}`}
                alt="Article"
              />
              <h1>{article.Titre}</h1>
              <h2>{article.Auteur}</h2>
              <hr />
            </div>
          ))}
        </div>
        <div className="right-Article">
          <h1>
            Pour partager un article, une offre, cet espace est pour vous!
          </h1>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <label>Auteur(e)/ Entreprise:</label>
            <input type="text" placeholder="" ref={authorRef} />
            <label>Titre:</label>
            <input type="text" placeholder="" ref={titleRef} />
            <label>Texte:</label>

            <div className="editor">
              <div className="POLICE">
                <BsTypeBold
                  onClick={handleBoldClick}
                  className="bold-icon"
                  style={{ padding: "1px" }}
                />
                <MdOutlineFormatItalic
                  onClick={handleItalicClick}
                  className="italic-icon"
                  style={{ padding: "1px" }}
                />
                <BsListOl
                  className="list-icon"
                  style={{ borderLeft: "solid 1px  gray" }}
                />
                <BsListUl className="list-icon" />
                <BsArrowLeft
                  className="arrow-icon"
                  style={{ borderLeft: "solid 1px  gray" }}
                />
                <BsArrowRight className="arrow-icon" />
              </div>

              <textarea
                type="text"
                value={text}
                onChange={handleChange}
                placeholder=""
                className="input-text"
                ref={textRef}
                style={{
                  fontWeight: isBold ? "bold" : "normal",
                  fontStyle: isItalic ? "italic" : "normal",
                  height: "200px",
                }}
              />
            </div>

            <label>Photo ou illustration:</label>
            <input
              type="file"
              placeholder=""
              ref={photoRef}
              onClick={handleFileChange}
              name="imagee"
            />
            <label>Lien (si votre texte est publié sur un site):</label>
            <input type="text" placeholder="" ref={linkRef} />
            <input type="submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default AjoutArticle;