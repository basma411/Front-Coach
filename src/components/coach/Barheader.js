import React from 'react'
import { GoPersonFill } from "react-icons/go";
import '../coach/css/barheader.css'
import { Link } from 'react-router-dom';

const Barheader = () => {
  return (
    <div  className="barheader">
          
    <GoPersonFill className="iconCompte" />
    <Link to="/coach/login">
      <h5>Mon compte</h5>
</Link>
<Link to='/faq'>
<h5>FAQ</h5>

</Link>    </div>  )
}

export default Barheader