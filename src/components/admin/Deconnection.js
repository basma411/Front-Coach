import React from 'react'
import image from '../../images/big_image_2.jpg';
import './css/deconnection.css'
import { useNavigate } from 'react-router-dom';
const Deconnection = () => {
    const navigator=useNavigate()

    const handleLogout = () => {
        navigator("/admin/login")
         };
         const handleMenu = () => {
            navigator("/admin/menu")
             };
  return (
    <div>
           <div
        className="Image-Platforme" data-stellar-background-ratio="0.5"
        style={{
          position: "relative",
          textAlign: "center",
          backgroundImage: `url(${image})`,
         
        }}
      >
          <div className='text-center'>
      
      <h3 className='Deconnect' onClick={handleLogout}>
        Déconnexion
      </h3>
      
                <h3 className='Menu' onClick={handleMenu}>
                Menu principal
      
                </h3>
              </div>
      </div>
    </div>
  )
}

export default Deconnection