import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BarheaderAdmin from '../BarheaderAdmin.js';
import NavBarAdmin from '../NavBarAdmin.js';
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";
import './css/WorkshopPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetPublication } from '../../../Redux/Slice/PubAtelierSlice.js';
import { getImageUrl } from '../../../index.js';

function WorkshopPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pubatelier } = useSelector((state) => state.pubatelier);

  useEffect(() => {
    dispatch(GetPublication(id));
  }, [dispatch, id]);

  const truncateText = (htmlText, maxLength) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    const textContent = doc.body.textContent || "";
    return textContent.length > maxLength ? textContent.substring(0, maxLength) + '...' : textContent;
  };

  const filteredPubatelier = pubatelier.filter(pub => pub.ouner === id);

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
      <div className='WorkshopPage'>
        <div className='WorkshopPageContainer'>
          <button onClick={() => navigate(`/admin/atelier-A/${id}/add-PUB`)}>Ajouter publication</button>
          <button onClick={() => navigate(`/admin/atelier-A/${id}/List-PROF`)}>Liste des professionnels</button>
          <button onClick={() => navigate(`/admin/atelier-A/${id}/List-COACH`)}>Liste des coachs</button>
        </div>
        <div className='ListpubAtelier'> 
          <table
            className="TableEvenement"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Titre
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Image
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Texte
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPubatelier.map((pub) => (
                <tr key={pub._id}>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {pub.titre}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <img
                      src={getImageUrl(pub.img)}
                      width="100px"
                      height="70px"
                      alt="Event"
                    />
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {truncateText(pub.texte, 49)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default WorkshopPage;
