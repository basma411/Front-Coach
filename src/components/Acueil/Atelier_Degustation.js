import React from 'react';
import { useSelector } from 'react-redux';
import { getImageUrl } from '../../index.js';
import './css/atelierDegus.css';

const Atelier_Degustation = () => {
  // Utilisation de useSelector pour récupérer les données des états Redux
  const { ateliers } = useSelector((state) => state.atelier);
  const { pubatelier } = useSelector((state) => state.pubatelier);

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
    <div className="atelier-container">
      {ateliers.map((atelier) => {
        const imageUrl = getFirstPublicationImage(atelier._id);
        return (
          <div className="card" key={atelier._id}>
            {imageUrl && (
              <img
                src={imageUrl}
                alt={`Première publication de ${atelier._id}`}
                className="card-image"
              />
            )}
            <div className="card-content">
              <h3 className="card-title">{atelier.titre}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Atelier_Degustation;
