import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import image from '../../images/big_image_atelier.jpg';
import { getImageUrl } from '../../index.js';
import { GetPublication } from '../../Redux/Slice/PubAtelierSlice.js';

const ListePub = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {pubatelier} = useSelector((state) => state.pubatelier);
  
  useEffect(() => {
    dispatch(GetPublication());
  }, [dispatch]);

  useEffect(() => {
    console.log('ID from useParams:', id);
    console.log('Pubatelier:', pubatelier);
  }, [id, pubatelier]);

  // Vérifiez si pubatelier est bien un tableau
  const filteredPublications = pubatelier && Array.isArray(pubatelier) ? pubatelier.filter(pub => pub.ouner === id) : [];
  
  useEffect(() => {
    console.log('Filtered Publications:', filteredPublications);
  }, [filteredPublications]);

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
          <h2>Les Ateliers <br /> Dégustation Coaching</h2>
        </div>
      </div>
      <div className="atelier-Degus">
        <div className="atelier-container">
          {filteredPublications.map((pub) => {
            const imageUrl = getImageUrl(pub.img);
            return (
              <div className="card" key={pub._id}>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={`Publication de ${pub.ouner}`}
                    className="card-image"
                  />
                )}
                <div className="card-content">
                  <h3 className="card-title">{pub.titre}</h3>
                  <p className="card-description">{pub.texte}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ListePub;
