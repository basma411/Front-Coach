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
     
 
      <div className="Domaine-Ajouter">
        <form className="DomaineAjouterContainer" onSubmit={handlePartenaire}>
          <hr style={{color:"#ccc" }}/>
       <div style={{display:'flex',flexDirection:"column"}}>
       <label className='labelDomaine'>Domaines D'interventions :</label>
          <textarea
            type="text"
            name="domaines"
           ref={nomRef}
           className='textAreaDomaine'
          />
       </div>
          
              
        

      <div className='addDomaine'>
      <button type="submit"  className='submitDomaine'>
          Submit
          </button> 
          <button type="button" className='AnnuleDomaine' onClick={() => navigate('/admin/Accueil')}>Annuler</button>

      </div>
        </form>
      </div>
    </>
  );
};


export default AjouterDomaine