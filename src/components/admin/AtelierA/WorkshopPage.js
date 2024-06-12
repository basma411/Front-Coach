import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BarheaderAdmin from '../BarheaderAdmin.js';
import NavBarAdmin from '../NavBarAdmin.js';
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";
import './css/WorkshopPage.css';

function WorkshopPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>  
      <BarheaderAdmin />
      <NavBarAdmin />
      <div className="ImagePlatforme" style={{ backgroundImage: `url(${image})` }}>
        <div>
          <IoPowerOutline />
          <h2>Bienvenue sur votre espace administration</h2>
        </div>
      </div>
      <div className='WorkshopPage'>
        <div className='WorkshopPageContainer'>
          <button onClick={() => navigate(`/admin/atelier-A/${id}/add-PUB`)}>Ajouter publication</button>
          <button onClick={() => navigate(`/admin/atelier-A/${id}/List-PROF`)}>Liste des professionnels</button>
          <button onClick={() => navigate(`/admin/atelier-A/${id}/List-COACH`)}>Liste des coachs</button>
        </div>
      </div>
    </>
  );
}

export default WorkshopPage;
