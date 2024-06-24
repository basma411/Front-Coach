import React from 'react';
import image from '../../images/atelier-01.jpg';
import './css/atelier.css'; // Assurez-vous de remplacer le chemin par le bon
import { FaPlay } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Atelier = () => {
  return (
    <div className="Atelier-con">
      
    <div className="Atelier-container">

    <div className='heading'>
        <h2 className='TitleAtelier'>Bienvenue à notre Plateforme</h2>
        <p className="TextAtelier">
          Plateforme grand public qui ambitionne de donner à tous les coachs les mêmes chances de se faire connaître et aux personnes à la recherche de coach, un accès facile et des informations complètes sur les professionnels du métier. Elle rassemble les professionnels francophones du coaching dans le respect des différentes pratiques et champs d’intervention propres à chacun. Fondée sur l’échange, elle permet aux coachs de se définir dans leur pratique et aux coachés d’échanger sur leurs expériences.
        </p>
      </div>
      <div className='atelier-image'> 
        <img src={image} alt="Image placeholder" height={'400px'} />
        <Link to="/atelier_degustation">
            <FaPlay className='icon-play' />
          </Link>
        <div >

        <Link to="/FormAtelier">
            <button className="AtelierInscri">Je m'inscris</button>
          </Link>        </div>
      </div>
    </div>
    </div>
  );
}

export default Atelier;
