import React, { useRef } from 'react';
import { useDispatch } from 'react-redux'; // Assuming you're using Redux for state management
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
    // nameRef.current.value = '';
    // phoneRef.current.value = '';
    // emailRef.current.value = '';
    // messageRef.current.value = '';
  };

  return (
    <>
      <div
        className="ImagePlatformeEvn"
        style={{
          position: "relative",
          textAlign: "center",
          height: "300px",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <div style={{ paddingTop: "100px" }}>
          <h2>Contactez-nous</h2>
        </div>
      </div>
      <div className='Contact-coach'>
        <div className='Contact-coach-Container'>
          <div className='left-coach'>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div>
                  <label>Nom et Prénom</label>
                  <input type='text' ref={nameRef} style={{ width: '200px', height: '40px' }} />
                </div>
                <div>
                  <label>Téléphone</label>
                  <input type='text' ref={phoneRef} style={{ width: '200px', height: '40px' }} />
                </div>
                <div>
                  <label>Email</label>
                  <input type='email' ref={emailRef} style={{ width: '200px', height: '40px' }} />
                </div>
              </div>
              <div>
                <label>Laissez votre message</label>
                <textarea ref={messageRef} style={{ width: '640px', height: '300px' }} />
              </div>
              <button type='submit'>Envoyer</button>
            </form>
          </div>
          <div className='footer-column'>
            <h3>Nos Informations</h3>
            <div className='footer-contact'>
              <FiPhone />
              <p>+216 96 321 991</p>
            </div>
            <div className='footer-contact'>
              <FiMail />
              <p>contact@moncoach.tn</p>
            </div>
            <div className='footer-contact'>
              <MdAccessTime />
              <div className='footer-social'>
                <Link to='https://www.facebook.com/MonCoach.tn' target='_blank' rel='noopener noreferrer' className='footer-style-social'><FiFacebook /></Link>
                <Link to='https://www.youtube.com/channel/UCWOXSvwIkIp1a_6SilFXu_A?fbclid=IwAR1bGWx4MVG2N5qy3UaqbUXxYu8vjR3BZXSixTop7HidV3HCYA3jeqFg2hQ' target='_blank' rel='noopener noreferrer' className='footer-style-social'><FiYoutube /></Link>
                <Link to='https://www.linkedin.com/in/mon-coach-8576051b4/?fbclid=IwAR1D_4YSOTKvi8n3T3gKNzEUETN46JNbucgXcEFzlmaa1rn-GXvQVkXyCDU' target='_blank' rel='noopener noreferrer' className='footer-style-social'><FiLinkedin /></Link>
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
