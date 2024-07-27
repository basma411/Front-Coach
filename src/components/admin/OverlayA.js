import React from 'react'
import image from '../../images/big_image_2.jpg';
import deconnect from "./../../images/deconnect.png";
import "./css/overlay.css"
import { useNavigate } from 'react-router-dom';

const OverlayA = () => {
    const navigator=useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("isAuthadmin");
        localStorage.removeItem("token1");
        navigator('/admin/login');
      };
  return (
<div className="PlatformeA">
<div className="PlatformeAcceuil" data-stellar-background-ratio="0.5"
    style={{
      position: "relative",
      textAlign: "center",
      backgroundImage: `url(${image})`,
    }}
  >
    <div className='text-center'>
      <img src={deconnect} alt="Deconnect" onClick={handleLogout} style={{cursor: 'pointer'}} />
      <h3 className=' mb-2 AcceuilTitre'>Bienvenue sur votre espace administration</h3>
    </div>
  </div>  

</div>
)
}

export default OverlayA