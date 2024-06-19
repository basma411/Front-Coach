import React, { useEffect } from 'react';
import image from '../../images/big_image_2.jpg';
import ChercheCoach from '../Acueil/ChercheCoach';
import Newsletter from '../coach/Newsletter';
import Footer from '../coach/Footer';
import './css/TrouverCoach.css'; 
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { fetchInterface } from '../../Redux/Slice/InterfaceSlice';
import { getImageUrl } from '../..';

const TrouverCoach = () => {
  const { interfaceData } = useSelector((state) => state.interface); 
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Fetching interface data...");
    dispatch(fetchInterface());
  }, [dispatch]);

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
        <div className="Temaignage-container">
          <div className='heading'>
            <h2>          {truncateText(interfaceData[0].titre)}
            </h2>
            <p className="text">          {truncateText(interfaceData[0].texte)}
            </p> 
            <div className="play-button">
              <button>Je m'inscris</button>
            </div>
          </div>
          <div className='Temaignage-image'> 
            <h3>Parcourez les témoignages !</h3>

            <img   src={getImageUrl(interfaceData[0].image)} alt="Image placeholder" height={'400px'} />
            <FaPlay className='icon-play'/>
          </div>
        </div>
      )}

      <Newsletter/>
      <Footer/>
    </>
  );
};

export default TrouverCoach;
