import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetAtelier } from '../../../Redux/Slice/AtelierSlice';
import { getImageUrl } from '../../../index.js';
import BarheaderAdmin from '../BarheaderAdmin.js';
import NavBarAdmin from '../NavBarAdmin.js';
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";

import './css/workshop.css';

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
          <IoPowerOutline style={{ fontSize: "35px", fontWeight: "400" }} />
          <h2 style={{ fontSize: "30px" }}>
            Bienvenue sur votre espace administration
          </h2>
        </div>
      </div>
      <div className='workshop'>
        <div className='workshopContainer'>
            <button onClick={() => navigate("/admin/atelier-A/ajouter")}>Ajouter un Atelier</button>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Atelier</th>
                <th>Information</th>
              </tr>
            </thead>
            <tbody>
              {ateliers && ateliers.map(workshop => (
                <tr key={workshop.id}>
                  <td>
                    <img 
                      src={getImageUrl(workshop.photo)}
                      alt={`Théme${workshop.num}`} 
                    />
                  </td>
                  <td>{`Théme${workshop.num}`}</td>
                  <td>
                    <button onClick={() => navigate(`/admin/atelier-A/${workshop._id}`)}>
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
