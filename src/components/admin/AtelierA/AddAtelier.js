import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAtelier } from '../../../Redux/Slice/AtelierSlice';
import BarheaderAdmin from '../BarheaderAdmin.js';
import NavBarAdmin from '../NavBarAdmin.js';

import './css/addatelier.css';
import Deconnection from '../Deconnection.js';

const AddAtelier = () => {
  const [numThéme, setNumThéme] = useState(0);
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
      <Deconnection/>

      <div className="addAtelier">
        <form onSubmit={handleSubmit} className="addAtelierContainer">
          <div style={{display:'flex',flexDirection:"column"}}>
            <label className='LabelAtelier'>Num Théme:</label>
            <input  className="imputAtelierNum" type="number"  value={numThéme} onChange={handleNumThémeChange} required />
          </div>
          <div  style={{display:'flex',flexDirection:"column"}}>
            <label className='LabelAtelier'>Titre:</label>
            <input type="text"  className="imputAtelier" value={titre} onChange={handleTitreChange} required />
          </div>
          <div  style={{display:'flex',flexDirection:"column"}}>
            <label className='LabelAtelier'>Date:</label>
            <input type="text"  className="imputAtelier" value={date} onChange={handleDateChange} required />
          </div>
          <div  style={{display:'flex',flexDirection:"column"}}>
            <label className='LabelAtelier'>Heure:</label>
            <input type="text"   className="imputAtelier" value={heure} onChange={handleHeureChange} required />
          </div>
          <div  style={{display:'flex',flexDirection:"column"}}>
            <label className='LabelAtelier'>Statut:</label>
            <input type="text"  className="imputAtelier" value={statut} onChange={handleStatutChange} required />
          </div>
          <div  style={{display:'flex',flexDirection:"column"}}>
            <label className='LabelAtelier'>Photo de Théme :</label>
            <input type="file" onChange={handlePhotoChange} required />
          </div>
            <button type="submit" className='btnAddAtelier'>Envoyer</button>
        </form>
      </div>
    </>
  );
};

export default AddAtelier;
