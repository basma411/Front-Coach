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

  const handleFormSubmit = () => {
    const formData = new FormData();
    formData.append("Auteur", authorRef.current.value);
    formData.append("Titre", titleRef.current.value);
    formData.append("Texte", textRef.current.value);
    formData.append("imagee", imageArticle); // Assurez-vous que imageArticle est correctement défini
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
          <h2>Partagez un article, une <br/>offre</h2>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="nomPrenom">Nom et prénom:</label>
              <input type="text" id="nomPrenom" {...register("nomPrenom", { required: true })} />
              {errors.nomPrenom && <span className="error-message">Ce champ est requis.</span>}
              
              <label htmlFor="domaine">Domaines d’intervention:</label>
              <select id="domaine" {...register("domaine", { required: true })}>
                <option value="">Sélectionnez un domaine</option>
                {/* Ajoutez ici les options de domaine */}
              </select>
              {errors.domaine && <span className="error-message">Ce champ est requis.</span>}

              <label htmlFor="autresDomaines">Autres domaines:</label>
              <input type="text" id="autresDomaines" {...register("autresDomaines")} />

              <label htmlFor="gouvernorats">Gouvernorats:</label>
              <select id="gouvernorats" {...register("gouvernorats", { required: true })}>
                <option value="">Sélectionnez un gouvernorat</option>
                {/* Ajoutez ici les options de gouvernorat */}
              </select>
              {errors.gouvernorats && <span className="error-message">Ce champ est requis.</span>}

              <label htmlFor="telephone">Numéro de téléphone:</label>
              <input type="text" id="telephone" {...register("telephone", { required: true })} />
              {errors.telephone && <span className="error-message">Ce champ est requis.</span>}

              <label htmlFor="email">Adresse mail:</label>
              <input type="text" id="email" {...register("email", { required: true })} />
              {errors.email && <span className="error-message">Ce champ est requis.</span>}

              <label htmlFor="password">Mot de passe:</label>
              <input type="password" id="password" {...register("password", { required: true })} />
              {errors.password && <span className="error-message">Ce champ est requis.</span>}

              <label htmlFor="confirmPassword">Confirmer Mot de passe:</label>
              <input type="password" id="confirmPassword" {...register("confirmPassword", { required: true })} />
              {errors.confirmPassword && <span className="error-message">Ce champ est requis.</span>}

              <label htmlFor="bio">Brève Bio (maximum 5 lignes):</label>
              <textarea id="bio" {...register("bio", { required: true, maxLength: 5 })}></textarea>
              {errors.bio && <span className="error-message">Ce champ est requis et doit avoir au maximum 5 lignes.</span>}

              {/* Ajoutez d'autres champs ici selon votre structure */}

              <label>Méthodes de coaching:</label>
              <input type="checkbox" id="method1" {...register("method1")} />
              <label htmlFor="method1">Méthode 1</label>

              {/* Ajoutez d'autres méthodes ici */}

              <label htmlFor="langues">Langues:</label>
              <input type="checkbox" id="langue1" {...register("langue1")} />
              <label htmlFor="langue1">Langue 1</label>

              {/* Ajoutez d'autres langues ici */}

              <label htmlFor="typesClients">Types de clients:</label>
              <input type="checkbox" id="typeClient1" {...register("typeClient1")} />
              <label htmlFor="typeClient1">Type de client 1</label>

              {/* Ajoutez d'autres types de clients ici */}

              <label htmlFor="tarif">Tarif préférentiel (réduction de 10% pour les clients de la plateforme):</label>
              <input type="radio" id="tarifOui" value="oui" {...register("tarif")} />
              <label htmlFor="tarifOui">Oui</label>
              <input type="radio" id="tarifNon" value="non" {...register("tarif")} />
              <label htmlFor="tarifNon">Non</label>

              <label htmlFor="photo">Photo:</label>
              <input type="file" id="photo" {...register("photo")} />

              {/* Ajoutez d'autres champs de fichier ici */}

              <label htmlFor="lienSite">Lien du site:</label>
              <input type="text" id="lienSite" {...register("lienSite")} />

              {/* Ajoutez d'autres champs ici selon votre structure */}

              <label htmlFor="pdfPiece">Un fichier PDF contenant toute pièce justifiant l’expérience en coaching et toutes autres compétences (diplômes, certificats, formations):</label>
              <input type="file" id="pdfPiece" {...register("pdfPiece")} />

              <input type="submit" value="Envoyer" />
            </form>
        </div>
      </div>
    </>
  );
};

export default AjoutArticle;
