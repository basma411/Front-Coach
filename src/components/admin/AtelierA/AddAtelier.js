import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAtelier } from '../../../Redux/Slice/AtelierSlice';
import BarheaderAdmin from '../BarheaderAdmin.js';
import NavBarAdmin from '../NavBarAdmin.js';
import image from '../../../images/big_image_2.jpg';
import { IoPowerOutline } from 'react-icons/io5';
import './css/addatelier.css';

const AddAtelier = () => {
  const [numThéme, setNumThéme] = useState('');
  const [titre, setTitre] = useState('');
  const [date, setDate] = useState('');
  const [heure, setHeure] = useState('');
  const [statut, setStatut] = useState('');
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNumThémeChange = (e) => {
    setNumThéme(e.target.value);
  };

  const handleTitreChange = (e) => {
    setTitre(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleHeureChange = (e) => {
    setHeure(e.target.value);
  };

  const handleStatutChange = (e) => {
    setStatut(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('num', numThéme);
    formData.append('titre', titre);
    formData.append('date', date);
    formData.append('heure', heure);
    formData.append('statut', statut);
    formData.append('photo', photo);
console.log(numThéme,titre,date)
    dispatch(addAtelier({ data: formData }))
      navigate('/admin/atelier-A');
    
  };

  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <div className="ImagePlatforme" style={{ backgroundImage: `url(${image})` }}>
        <div>
          <IoPowerOutline />
          <h2>Bienvenue sur votre espace administration</h2>
        </div>
      </div>
      <div className="addAtelier">
        <form onSubmit={handleSubmit} className="addAtelierContainer">
          <div>
            <label className='LabelAtelier'>Théme:</label>
            <input type="number" value={numThéme} onChange={handleNumThémeChange} required />
          </div>
          <div>
            <label className='LabelAtelier'>Titre:</label>
            <input type="text" value={titre} onChange={handleTitreChange} required />
          </div>
          <div>
            <label className='LabelAtelier'>Date:</label>
            <input type="text" value={date} onChange={handleDateChange} required />
          </div>
          <div>
            <label className='LabelAtelier'>Heure:</label>
            <input type="text" value={heure} onChange={handleHeureChange} required />
          </div>
          <div>
            <label className='LabelAtelier'>Statut:</label>
            <input type="text" value={statut} onChange={handleStatutChange} required />
          </div>
          <div>
            <label className='LabelAtelier'>Photo de Théme :</label>
            <input type="file" onChange={handlePhotoChange} required />
          </div>
          <div style={{display:'flex', gap:'20px'}}>
            <button type="submit">Ajouter</button>
            <button type="button" onClick={() => navigate("/admin/atelier-A")}>Annuler</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAtelier;
