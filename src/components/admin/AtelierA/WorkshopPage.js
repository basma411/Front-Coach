import React, { useEffect } from 'react';
import { useNavigate, useParams ,Link} from 'react-router-dom';
import BarheaderAdmin from '../BarheaderAdmin.js';
import NavBarAdmin from '../NavBarAdmin.js';
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import './css/WorkshopPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { delPublic, GetPublication } from '../../../Redux/Slice/PubAtelierSlice.js';
import { getImageUrl } from '../../../index.js';
import OverlayA from '../OverlayA.js';

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
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this publication?")) {
      dispatch(delPublic({ id }));
    }
  };
  const filteredPubatelier = pubatelier.filter(pub => pub.ouner === id);

  return (
    <>  
      <BarheaderAdmin />
      <NavBarAdmin />
    <OverlayA/>
      <div className='WorkshopPage'>
        <div className='WorkshopPageContainer'>
          <button  className="AddPub" onClick={() => navigate(`/admin/atelier-A/${id}/add-PUB`)}>Ajouter publication</button>
          <button  className="ListPro" onClick={() => navigate(`/admin/atelier-A/${id}/List-PROF`)}>Liste des professionnels</button>
          <button  className="ListCoach" onClick={() => navigate(`/admin/atelier-A/${id}/List-COACH`)}>Liste des coachs</button>
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
                <th className='HeaderPub'>
                  Titre
                </th>
                <th className='HeaderPub'>
                  Image
                </th>
                <th className='HeaderPub'>
                  Texte
                </th>
                <th className='HeaderPub'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPubatelier.map((pub) => (
                <tr key={pub._id}>
                  <td className='TableDataPub'>
                    {pub.titre}
                  </td>
                  <td className='TableDataPub'>
                    <img
                      src={getImageUrl(pub.img)}
                      width="100px"
                      height="70px"
                      alt="Event"
                    />
                  </td>
                  <td className='TableDataPub'>
                    {truncateText(pub.texte, 49)}
                  </td>
                  <td className='TableDataPub'>
                  <RiDeleteBin6Line className="IconData" onClick={() => handleDelete(pub._id)} />
                    <Link to={`/admin/atelier-A/${pub._id}/edit`}>
                      <CiEdit className="IconData" />
                    </Link>
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
