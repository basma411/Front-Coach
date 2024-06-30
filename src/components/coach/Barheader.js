import React from 'react'
import { GoPersonFill } from "react-icons/go";
import '../coach/css/barheader.css'
import { Link } from 'react-router-dom';

const Barheader = () => {
  return (

    <div className="barheader">

<div  className="barheaderContainer">
          
          <GoPersonFill className="iconCom" />
          <Link to="/coach/login">
            <h5 className='mocompte '>Mon compte</h5>
      </Link>
      <Link to='/faq'>
      <h5 className='faq'>FAQ</h5>
      
      </Link>    </div>  
    </div>
)
}

export default Barheader