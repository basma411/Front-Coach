import React, { useRef, useState } from 'react';
import image from '../../../images/big_image_2.jpg';
import { IoPowerOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import './css/ajouterdomaine.css';
import BarheaderAdmin from '../BarheaderAdmin';
import NavBarAdmin from '../NavBarAdmin';
import { AddEvenement } from '../../../Redux/Slice/EvenementSlice';
import { useNavigate } from 'react-router-dom';
import { AddDomaine } from '../../../Redux/Slice/DomainSlice';


const AjouterDomaine = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const nomRef = useRef();

 



  const handlePartenaire = (event) => {
    event.preventDefault();
   


    dispatch(AddDomaine({domaines:nomRef.current.value}));
    navigate('/admin/consulter_domaine');
  };

  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <div
        className="ImagePlatforme"
        style={{
          position: 'relative',
          textAlign: 'center',
          height: '300px',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          overflow: 'hidden',
        }}
      >
        <div style={{ paddingTop: '100px' }}>
          <IoPowerOutline style={{ fontSize: '35px', fontWeight: '700' }} />
          <h2 style={{ fontSize: '30px' }}>Bienvenue sur votre espace administration</h2>
        </div>
      </div>
      <div className="EvenementAjouter">
        <form className="EveAjouterContainer" onSubmit={handlePartenaire}>
          <label>Nom :</label>
          <input
            type="text"
            name="domaines"
           ref={nomRef}
          />
          
              
        

          <button type="submit">
            Envoyer
          </button> 
        </form>
      </div>
    </>
  );
};


export default AjouterDomaine