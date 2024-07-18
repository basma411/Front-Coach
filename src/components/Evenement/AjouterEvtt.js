import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import image1 from "../../images/big_image_2.jpg";
import { getImageUrl } from "../..";
import { AddEvenement, GetEvenement } from "../../Redux/Slice/EvenementSlice";
import { useDispatch, useSelector } from "react-redux";
import "./css/ajouterEvnt.css";
import Model from "./Model";
import { useNavigate } from "react-router-dom";
import { CiCalendarDate } from "react-icons/ci";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../images/logo.jpg";
import { MdGpsFixed } from "react-icons/md";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

const AjouterEvtt = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Evenement } = useSelector((state) => state.evenement);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [Texte, setTexte] = useState("");
  const [image, setimage] = useState("");
  const editorRef = useRef(null);
  const photoRef = useRef(null);
  const shareURL = "http://facebook.com";

  const [formData, setFormData] = useState({
    titre: "",
    texte: "",
    lien: "",
    lieu: "",
    dates: "",
  });

  useEffect(() => {
    dispatch(GetEvenement());
  }, [dispatch]);

  const latestArticles = Evenement.slice(-4);
  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!authorRef.current.value) {
  //     newErrors.authorRef = "Veuillez renseigner ce champ.";
  //   }



  //   if (!titleRef.current.value) {
  //     newErrors.titleRef = "Veuillez renseigner ce champ.";
  //   }

  //   if (!editorRef.current.getContent()) {
  //     newErrors.editorRef = "Veuillez renseigner ce champ.";
  //   }

 

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };
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
    formDataToSend.append("titre", Titre);
    formDataToSend.append("texte", Texte);
    formDataToSend.append("lien", Lien);
    formDataToSend.append("lieu", Lieu);
    formDataToSend.append("dates", Dates);
    formDataToSend.append("photo", Photo);

    dispatch(AddEvenement(formDataToSend));
    navigate("/Evenement");
  };

  return (
    <>
      <div
        className="ImagePlatformeEvnAdd"
        style={{
          position: "relative",
          textAlign: "center",
          height: "300px",
          backgroundImage: `url(${image1})`,
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <h3 className="AddEvntTitre">Partagez votre évènement</h3>
      </div>
      <div className="AjouterEVNT">
        <div className="ContainerEvnt">
          <div className="left-Evnt">
            <h2 className="EvntPartager">Évènements déjà partagés</h2>
            {latestArticles.map((article, index) => (
              <div key={index}>
                <img
                  className="left-Evnt-img"
                  src={getImageUrl(article.photo)}
                  alt="Article"
                />
                <h1
                  className="EvntTitre"
                  onClick={() => handleTitleClick(article)}
                >
                  {article.titre}
                </h1>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CiCalendarDate className="EvntDate" />
                  <h3 className="EvntDate">{article.dates}</h3>
                </div>
                <hr />
              </div>
            ))}
          </div>
          <div className="right-Evnt">
            <h1 className="formulaireEvnt">
              Pour partager un évènement, cet espace est pour vous !
            </h1>
            <form onSubmit={handleSubmit}>
              <label className="LabelEvnt">Titre:</label>
              <input
                type="text"
                className="InputEvnt"
                name="titre"
                placeholder=""
                required
                value={formData.titre}
                onChange={(e) =>
                  setFormData({ ...formData, titre: e.target.value })
                }
              />
              <label className="LabelEvnt">Texte:</label>
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
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_css: "/path/to/custom.css", // Ajoutez le chemin vers votre fichier CSS personnalisé
                  setup: (editor) => {
                    editor.on("init", () => {
                      editor.getContainer().classList.add("no-border");
                    });
                    editor.on("change", () =>
                      handleEditorChange(editor.getContent())
                    );
                  },
                }}
                className="editorEvnt"
              />
              <label className="LabelEvnt">Lien:</label>
              <input
                type="text"
                className="InputEvnt"
                name="lien"
                placeholder=""
                required
                value={formData.lien}
                onChange={(e) =>
                  setFormData({ ...formData, lien: e.target.value })
                }
              />
              <label className="LabelEvnt">Lieu:</label>
              <input
                type="text"
                className="InputEvnt"
                name="lieu"
                placeholder=""
                required
                value={formData.lieu}
                onChange={(e) =>
                  setFormData({ ...formData, lieu: e.target.value })
                }
              />
              <label className="LabelEvnt">Date:</label>
              <input
                type="text"
                className="InputEvnt"
                name="dates"
                placeholder=""
                required
                value={formData.dates}
                onChange={(e) =>
                  setFormData({ ...formData, dates: e.target.value })
                }
              />
              <label className="LabelEvnt">Photo:</label>
              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                ref={photoRef}
              />
              <button type="submit" className="AddEvnt">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
      <Dialog open={showModal} onClose={closeModal} fullWidth maxWidth="md">
        <div style={{ padding: "40px" }}>
          <IconButton
            aria-label="close"
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              color: "#000",
              zIndex: "1000",
            }}
          >
            <CloseIcon />
          </IconButton>
          <img src={logo} alt="logo" width="220px" height="70" />
          <hr />
          <div>
            <img
              src={getImageUrl(selectedEvent?.photo)}
              alt="Event"
              className="Evnt-image"
            />
          </div>
          <div className="modal-Evnt">
            <h2 className="Evnt-titre">{selectedEvent?.titre}</h2>
            <div
              className="Evnt-descri"
              dangerouslySetInnerHTML={{ __html: selectedEvent?.texte }}
            />
            <div className="Evnt-info">
              <div className="info-item">
                <CiCalendarDate className="info-icon" />
                <h5 className="info-date">{selectedEvent?.dates}</h5>
              </div>
              <div className="info-item">
                <MdGpsFixed className="info-icon" />
                <h5 className="info-lieu">{selectedEvent?.lieu}</h5>
              </div>
            </div>
            <div className="partagerEVNT">
              <div>
                <FacebookShareButton
                  url={shareURL}
                  quote={selectedEvent?.titre}
                  hashtag="#evenement"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#0965FE",
                      paddingRight: "5px",
                    }}
                  >
                    <FacebookIcon size={20} />
                    <h3 className="info-item">Partage</h3>
                  </div>
                </FacebookShareButton>
              </div>
              <div>
                <LinkedinShareButton url={shareURL}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#0077B5",
                      paddingRight: "5px",
                    }}
                  >
                    <LinkedinIcon size={20} />
                    <h3 className="info-item">Partage</h3>
                  </div>
                </LinkedinShareButton>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AjouterEvtt;
