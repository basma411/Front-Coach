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
import OverlayA from '../OverlayA';

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
    dates: '', 
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
  const handelAccueil = () => {
    navigate("/admin/Accueil");
  };
  const handlePartenaire = (event) => {
    event.preventDefault();

    // Vérification de la complétion de tous les champs requis
    if (!formData.titre || !Texte || !formData.lien || !formData.lieu || !formData.dates || !photoRef.current.files[0]) {
      alert("Tous les champs sont requis.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('titre', formData.titre);
    formDataToSend.append('texte', Texte);
    formDataToSend.append('lien', formData.lien);
    formDataToSend.append('lieu', formData.lieu);
    formDataToSend.append('dates', formData.dates); // Modifié de 'date' à 'dates'
    formDataToSend.append('photo', photoRef.current.files[0]);

    dispatch(AddEvenement(formDataToSend))
      .then(() => {
        navigate('/admin/Evenements');
      })
      .catch((error) => {
        console.error("Failed to add event: ", error);
      });
  };

  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <OverlayA/>

      <div className="EvenementAjouter">
        <form className="EveAjouterContainer" onSubmit={handlePartenaire}>
        <button className="buttonAccueilEvnt" onClick={handelAccueil}>
            Accueil
          </button>
     <div style={{display:'flex',flexDirection:'column'}}>
     <label  className='labelAddEvnt'>Titre :</label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleInputChange}
            className='inputAddEvnt'
            required // Champ requis
          />
     </div>

     <div style={{display:'flex',flexDirection:'column'}}>
     <label className='labelAddEvnt'>Texte :</label>
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
        </div>
<div style={{display:'flex',flexDirection:'column'}}>
<label className='labelAddEvnt'>Lien :</label>
          <input
            type="text"
            name="lien"
            value={formData.lien}
            onChange={handleInputChange}
            className='inputAddEvnt'
            required 
          />
</div>

<div style={{display:'flex',flexDirection:'column'}}>     <label  className='labelAddEvnt'>Lieu :</label>
          <input
            type="text"
            name="lieu"
            value={formData.lieu}
            onChange={handleInputChange}
            className='inputAddEvnt'
            required // Champ requis
          /></div>


<div style={{display:'flex',flexDirection:'column'}}>   <label  className='labelAddEvnt'>Date :</label>
          <input
            type="text"
            name="dates" // Modifié de 'date' à 'dates'
            value={formData.dates}
            onChange={handleInputChange}
            className='inputAddEvnt'
            required // Champ requis
          />
          </div>


          <div style={{display:'flex',flexDirection:'column'}}> 
            
          <label  className='labelAddEvnt'>Photo :</label>
          <input type="file" ref={photoRef}  required className='fileAddEvnt'    
          /> 
          </div>



          <button type="submit" className='ButtonAddEvnt'>
            Envoyer
          </button>
        </form>
      </div>
    </>
  );
};

export default AjouterEvenement;
