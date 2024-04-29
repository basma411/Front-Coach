import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './css/Cherche.css'; 
import { getdomaine } from '../../Redux/Slice/DomainSlice';
const ChercheCoach = () => {
     const dispatch = useDispatch();
  const { domaines } = useSelector((state) => state.domaine);

  useEffect(() => {
    dispatch(getdomaine())
  }, [dispatch]);

  

  return (
    <form  className='cherche'>
    <h1>Trouvez un coach et prenez rendez-vous en ligne</h1>
  

  <div className='cherche-coach'>
    <select className='Domaines'>
      <option>Choisir un domaine de coaching</option>
      {domaines.map((domaine) => (
        <option key={domaine.id} value={domaine.NomDomaine}>{domaine.NomDomaine}</option>
      ))}
    </select>
<div >
<input type="text"  placeholder="Rechercher par nom et prénom du coach" className='coachcherche'/>

</div>

    <select className='gouvernorat' >
      <option>Gouvernorat</option>
      {[
        "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", 
        "Bizerte", "Béja", "Jendouba", "Kef", "Siliana", "Kairouan", 
        "Kasserine", "Sidi Bouzid", "Sousse", "Monastir", "Mahdia", 
        "Sfax", "Kébili", "Gabès", "Medenine", "Tataouine", "Tozeur", "Gafsa"
      ].map((gouvernorat, index) => (
        <option key={index} value={gouvernorat}>
          {gouvernorat}
        </option>
      ))}
    </select>

    <button type="submit">Recherche</button>
  </div>
</form>  )
}

export default ChercheCoach