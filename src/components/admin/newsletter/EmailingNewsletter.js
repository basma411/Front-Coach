import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from 'react-icons/io5';
import { sendEmail } from "../../../Redux/Slice/emailSlice";
import "./css/emailnewsletter.css";
import { Link, useNavigate } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import DOMPurify from 'dompurify';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import OverlayA from "../OverlayA";

const EmailingNewsletter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editorRef = useRef(null);

  const { NewsLetter } = useSelector((state) => state.newsletter);

  const [emailMessage, setEmailMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, []);

  const handleEditorChange = (content, editor) => {
    setEmailMessage(content);
  };
  const handelAccueil = () => {
    navigate("/admin/Accueil");
  };
  const handleSendEmail = () => {
    const NewsLetterEmail = NewsLetter.map((newsLetter) => newsLetter.email);
    const cleanedHtml = DOMPurify.sanitize(emailMessage);

    // Envoyer l'e-mail avec le contenu HTML nettoyé
    dispatch(sendEmail({ email: NewsLetterEmail, subject: subject, message: cleanedHtml }));

    // Afficher l'alerte
    setShowAlert(true);

    // Masquer l'alerte et naviguer après un délai
    setTimeout(() => {
      setShowAlert(false);
      navigate('/admin/Newsletter');
    }, 3000); // Délai de 3 secondes avant de naviguer

    console.log(showAlert); // Ceci peut afficher false immédiatement après setShowAlert(true)
  };

  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      
   <OverlayA/>
      <div className="ConsultEmail">
        <div className="ConsultEmailContainer">
            <button className="AccueilNews"onClick={handelAccueil}>Newsletter</button>
          <h3 className="emailingNews"> Emailing Newsletter </h3>
          <label>Objet:</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
          <label>Message:</label>
          <Editor
            apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8"
            onInit={(evt, editor) => {
              editorRef.current = editor;
            }}
            initialValue={emailMessage}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | formatselect | bold italic forecolor | alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              setup: (editor) => {
                editor.on('change', () => handleEditorChange(editor.getContent(), editor));
              }
            }}
          />
          <button onClick={handleSendEmail} className="btn-send">Envoyer</button>
        </div>
        {showAlert && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" style={{ marginTop: '20px', textAlign: 'center' }}>
            Email envoyé avec succès !
          </Alert>
        )}
      </div>
    </>
  );
};

export default EmailingNewsletter;
