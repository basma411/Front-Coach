import React, { useEffect, useRef } from 'react';
import image from '../../../images/big_image_2.jpg';
import { IoPowerOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import './CSS/ajouterSlider.css';
import BarheaderAdmin from '../BarheaderAdmin';
import NavBarAdmin from '../NavBarAdmin';
import { useNavigate } from 'react-router-dom';
import { GetSlides, addSlider } from '../../../Redux/Slice/SlidesSlice';
import OverlayA from '../OverlayA';

const AjouterSlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 


  const titre1Ref = useRef();
  const titre2Ref = useRef();
  const photoRef = useRef();

  const handlePartenaire = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('titre1', titre1Ref.current.value);
    formData.append('titre2', titre2Ref.current.value);
    formData.append('photo', photoRef.current.files[0]);

    // Dispatch the action with the formData
    dispatch(addSlider(formData));
    navigate('/admin/editer_slider')

  };

  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <OverlayA/>
      <div className="PartenaireAjouter">
        <form className="ParteAjouterContainer" onSubmit={handlePartenaire}>
        <label style={{ margin: '5px' }}>Photo:</label>
          <input type="file" ref={photoRef} />

          <label style={{ margin: '5px' }}>Titre1:</label>
                <input type="text" ref={titre1Ref} style={{ width: '100%', height: '40px' }} />

       
          <label style={{ margin: '5px' }}>Titre2:</label>
          <input type="text" ref={titre2Ref} style={{ width: '100%', height: '40px' }} />
          <button type="submit" style={{ margin: '20px' }}>
            Envoyer
          </button>
        </form>
      </div>
    </>
  );
};



export default AjouterSlider