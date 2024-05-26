import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import BarheaderAdmin from '../BarheaderAdmin';
import NavBarAdmin from '../NavBarAdmin';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import image from "../../../images/big_image_2.jpg";
import './css/ContactEmailA.css';  // Import the CSS file

const ContactEmailA = () => {
  const { Contacts } = useSelector((state) => state.contact);
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [message, setMessage] = useState('');
  const form = useRef();

  useEffect(() => {
    if (Contacts.length > 0) {
      const foundContact = Contacts.find((contact) => contact._id === id);
      setContact(foundContact);
    }
  }, [Contacts, id]);
  const handleEditorChange = (event, editor, name) => {
    const data = editor.getData().replace(/<\/?p>|<\/?strong>/g, ' ').trim();
    setMessage(data);
};
console.log(message)
  const sendEmail = (e) => {
    e.preventDefault();

    if (!contact) {
      alert('Contact not found!');
      return;
    }

    const templateParams = {
      sendername: "sowsen",
      to_email: contact.email,
      replyto: "basmas@live.fr",
      subject: form.current.subject.value,
      message: message,
    };

    emailjs.send('service_cn9d7z9', 'template_3lmrczm', templateParams, 'xpjMmLN6NR1cy4Vqv')
      .then(
        () => {
          alert('Email sent successfully!');
        },
        (error) => {
          console.error('Failed to send email:', error);
          alert('Failed to send email: ' + error.text);
        },
      );
  };

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <div
        className="ImagePlatforme"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div>
          <h4>Formulaire d'envoi d'email</h4>
        </div>
      </div>
      <div className='EmailContainer'>
        <form ref={form} onSubmit={sendEmail} className='EmailForm'>
          <input type="hidden" name="to_email" value={contact.email} />
          <div>
            <label>Objet</label>
            <input type="text" name="subject" />
          </div>
          <div>
            <label>Message</label>
            <CKEditor
              editor={ClassicEditor}
              data=""
              onChange={(event, editor) => handleEditorChange(event, editor, 'Titre')}
              config={{
                  toolbar: ['bold', 'italic', '|', 'numberedList', 'bulletedList', '|', 'outdent', 'indent', '|', 'link', 'unlink', 'language'],
                  language: 'en',
              }}
            />
          </div>
          <input type="submit" value="Send" />
        </form>
      </div>
    </>
  );
};

export default ContactEmailA;
