import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import BarheaderAdmin from '../BarheaderAdmin';
import NavBarAdmin from '../NavBarAdmin';
import "./css/EmailingPub.css";
import image from '../../../images/big_image_2.jpg';  
import DOMPurify from 'dompurify';
import { sendEmail } from '../../../Redux/Slice/emailSlice';
import { GetList } from '../../../Redux/Slice/ListSlice';

const EmailingPub = () => {
  const { Lists } = useSelector((state) => state.list);
  const [emailMessage, setEmailMessage] = useState("");
  const [subject, setSubject] = useState("");
  const editorRef = useRef(null);
  const dispatch = useDispatch();
    const navigate = useNavigate();
  useEffect(() => {
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, []);
  useEffect(() => {
  // dispatch(GetList())
  console.log(Lists)
  }, []);

  const handleEditorChange = (content, editor) => {
    setEmailMessage(content);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    const selectedListEmails = Lists.map((List) => List.mail);

  dispatch(sendEmail({ email: selectedListEmails, subject: subject, message: emailMessage }));
  navigate("/admin/atelier-A")  };


  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <div
        className="ImagePlatformeContact"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div>
          <h3 className='TitreContact'>Formulaire d'envoi d'email</h3>
        </div>
      </div>
      <div className="ConsultEmail">
        <div className="ConsultEmailContainer">
          <h3 className="EmailingC">Emailing </h3>
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
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
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
          <button onClick={handleSendEmail} className="SendEmail">Envoyer</button>
          {/* {isLoading && <p>Sending email...</p>}
          {error && <p>Error: {error}</p>}
          {success && <p>Email sent successfully!</p>} */}
        </div>
      </div>
    </>
  );
}

export default EmailingPub;
