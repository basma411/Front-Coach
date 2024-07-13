import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import './css/ajouterpartenaire.css';
import BarheaderAdmin from '../BarheaderAdmin';
import NavBarAdmin from '../NavBarAdmin';
import { AddPartenaire } from '../../../Redux/Slice/PartenaireSlice';
import { useNavigate } from 'react-router-dom';
import OverlayA from '../OverlayA';

const AjouterPartenaires = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const statutRef = useRef();
  const photoRef = useRef();
  const nomRef = useRef();

  const handlePartenaire = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('statut', statutRef.current.value);
    formData.append('photo', photoRef.current.files[0]);
    formData.append('nom', nomRef.current.value);
    
    // Dispatch the action with the formData
    dispatch(AddPartenaire(formData));
    navigate('/admin/Partenaires');
  };

  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <OverlayA/>
      <div className="PartenaireAjouter">
        <form className="ParteAjouterContainer" onSubmit={handlePartenaire}>
          <label className='LabelParAdd'>Statut</label>
          <select ref={statutRef} className="select-inputPar ">
            <option value="platforme">Platforme</option>
            <option value="salon">Salon</option>
          </select>
          
          <div className="input-containerPar ">
            <label className='LabelParAdd'>Photo:</label>
            <input type="file" ref={photoRef} className="file-inputPar " />
          </div>
          
          <label className='LabelParAdd'>Nom:</label>
          <input type="text" ref={nomRef} className="text-inputPar " />
          
          <button type="submit" className="submit-buttonPar ">
            Envoyer
          </button>
        </form>
      </div>
    </>
  );
};

export default AjouterPartenaires;
