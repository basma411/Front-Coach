import React, { useEffect, useState, useRef } from "react";
import image from "../../images/big_image_2.jpg";
import "./css/ajouterAtelier.css";
import { useDispatch, useSelector } from "react-redux";
import { AddArticle, GetArticle } from "../../Redux/Slice/ArticleSlice";
import { useForm } from "react-hook-form";
import { BsTypeBold } from "react-icons/bs";
import { MdOutlineFormatItalic } from "react-icons/md";
import { BsListOl, BsListUl } from "react-icons/bs";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { getImageUrl } from "../..";
import { GetAtelier } from "../../Redux/Slice/AtelierSlice";
import { GetPublication } from "../../Redux/Slice/PubAtelierSlice";

const FormAtelier = () => {
  const dispatch = useDispatch();
  const { ateliers } = useSelector((state) => state.atelier);
    const { pubatelier } = useSelector((state) => state.pubatelier);

  
  useEffect(() => {
    dispatch(GetAtelier());
    dispatch(GetPublication)
  }, [dispatch]);
  const lastAtelier = ateliers.length > 0 ? ateliers[ateliers.length - 1] : null;




  

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
          {pubatelier && pubatelier.map((pub, index) => (
            <div key={index}>
              <img
           src={getImageUrl(pub.photo)}
           alt="atelier"
              />
              <h1>{pub.titre}</h1>

              <hr />
            </div>
          ))}
        </div>
        <div className="right-Article">
        {lastAtelier ? (
        <div>
        <img     style={{display:'block',margin:'0 auto',width:'300px'}}      src={getImageUrl(lastAtelier.photo)}
 alt="atelier" />

          <p>{`Théme ${lastAtelier.num}`}</p>
          <p> {lastAtelier.titre}</p>
          <p> {lastAtelier.date}</p>
          <p> {lastAtelier.heure}</p>


        </div>
      ) : (
        <p>No ateliers available.</p>
      )}  
          {/* <form onSubmit={handleFormSubmit}>
            <label className="LabelArticle">Auteur(e)/ Entreprise:</label>
            <input
              type="text"
              placeholder=""
              ref={authorRef}
              className="inputArticle"
            />
            <label className="LabelArticle">Titre:</label>
            <input
              type="text"
              placeholder=""
              ref={titleRef}
              className="inputArticle"
            />
            <label className="LabelArticle">Texte:</label>

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
                className="TextareaArticle"
                type="text"
                value={text}
                onChange={handleChange}
                placeholder=""
                ref={textRef}
                style={{
                  fontWeight: isBold ? "bold" : "normal",
                  fontStyle: isItalic ? "italic" : "normal",
                  height: "200px",
                }}
              />
            </div>

            <label className="LabelArticle">Photo ou illustration:</label>
            <input
              type="file"
              placeholder=""
              onChange={handleImageChange}
              name="imagee"
              className="FileArticle"
            />

            <label className="LabelArticle">
              Lien (si votre texte est publié sur un site):
            </label>
            <input
              type="text"
              placeholder=""
              ref={linkRef}
              className="inputArticle"
            />
            <input className="BoutonArticle" type="submit" />
          </form> */}
        </div>
      </div>
    </>
  );
};


export default FormAtelier