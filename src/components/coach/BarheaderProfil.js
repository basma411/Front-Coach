import React from 'react'
import { GoPersonFill } from "react-icons/go";
import '../coach/css/login.css'
import { useSelector } from 'react-redux';

const BarheaderProfil = () => {
    const {  coachdata } = useSelector((state) => state.coach);

  return (
    <div  className="barheader">
          
    <GoPersonFill className="iconCompte" />
<h5>{coachdata.NomPrenom}</h5>
<h5>FAQ</h5>
    </div>  )
}

export default BarheaderProfil