import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import BarheaderAdmin from '../BarheaderAdmin';
import NavBarAdmin from '../NavBarAdmin';
import { Editor } from '@tinymce/tinymce-react';
import { sendEmail } from '../../../Redux/Slice/emailSlice';
import image from "../../../images/big_image_2.jpg";
import './css/ContactEmailA.css';
import DOMPurify from 'dompurify';

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



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!contact) {
      alert('Contact not found!');
      return;
    }

    const templateParams = {
      email: contact.email,
      subject: form.current.subject.value,
      
      message: DOMPurify.sanitize(message), 
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
        className="ImagePlatformeContact"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div>
          <h3 className='TitreContact'>Formulaire d'envoi d'email</h3>
        </div>
      </div>
     <div className='EmailContact'>
     <div className='EmailContainer'>
        <form ref={form} onSubmit={handleSubmit}>
          <input type="hidden" name="to_email" value={contact.email} />
          <div style={{display:'flex',flexDirection:'column'}}>
            <label className='LabelContact'>Objet</label>
            <input type="text" name="subject"  className='inputObjet'/>
          </div>
          <div style={{display:'flex',flexDirection:'column'}}>
            <label className='LabelContact'>Message</label>
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
          <input type="submit" value="Envoyer" className='sendemail' />
        </form>
      </div>
     </div>
    </>
  );
};

export default ContactEmailA;
