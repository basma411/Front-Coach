import React, { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetAtelier } from '../../../Redux/Slice/AtelierSlice';
import { getImageUrl } from '../../../index.js';
import BarheaderAdmin from '../BarheaderAdmin.js';
import NavBarAdmin from '../NavBarAdmin.js';


import './css/workshop.css';
import OverlayA from '../OverlayA.js';

function WorkshopList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ateliers } = useSelector((state) => state.atelier);

  useEffect(() => {
    dispatch(GetAtelier());
  }, [dispatch]);

  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <OverlayA/>

      <div className='workshop'>
        <div className='workshop-Container'>
            <button className='AddAtelier' onClick={() => navigate("/admin/atelier-A/ajouter")}>Ajouter un Atelier</button>
          <table className='TableAtel'>
            <thead>
              <tr>
                <th className='HeaderAte'>Image</th>
                <th className='HeaderAte'>Atelier</th>
                <th className='HeaderAte'>Information</th>
              </tr>
            </thead>
            <tbody>
              {ateliers && ateliers.map(workshop => (
                <tr  key={workshop.id}>
                  <td className='DataAte'>
                    <img 
                      src={getImageUrl(workshop.photo)}
                      alt={`Théme${workshop.num}`} 
                      className='ImageTheme'
                    />
                  </td>
                  <td className='DataAte'>{`Théme${workshop.num}`}</td>
                  <td className='DataAte'>
                    <button  className='btn-Théme' onClick={() => navigate(`/admin/atelier-A/${workshop._id}`)}>
                      {`Atelier ${workshop.num}`}
                    </button>
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

export default WorkshopList;
