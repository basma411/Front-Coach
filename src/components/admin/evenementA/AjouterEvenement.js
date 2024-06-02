import React, { useRef, useState } from 'react';
import image from '../../../images/big_image_2.jpg';
import { IoPowerOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import './css/ajouterevenement.css';
import BarheaderAdmin from '../BarheaderAdmin';
import NavBarAdmin from '../NavBarAdmin';
import { AddEvenement } from '../../../Redux/Slice/EvenementSlice';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AjouterEvenement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: '',
    texte: '',
    lien: '',
    lieu: '',
    date: '',
  });

  const photoRef = useRef();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData(prevData => ({
      ...prevData,
      texte: data,
    }));
  };

  const handlePartenaire = (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('titre', formData.titre);
    formDataToSend.append('texte', formData.texte);
    formDataToSend.append('lien', formData.lien);
    formDataToSend.append('lieu', formData.lieu);
    formDataToSend.append('dates', formData.date);
    formDataToSend.append('photo', photoRef.current.files[0]);

    dispatch(AddEvenement(formDataToSend));
    navigate('/admin/Evenements');
  };

  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <div
        className="ImagePlatforme"
        style={{
          position: 'relative',
          textAlign: 'center',
          height: '300px',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          overflow: 'hidden',
        }}
      >
        <div style={{ paddingTop: '100px' }}>
          <IoPowerOutline style={{ fontSize: '35px', fontWeight: '700' }} />
          <h2 style={{ fontSize: '30px' }}>Bienvenue sur votre espace administration</h2>
        </div>
      </div>
      <div className="EvenementAjouter">
        <form className="EveAjouterContainer" onSubmit={handlePartenaire}>
          <label>Titre :</label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleInputChange}
            className='styleinput'
          />
          
          <label>Texte :</label>
          <div             className='styleinput'
>

          </div>
          <CKEditor
            editor={ClassicEditor}
            data={formData.texte}
            onChange={handleEditorChange}
            config={{
              toolbar: ['bold', 'italic', '|', 'numberedList', 'bulletedList', '|', 'outdent', 'indent', '|', 'link', 'unlink'],
              language: 'en',
            }}
          />          
          
          <label>Lien :</label>
          <input
            type="text"
            name="lien"
            value={formData.lien}
            onChange={handleInputChange}
            className='styleinput'
          />
          
          <label>Lieu :</label>
          <input
            type="text"
            name="lieu"
            value={formData.lieu}
            onChange={handleInputChange}
            className='styleinput'
          />
          
          <label>Date :</label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className='styleinput'
          />
          
          <label>Photo :</label>
          <input type="file" ref={photoRef} className='styleinput' />

          <button type="submit">
            Envoyer
          </button> 
        </form>
      </div>
    </>
  );
};

export default AjouterEvenement;
