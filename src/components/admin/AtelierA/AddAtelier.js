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
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('atelier', title);
    formData.append('photo', photo);

    dispatch(addAtelier({ data: formData })).then(() => {
      navigate('/admin/atelier-A');
    });
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
            <input type="number" value={title} onChange={handleTitleChange} required />
          </div>
          <div>
            <label  className='LabelAtelier'>Photo de Théme :</label>
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
