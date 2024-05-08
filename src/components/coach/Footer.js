import React from 'react';
import { Link } from 'react-router-dom';
import './css/footer.css';
import logofooter from '../../images/logofooter.png';
import { FiPhone, FiMail, FiFacebook, FiYoutube, FiLinkedin, FiInstagram  } from 'react-icons/fi';
import { FaHeart } from "react-icons/fa";

import { MdAccessTime } from 'react-icons/md';

const Footer = () => {
  return (
    <div className='Site-Footer'>
      <div className='container'>
        <div className='footer-grid'>
          <div className='footer-column'>
            <h3>MonCoach.tn</h3>
            <p>LA PLATEFORME DES PROFESSIONNELS DU COACHING</p>
            <img src={logofooter} alt='Logo' />
          </div>
          <div className='footer-column'>
            <h3>Liens rapides</h3>
            <ul className='list-unstyled'>
              <li>
                <Link to='/TrouverCoach'>Trouver un coach</Link>
              </li>
              <li>
                <Link to='/EspaceCoach'>Espace coach</Link>
              </li>
              <li>
                <Link to='https://www.moncoach.tn/presentation'>Le salon de coaching</Link>
              </li>
            </ul>
          </div>
          <div className='footer-column'>
            <h3>Évènements</h3>
            <p>Le salon international des professionnels du coaching</p>
          </div>
          <div className='footer-column'>
            <h3>Contact</h3>
            <div className='contact'>
              <FiPhone />
              <p>+216 96 321 991</p>
            </div>
            <div className='contact'>
              <FiMail />
              <p>contact@moncoach.tn</p>
            </div>
            <div className='contact'>
              <MdAccessTime />
              <div className='social'>
                <Link to='https://www.facebook.com/MonCoach.tn' target='_blank' rel='noopener noreferrer' className='style-sosial'><FiFacebook /></Link>
                <Link to='https://www.youtube.com/channel/UCWOXSvwIkIp1a_6SilFXu_A?fbclid=IwAR1bGWx4MVG2N5qy3UaqbUXxYu8vjR3BZXSixTop7HidV3HCYA3jeqFg2hQ' target='_blank' rel='noopener noreferrer' className='style-sosial'><FiYoutube /></Link>
                <Link to='https://www.linkedin.com/in/mon-coach-8576051b4/?fbclid=IwAR1D_4YSOTKvi8n3T3gKNzEUETN46JNbucgXcEFzlmaa1rn-GXvQVkXyCDU' target='_blank' rel='noopener noreferrer' className='style-sosial'><FiLinkedin /></Link>
                <Link to='#' target='_blank' rel='noopener noreferrer' className='style-sosial'><FiInstagram /></Link>
              </div>
            </div>
          </div>
        </div>
       
      </div>
      <div className='float-md-left'>
        <h3>  Copyright ©2024 Tous les droits sont réservés| Mon coach.tn <FaHeart/> <span>by Tounes Connect</span></h3>

        </div>
    </div>
  );
};

export default Footer;
