import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import BarheaderAdmin from './BarheaderAdmin';
import NavBarAdmin from './NavBarAdmin';
import image from '../../images/big_image_2.jpg';
import { IoPowerOutline } from 'react-icons/io5';
import './css/accueiladmin.css'; // Import du fichier CSS externe

const AccueilAdmin = () => {
  const { isAuthadmin } = useSelector((state) => state.admin);
  const navigator = useNavigate();

  useEffect(() => {
    if (!isAuthadmin) navigator('/admin/login');
  }, [isAuthadmin, navigator]);

  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <div className="ImagePlatforme" style={{ position: 'relative', textAlign: 'center', height: '300px', backgroundImage: `url(${image})`, backgroundSize: 'cover', overflow: 'hidden' }}>
        <div style={{ paddingTop: '100px' }}>
          <IoPowerOutline style={{ fontSize: '35px', fontWeight: '400' }} />
          <h2 style={{ fontSize: '30px' }}>Bienvenue sur votre espace administration</h2>
        </div>
      </div>
      <div className="PlatformeAdmin">
        <div className="containerPlatforme">
          <div className="left">
          <Link to="/admin/consulter_icon" >
            <button className="buttonStyle">Consulter Icones</button>
            </Link>
            <button className="buttonStyle">Consulter Slider</button>
            <button className="buttonStyle">Consulter La Plume des Coachs</button>
            <button className="buttonStyle">Consulter Biblio</button>
            <button className="buttonStyle">Consulter Domaines</button>
          </div>
          <div className="rigth">
            <button className="buttonStyle">Consulter Interface</button>
            <button className="buttonStyle">Consulter Salon</button>
            <button className="buttonStyle">Consulter Temoignage</button>
            <button className="buttonStyle">Les Ateliers Dégustation Coaching</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccueilAdmin;
