import React from 'react';
import { GoPersonFill } from 'react-icons/go';
import '../coach/css/barheader.css';
import { useNavigate } from 'react-router-dom';

const Barheader = () => {
  const navigate = useNavigate();

  const handleMonCompte = () => {
    navigate('/coach/login');
  }

  const handleFAQ = () => {
    navigate('/faq');
  }

  return (
    <div className="barheaderC">
      <div className="barheader-Container">
        <div className="mocompte-container" onClick={handleMonCompte}>
          <GoPersonFill className="iconCom" />
          <h5 className='mocompte'>Mon compte</h5>
        </div>
        <h5 className='faq' onClick={handleFAQ}>FAQ</h5>
      </div>
    </div>
  );
}

export default Barheader;
