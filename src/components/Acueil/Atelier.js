import React from 'react';
import image from '../../images/atelier-01.jpg';
import './css/atelier.css'; // Assurez-vous de remplacer le chemin par le bon
import { FaPlay } from "react-icons/fa";
const Atelier = () => {
  return (
    <div className="Atelier-container">
      
      <div className='heading'>
        <h2>Bienvenue à notre Plateforme</h2>
        <p className="text">
          Plateforme grand public qui ambitionne de donner à tous les coachs les mêmes chances de se faire connaître et aux personnes à la recherche de coach, un accès facile et des informations complètes sur les professionnels du métier. Elle rassemble les professionnels francophones du coaching dans le respect des différentes pratiques et champs d’intervention propres à chacun. Fondée sur l’échange, elle permet aux coachs de se définir dans leur pratique et aux coachés d’échanger sur leurs expériences.
        </p>
      </div>
      <div className='atelier-image'> 
        <img src={image} alt="Image placeholder" height={'400px'} />
        <FaPlay className='icon-play'/>

        <div className="play-button">

          <button>Je m'inscris</button>
        </div>
      </div>
    </div>
  );
}

export default Atelier;
