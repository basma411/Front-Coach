import React, { useRef, useState } from 'react';
import image from '../../../images/big_image_2.jpg';
import { IoPowerOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import './css/ajouterdomaine.css';
import BarheaderAdmin from '../BarheaderAdmin';
import NavBarAdmin from '../NavBarAdmin';
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
     
 
      <div className="DomaineAjouter">
        <form className="DomaineAjouterContainer" onSubmit={handlePartenaire}>
          <label>Domaines D'interventions :</label>
          <textarea
            type="text"
            name="domaines"
           ref={nomRef}
          />
          
              
        

      <div className='addDomaine'>
      <button type="submit"  className='btn btn-secondary'>
          Submit
          </button> 
          <button type="button" className='btn btn-secondary' onClick={() => navigate('/admin/Accueil')}>Annuler</button>

      </div>
        </form>
      </div>
    </>
  );
};


export default AjouterDomaine