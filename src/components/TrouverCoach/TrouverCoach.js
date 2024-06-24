import React, { useState, useEffect } from 'react';
import image from '../../images/big_image_2.jpg';
import ChercheCoach from '../Acueil/ChercheCoach';
import Newsletter from '../coach/Newsletter';
import Footer from '../coach/Footer';
import './css/TrouverCoach.css'; 
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { fetchInterface, addTemoignage } from '../../Redux/Slice/InterfaceSlice';
import { getImageUrl } from '../..';
import { Editor } from '@tinymce/tinymce-react'; 
import { AddTemoignages } from '../../Redux/Slice/TemoignegeSlice';
import { useNavigate } from 'react-router-dom';

const TrouverCoach = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [Texte, setTexte] = useState('');
  const [titre, setTitre] = useState('');

  const { interfaceData } = useSelector((state) => state.interface); 
  const dispatch = useDispatch();
const navigate=useNavigate()
  useEffect(() => {
    console.log("Fetching interface data...");
    dispatch(fetchInterface());
  }, [dispatch]);

  const handleClick = (article) => {
    setSelectedEvent(article);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleEditorChange = (content) => {
    setTexte(content);
  };
const handleTemClick=()=>{
  navigate("/Temoignages")
}
  const handleSendTemoignage = () => {
    const temoignage = {
      nom:titre,
      texte: Texte,
    };
    dispatch(AddTemoignages(temoignage)).then(() => {
      setTitre('');
      setTexte('');
      closeModal();    });
  
  };

  const truncateText = (htmlText, maxLength) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    const textContent = doc.body.textContent || "";
    return textContent.length > maxLength ? textContent.substring(0, maxLength) + '...' : textContent;
  };

  return (
    <>
      <div
        className="ImagePlatforme"
        style={{
          position: "relative",
          textAlign: "center",
          height: "300px",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <div style={{ paddingTop: "100px" }}>
          <h2>Rencontrez votre <br/> coach!</h2>
        </div>
      </div>
      <ChercheCoach/>

      {interfaceData && interfaceData.length > 0 && (
        <div className="Temaignage">
          <div className='Temaignage-container'>
            <div className='heading'>
              <h2 className='titreTemoignage'>
                {truncateText(interfaceData[0].titre, 100)}
              </h2>
              <p className="text">
                {truncateText(interfaceData[0].texte, 300)}
              </p> 
              <div className="play-button">
                <button onClick={() => handleClick(interfaceData[0])}>
                  Partagez votre Témoignage
                </button>
              </div>
            </div>
            <div className='Temaignage-image'> 
              <h3>Parcourez les témoignages !</h3>
              <img src={getImageUrl(interfaceData[0].image)} alt="Image placeholder" height={'400px'} />
              <FaPlay className='icon-play' onClick={()=>handleTemClick()}/>
            </div>
          </div>
        </div>
      )}
      {showModal && selectedEvent && (
        <div className="modalBaghroundTemoignage" >
          <span className="close" onClick={closeModal} >&times;</span>
          <div className="modaltemoignageContainer" >
          <div
        className="ImagePlatformeEvn"
        style={{
          position: "relative",
          padding:'0',
          margin:'0',
          width:'100%',
          // height: "300px",
          top:'0',
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <div style={{ paddingTop: "100px" ,paddingLeft:'250px'}}>
          <h5 style={{fontSize:'30px' }}>Ajoutez votre <br/>témoignage ici!</h5>
        </div>
      </div>  
<div style={{width:'60%',height:'100px',margin:'50px auto'}}>
  <input
    type='text'
    style={{ width: '100%', margin: '10px' }}
    placeholder="Initiales nom et prénom (exemple A.S)"
    value={titre}
    onChange={(e) => setTitre(e.target.value)}
  />
<Editor
  apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8"
  init={{
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
      { value: 'First.Name', title: 'First Name' },
      { value: 'Email', title: 'Email' },
    ],
  }}
  value={Texte}
  onEditorChange={handleEditorChange}
/>    
  <button className='addTemoign' onClick={handleSendTemoignage}>Envoyer</button>
  </div>      
          </div>
        </div>
      )}
      <Newsletter/>
      <Footer/>
    </>
  );
};

export default TrouverCoach;
