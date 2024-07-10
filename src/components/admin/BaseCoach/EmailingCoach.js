import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from 'react-icons/io5';
import { sendEmail } from "../../../Redux/Slice/emailSlice";
import "./css/emailcoach.css";
import { Link } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import OverlayA from "../OverlayA";

const EmailingCoach = () => {
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  const { coachVisible, selectedCoaches } = useSelector((state) => state.coach);

  const [emailMessage, setEmailMessage] = useState("");
  const [subject, setSubject] = useState("");

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

  const handleSendEmail = () => {
    const selectedCoachEmails = coachVisible
      .filter((coach) => selectedCoaches.includes(coach._id))
      .map((coach) => coach.email);

    dispatch(sendEmail({ email: selectedCoachEmails, subject: subject, message: emailMessage }));
  };

  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <OverlayA/>
      <div className="ConsultEmail">
        <div className="ConsultEmailContainer">
          <Link to='/admin/Base-Coach'>
            <button className="AccueilEmail">Base des coachs</button>
          </Link>
          <h3 style={{ textAlign: 'center', fontSize: '35px', color: 'gray' }}>Emailing Coachs</h3>
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
          <button onClick={handleSendEmail} style={{ padding: "10px 20px", fontSize: "16px" }}>Send Email</button>
          {/* {isLoading && <p>Sending email...</p>}
          {error && <p>Error: {error}</p>}
          {success && <p>Email sent successfully!</p>} */}
        </div>
      </div>
    </>
  );
};

export default EmailingCoach;
