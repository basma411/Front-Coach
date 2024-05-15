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
  const nom = useRef();
  const domaine = useRef();
  const gouvernorat = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const NomPrenom = nom.current.value;
    const DomainesIntervention = domaine.current.value;
    const Governorat = gouvernorat.current.value;

    const filter = {};

    if (NomPrenom) {
      filter.NomPrenom = NomPrenom;
    }

    if (DomainesIntervention !== 'Choisir un domaine de coaching') {
      filter.DomainesIntervention = DomainesIntervention;
    }

    if (Governorat !== 'Gouvernorat') {
      filter.Governorat = Governorat;
    }
  console.log(filter)
    dispatch(cherchecoach(filter));
    navigator('/coach'); 

  };

  return (
    <form className='cherche'>
      <h1>Trouvez un coach et prenez rendez-vous en ligne</h1>
      <div className='cherche-coach'>
     <div>
     <select className='Domaines' ref={domaine}>
          <option>Choisir un domaine de coaching</option>
          {domaines.map((domaine) => (
            <option key={domaine.id} value={domaine.NomDomaine}>
              {domaine.NomDomaine}
            </option>
          ))}
        </select>
     </div>
        <div>
          <input
            type="text"
            placeholder="Rechercher par nom et prénom du coach"
            className='coachcherche'
            ref={nom}
          />
        </div>
       <div> <select className='gouvernorat' ref={gouvernorat}>
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
        <button type="submit" onClick={handleSubmit} className='ChercheCoach'>Recherche</button>

      </div>
    </form>
  );
}

export default ChercheCoach;
