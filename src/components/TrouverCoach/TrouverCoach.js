import React, { useState, useEffect } from "react";
import image from "../../images/big_image_2.jpg";
import ChercheCoach from "../Acueil/ChercheCoach";
import Newsletter from "../coach/Newsletter";
import Footer from "../coach/Footer";
import "./css/TrouverCoach.css"; // Assurez-vous que ce chemin est correct
import { FaRegCirclePlay } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchInterface, addTemoignage } from "../../Redux/Slice/InterfaceSlice";
import { getImageUrl } from "../..";
import { Editor } from "@tinymce/tinymce-react";
import { AddTemoignages } from "../../Redux/Slice/TemoignegeSlice";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import {
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const TrouverCoach = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [Texte, setTexte] = useState("");
  const [titre, setTitre] = useState("");

  const { interfaceData } = useSelector((state) => state.interface);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching interface data...");
    dispatch(fetchInterface());
  }, [dispatch]);

  const handleClick = (article) => {
    setSelectedEvent(article);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleEditorChange = (content) => {
    setTexte(content);
  };

  const handleTemClick = () => {
    navigate("/Temoignages");
  };

  const handleSendTemoignage = () => {
    const temoignage = {
      nom: titre,
      texte: Texte,
    };
    dispatch(AddTemoignages(temoignage)).then(() => {
      setTitre("");
      setTexte("");
      closeModal();
    });
  };

  const truncateText = (htmlText, maxLength) => {
    // Nettoyer le texte HTML pour éviter les injections
    const cleanHtml = DOMPurify.sanitize(htmlText, {
      ALLOWED_TAGS: ["p", "b", "i", "u", "strong", "em", "br", "span"],
      ALLOWED_ATTR: ["style"],
    });

    // Créer un div pour contenir le contenu HTML
    const div = document.createElement("div");
    div.innerHTML = cleanHtml;

    // Initialiser le compteur de caractères
    let charCount = 0;

    // Fonction pour tronquer les enfants récursivement
    const truncateNode = (node) => {
      if (charCount >= maxLength) return;

      if (node.nodeType === Node.TEXT_NODE) {
        const remainingChars = maxLength - charCount;
        if (node.textContent.length > remainingChars) {
          node.textContent = node.textContent.substring(0, remainingChars) + "...";
          charCount = maxLength;
        } else {
          charCount += node.textContent.length;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.childNodes.forEach(truncateNode);
      }
    };

    // Appliquer la troncation sur les enfants du div
    div.childNodes.forEach(truncateNode);

    // Retourner le contenu HTML mis à jour
    return div.innerHTML;
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
        <div style={{ paddingTop: "0px" }}>
          <h3 className="TrouveCoachTitre">Rencontrez votre coach!</h3>
        </div>
      </div>
      <ChercheCoach />

      {interfaceData && interfaceData.length > 0 && (
        <div className="Temaignage">
          <div className="Temaignage-container">
            <div className="heading">
              <h3 className="titreTemoignage">
                {truncateText(interfaceData[0].titre)}
              </h3>
              <div id="styledtext">
                <div dangerouslySetInnerHTML={{ __html: interfaceData[0].texte }} />
              </div>

              <div className="play-button">
                <button className="PartageTem" onClick={() => handleClick(interfaceData[0])}>
                  Partagez votre Témoignage
                </button>
              </div>
            </div>
            <div className="Temaignage-image">
              <h3 className="ParcouTem">Parcourez les témoignages !</h3>
              <img
                src={getImageUrl(interfaceData[0].image)}
                alt="Image placeholder"
                className="ImageTem"
                height={"300px"}
              />
              <FaRegCirclePlay className="icon-playTem" onClick={handleTemClick} />
            </div>
          </div>
        </div>
      )}

      <Dialog open={showModal} onClose={closeModal} fullWidth maxWidth="md">
        <DialogContent>
          <div className="PlatformeEvn" style={{ backgroundImage: `url(${image})` }}>
            <h3 className="AjouterTemTitre">Ajoutez votre témoignage ici!</h3>
          </div>
          <input
            type="text"
            placeholder="Initiales nom et prénom (exemple A.S)"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className="NomTem"
          />

          <Editor
            apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8"
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
                "undo redo  | " +
                "fontselect fontsizeselect | bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              setup: (editor) => {
                editor.on("change", () => handleEditorChange(editor.getContent()));
              },
            }}
            value={Texte}
            onEditorChange={handleEditorChange}
            className="TemEditor"
          />
          <button className="addTemoign" onClick={handleSendTemoignage}>
            Envoyer
          </button>
        </DialogContent>
      </Dialog>

      {showModal && (
        <IconButton
          aria-label="close"
          onClick={closeModal}
          sx={{
            position: "fixed",
            right: "calc(50% - 500px + 8px)", // Adjust based on Dialog maxWidth and desired offset
            top: "calc(50% - 250px - 40px)", // Adjust based on Dialog maxHeight and desired offset
            color: "gray",
            fontWeight:'500',
            zIndex: 1000, // Ensure it's above the dialog
          }}
        >
          <CloseIcon />
        </IconButton>
      )}

      <Newsletter />
      <Footer />
    </>
  );
};

export default TrouverCoach;
