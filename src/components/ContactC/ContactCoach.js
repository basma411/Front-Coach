import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import image from "../../images/big_image_2.jpg";
import "./css/contactcoach.css";
import { FiPhone, FiMail, FiFacebook, FiYoutube, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { MdAccessTime } from 'react-icons/md';
import { addContact } from '../../Redux/Slice/ContactSlice';

const ContactCoach = () => {
  const dispatch = useDispatch();

  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const contactData = {
      nom_prenom: nameRef.current.value,
      tel: phoneRef.current.value,
      email: emailRef.current.value,
      mssg: messageRef.current.value,
    };

    dispatch(addContact(contactData));

    // Clear the form
    nameRef.current.value = '';
    phoneRef.current.value = '';
    emailRef.current.value = '';
    messageRef.current.value = '';
  };

  return (
    <>
      <div
        className="PlatformeContact"
        style={{
          position: "relative",
          textAlign: "center",
          height: "300px",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <div>
          <h3 className='Contact-Titre'>Contactez-nous</h3>
        </div>
      </div>
      <div className='Contact-coach'>
        <div className='Contact-coach-Container'>
          <div className='left-Contact'>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', width: '100%', gap: '40px' }}>
                <div style={{ flex: 1 }}>
                  <label className='ContactLabel'>Nom et Prénom</label>
                  <input type='text' ref={nameRef} className='ContactInput' />
                </div>
                <div style={{ flex: 1 }}>
                  <label className='ContactLabel'>Téléphone</label>
                  <input type='text' ref={phoneRef} className='ContactInput' />
                </div>
                <div style={{ flex: 1 }}>
                  <label className='ContactLabel'>Email</label>
                  <input type='email' ref={emailRef} className='ContactInput' />
                </div>
              </div>
              <div style={{ width: '100%', marginTop: '20px' }}>
                <label className='ContactLabel'>Laissez votre message</label>
                <textarea ref={messageRef} className='ContactTextarea' />
              </div>
              <button type='submit' className='ContactButton'>Envoyer</button>
            </form>
          </div>
          <div className='right-Contact'>
            <h3 className='Infomation'>Nos Informations</h3>
            <div className='Info-contact'>
              <FiPhone />
              <h3 className='Info-tel Info-email'>+216 96 321 991</h3>
            </div>
            <div className='Info-contact'>
              <FiMail />
              <h3 className='Info-tel Info-email'>contact@moncoach.tn</h3>
            </div>
            <div className='Info-contact'>
              <MdAccessTime />
              <div className='Info-contact'>
                <Link to='https://www.facebook.com/MonCoach.tn' target='_blank' rel='noopener noreferrer' className='Contact-social'><FiFacebook /></Link>
                <Link to='https://www.youtube.com/channel/UCWOXSvwIkIp1a_6SilFXu_A?fbclid=IwAR1bGWx4MVG2N5qy3UaqbUXxYu8vjR3BZXSixTop7HidV3HCYA3jeqFg2hQ' target='_blank' rel='noopener noreferrer' className='Contact-social'><FiYoutube /></Link>
                <Link to='https://www.linkedin.com/in/mon-coach-8576051b4/?fbclid=IwAR1D_4YSOTKvi8n3T3gKNzEUETN46JNbucgXcEFzlmaa1rn-GXvQVkXyCDU' target='_blank' rel='noopener noreferrer' className='Contact-social'><FiLinkedin /></Link>
                <Link to='#' target='_blank' rel='noopener noreferrer' className='footer-style-social'><FiInstagram /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactCoach;
