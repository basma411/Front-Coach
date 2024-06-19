import React from 'react';
import { BsPersonBadgeFill } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";

import './css/BarheaderAdmin.css'; 
import { Link } from 'react-router-dom';

const BarheaderAdmin = () => {
  return (
    <div className="barheaderAdmin">
      <div className='barheaderContainer'>
        <BsPersonBadgeFill  className="iconCompte" />
        <Link to="/admin/Base-Coach" className='barheadericon'>Base des coachs  </Link>
        <FaQuestion/>
        <Link to="/admin/FAQ" className='barheadericon'>      FAQ
        </Link>
      </div>
    </div>
  );
}

export default BarheaderAdmin;
