import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import BarheaderAdmin from '../BarheaderAdmin';
import NavBarAdmin from '../NavBarAdmin';
import { Editor } from '@tinymce/tinymce-react';
import { sendEmail } from '../../../Redux/Slice/emailSlice';
import image from "../../../images/big_image_2.jpg";
import './css/ContactEmailA.css';

const ContactEmailA = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { Contacts } = useSelector((state) => state.contact);
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [message, setMessage] = useState('');
  const form = useRef();
  const editorRef = useRef(null);

  useEffect(() => {
    if (Contacts.length > 0) {
      const foundContact = Contacts.find((contact) => contact._id === id);
      setContact(foundContact);
    }
  }, [Contacts, id]);

  const handleEditorChange = (content) => {
    setMessage(content);
  };

  useEffect(() => {
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const truncateText = (htmlText, maxLength) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    const textContent = doc.body.textContent || "";
    return textContent.length > maxLength ? textContent.substring(0, maxLength) + '...' : textContent;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!contact) {
      alert('Contact not found!');
      return;
    }

    const templateParams = {
      email: contact.email,
      subject: form.current.subject.value,
      message: truncateText(message, 1000), // Limitez la longueur du message si nécessaire
    };

    dispatch(sendEmail(templateParams))
      .then(() => {
        alert('Email sent successfully!');
        navigate("/admin/Contact")

      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        alert('Failed to send email: ' + error.message);
        navigate("/admin/Contact")

      });
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
        <form ref={form} onSubmit={handleSubmit} className='EmailForm'>
          <input type="hidden" name="to_email" value={contact.email} />
          <div>
            <label>Objet</label>
            <input type="text" name="subject" />
          </div>
          <div>
            <label>Message</label>
            <Editor
              apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8"
              onInit={(evt, editor) => {
                editorRef.current = editor;
                editor.setContent(message);
              }}
              initialValue={message}
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
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                setup: (editor) => {
                  editor.on('change', () => handleEditorChange(editor.getContent()));
                }
              }}
            />
          </div>
          <input type="submit" value="Send" className='sendemail' />
        </form>
      </div>
    </>
  );
};

export default ContactEmailA;
