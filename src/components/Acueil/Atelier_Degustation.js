import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../index.js';
import './css/atelierDegus.css';
import image from '../../images/big_image_atelier.jpg';
import Newsletter from '../coach/Newsletter.js';
import Footer from '../coach/Footer.js';

const Atelier_Degustation = () => {
  // Utilisation de useSelector pour récupérer les données des états Redux
  const { ateliers } = useSelector((state) => state.atelier);
  const { pubatelier } = useSelector((state) => state.pubatelier);
  const navigate = useNavigate();

  // Fonction pour obtenir la première image de publication d'un atelier
  const getFirstPublicationImage = (atelierId) => {
    // Rechercher la publication correspondant à l'atelierId
    const publication = pubatelier.find((pub) => pub.ouner === atelierId);
    if (!publication || !publication.img) {
      // Retourner null si la publication ou l'image n'est pas trouvée
      return null;
    }
    return getImageUrl(publication.img);
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
        <div style={{ paddingTop: "30px", fontSize: '40px' }}>
          <h3 className='Titre-Ate-Duge'>Les Ateliers Dégustation Coaching</h3>
        </div>
      </div>
      <div className="atelier-Degus">
        <div className="atelierD-container">
          {ateliers.map((atelier) => {
            const imageUrl = getFirstPublicationImage(atelier._id);
            return (
              <div
                className="card-D"
                key={atelier._id}
                onClick={() => navigate(`/atelier_degustation/${atelier._id}`)} // Navigate on click
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={`Première publication de ${atelier._id}`}
                    className="card-D-image"
                  />
                )}
                <div className="card-D-content">
                  <h3 className="card-D-title">{atelier.titre}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Newsletter/>
      <Footer/>
    </>
  );
};

export default Atelier_Degustation;
