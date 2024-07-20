import React from 'react';
import image from '../../images/atelier-01.jpg';
import './css/atelier.css';
import { FaRegCirclePlay } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';


const Atelier = () => {
  const navigate=useNavigate()
  const handelAtelie = () => {
    navigate("/FormAtelier")
  };
  return (
    <>
    
    <div className="Platforme">
      <div className="Platforme-container">
        <div className='Heading'>
          <h3 className='TitlePlateforme'>Bienvenue à notre Plateforme</h3>
          <p className="TextPlatteforme">
            Plateforme grand public qui ambitionne de donner à tous les coachs les mêmes chances de se faire connaitre et aux personnes à la recherche de coach, un accès facile et des informations complètes sur les professionnels du métier. Elle rassemble les professionnels francophones du coaching dans le respect des différentes pratiques et champs d’intervention propres à chacun. Fondée sur l’échange, elle permet aux coachs de se définir dans leur pratique et aux coachés d’échanger sur leurs expériences.
          </p>
        </div>
        <div className='atelier-image'>
          <img src={image} alt="Image placeholder" width="100%" />
          <Link to="/atelier_degustation">
            <FaRegCirclePlay className='icon-play' />
          </Link>
              <button className="AtelierInscri" onClick={handelAtelie}>Je m'inscris</button>
        </div>
      </div>
    </div>
    
    </>
  );
}

export default Atelier;
