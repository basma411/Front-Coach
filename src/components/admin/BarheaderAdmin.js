import React from 'react';
import { BsPersonBadgeFill } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";

import './css/BarheaderAdmin.css'; 

const BarheaderAdmin = () => {
  return (
    <div className="barheaderAdmin">
      <div className='barheaderContainer'>
        <BsPersonBadgeFill  className="iconCompte" />
        <h5>Base des coachs  /</h5>
        <FaQuestion/>
        <h5>FAQ</h5>
      </div>
    </div>
  );
}

export default BarheaderAdmin;
