import React from 'react'
import { GoPersonFill } from "react-icons/go";
import '../coach/css/barheader.css'
import { useNavigate } from 'react-router-dom';

const Barheader = () => {
  const navigator = useNavigate();

  const handlMonCompte=()=>{
    navigator("/coach/login")


}
const handlFAQ=()=>{
  navigator("/faq")


}
  return (

    <div className="barheaderC {
">

<div  className="barheader-Container">
          
          <GoPersonFill className="iconCom" />
            <h5 className='mocompte '  onClick={()=>handlMonCompte()}>Mon compte</h5>
      <h5 className='faq' onClick={()=>handlFAQ()}>FAQ</h5>
      
         </div>  
    </div>
)
}

export default Barheader