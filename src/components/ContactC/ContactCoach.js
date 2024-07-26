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
        className="platforme-contact"
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
          <h3 className='contact-titre'>Contactez-nous</h3>
        </div>
      </div>
      <div className='contact-coach'>
        <div className='Contact-coach-Container'>
          <div className='left-contact'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <div className='form-field'>
                  <label className='contact-label'>Nom et Prénom</label>
                  <input type='text' ref={nameRef} className='contact-input' />
                </div>
                <div className='form-field'>
                  <label className='contact-label'>Téléphone</label>
                  <input type='text' ref={phoneRef} className='contact-input' />
                </div>
                <div className='form-field'>
                  <label className='contact-label'>Email</label>
                  <input type='email' ref={emailRef} className='contact-input' />
                </div>
              </div>
              <div className='message-field'>
                <label className='contact-label'>Laissez votre message</label>
                <textarea ref={messageRef} className='contact-textarea' />
              </div>
              <button type='submit' className='contact-button'>Envoyer</button>
            </form>
          </div>
          <div className='right-contact'>
            <h3 className='information-titre'>Nos Informations</h3>
            <div className='info-contact'>
              <FiPhone />
              <h3 className='info-detail'>+216 96 321 991</h3>
            </div>
            <div className='info-contact'>
              <FiMail />
              <h3 className='info-detail'>contact@moncoach.tn</h3>
            </div>
            <div className='info-contact'>
              <MdAccessTime />
              <div className='social-links'>
                <Link to='https://www.facebook.com/MonCoach.tn' target='_blank' rel='noopener noreferrer' className='contact-social'><FiFacebook /></Link>
                <Link to='https://www.youtube.com/channel/UCWOXSvwIkIp1a_6SilFXu_A?fbclid=IwAR1bGWx4MVG2N5qy3UaqbUXxYu8vjR3BZXSixTop7HidV3HCYA3jeqFg2hQ' target='_blank' rel='noopener noreferrer' className='contact-social'><FiYoutube /></Link>
                <Link to='https://www.linkedin.com/in/mon-coach-8576051b4/?fbclid=IwAR1D_4YSOTKvi8n3T3gKNzEUETN46JNbucgXcEFzlmaa1rn-GXvQVkXyCDU' target='_blank' rel='noopener noreferrer' className='contact-social'><FiLinkedin /></Link>
                <Link to='#' target='_blank' rel='noopener noreferrer' className='contact-social'><FiInstagram /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactCoach;
