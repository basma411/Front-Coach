import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './css/Cherche.css'; 
import { getdomaine } from '../../Redux/Slice/DomainSlice';
import { cherchecoach } from '../../Redux/Slice/CoachSlice';
import { useNavigate } from 'react-router-dom';

const ChercheCoach = () => {
  const dispatch = useDispatch(); // Déplacez l'appel de useDispatch à l'intérieur du composant
const navigator=useNavigate()
  useEffect(() => {
    dispatch(getdomaine());
  }, [dispatch]);

  const { domaines } = useSelector((state) => state.domaine);
  const Nom = useRef();
  const domaine = useRef();
  const gouvernorat = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nom = Nom.current.value;
    const domain = domaine.current.value;
    const gouv = gouvernorat.current.value;

    const filter = {};

    if (nom) {
      filter.nom = nom;
    }

    if (domain !== 'Choisir un domaine de coaching') {
      filter.domain = domain;
    }

    if (gouv !== 'Gouvernorat') {
      filter.gouv = gouv;
    }
  console.log(filter)
    dispatch(cherchecoach(filter));
    navigator('/coach'); 

  };

  return (
  <div className='ChercheCoach'>
    <form className='cherche'>
      <h1 className='ChercheTitle'>Trouvez un coach et prenez rendez-vous en ligne</h1>
      <div className='cherche-coach'>
     <div style={{width:'30%'}}>
     <select className='DomainesCherche' ref={domaine}>
          <option>Choisir un domaine de coaching</option>
          {domaines && domaines.map((domaine) => (
            <option key={domaine.id} value={domaine.domaines}>
              {domaine.domaines}
            </option>
          ))}
        </select>
     </div>
        <div style={{width:'30%'}}>
          <input
            type="text"
            placeholder="Rechercher par nom et prénom du coach"
            className='coachcherche'
            ref={Nom}
          />
        </div>
       <div style={{width:'15%'}}> <select className='gouvernoratCherche' ref={gouvernorat}>
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
        </select></div>
        <button type="submit" onClick={handleSubmit} className='CherSubmit'>Recherche</button>

      </div>
    </form>
    </div>
  );
}

export default ChercheCoach;
