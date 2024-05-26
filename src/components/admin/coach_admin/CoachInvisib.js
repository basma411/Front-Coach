import React from 'react'
import image from "../../../images/big_image_2.jpg";
import BarheaderAdmin from '../BarheaderAdmin';
import NavBarAdmin from '../NavBarAdmin';
import { useNavigate } from 'react-router-dom';

const CoachInvisib = () => {
    const navigator=useNavigate()
    const handleLogout = () => {
   navigator("/admin/login")
    };
  return (
<>

<BarheaderAdmin />
      <NavBarAdmin />
      <div
        className="ImagePlatforme"
        style={{
          position: "relative",
          textAlign: "center",
          height: "300px",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <div>
      
<h4 style={{ fontSize: "20px", cursor: "pointer" }} onClick={handleLogout}>
  Déconnexion
</h4>

          <h4 style={{ fontSize: "20px" , padding:"0px"}}>
          Menu principal

          </h4>
        </div>
      </div>
</>
)
}
export default CoachInvisib