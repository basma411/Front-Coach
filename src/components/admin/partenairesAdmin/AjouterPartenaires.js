import React, { useRef } from 'react';
import image from '../../../images/big_image_2.jpg';
import { IoPowerOutline } from 'react-icons/io5';
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
    navigate('/admin/Partenaires')

  };

  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <OverlayA/>
      <div className="PartenaireAjouter">
        <form className="ParteAjouterContainer" onSubmit={handlePartenaire}>
          <label style={{ margin: '5px' }}>Statut</label>
          <select ref={statutRef} style={{ width: '100%', height: '40px' }}>
            <option value="platforme">Platforme</option>
            <option value="salon">Salon</option>
          </select>
          <label style={{ margin: '5px' }}>Photo:</label>
          <input type="file" ref={photoRef} />
          <label style={{ margin: '5px' }}>Nom:</label>
          <input type="text" ref={nomRef} style={{ width: '100%', height: '40px' }} />
          <button type="submit" style={{ margin: '20px' }}>
            Envoyer
          </button>
        </form>
      </div>
    </>
  );
};

export default AjouterPartenaires;
