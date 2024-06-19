import React, { useEffect, useRef, useState } from 'react';
import image from '../../../images/big_image_2.jpg';
import { IoPowerOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import './css/ajouterevenement.css';
import BarheaderAdmin from '../BarheaderAdmin';
import NavBarAdmin from '../NavBarAdmin';
import { AddEvenement } from '../../../Redux/Slice/EvenementSlice';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

const AjouterEvenement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const photoRef = useRef(null);

  const [Texte, setTexte] = useState('');

  const [formData, setFormData] = useState({
    titre: '',
    texte: '',
    lien: '',
    lieu: '',
    date: '',
  });

  useEffect(() => {
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditorChange = (content) => {
    setTexte(content);
  };

  const handlePartenaire = (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    console.log(formData.titre,Texte,formData.lien,photoRef.current.files[0])
    formDataToSend.append('titre', formData.titre);
    formDataToSend.append('texte', Texte);
    formDataToSend.append('lien', formData.lien);
    formDataToSend.append('lieu', formData.lieu);
    formDataToSend.append('dates', formData.date);
    formDataToSend.append('photo', photoRef.current.files[0]);

    dispatch(AddEvenement({data:formDataToSend}));
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
          <Editor
            apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8"
            onInit={(evt, editor) => {
              editorRef.current = editor;
              editor.setContent(formData.texte);
            }}
            initialValue={formData.texte}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              setup: (editor) => {
                editor.on('change', () => handleEditorChange(editor.getContent()));
              }
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
