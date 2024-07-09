import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import BarheaderAdmin from './BarheaderAdmin';
import NavBarAdmin from './NavBarAdmin';

import './css/accueiladmin.css';
import OverlayA from './OverlayA';

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
     <OverlayA/>
      <div className="PlatformeAdmin">
        <div className="containerPlatforme">
          <div className="left">
            <Link to="/admin/consulter_icon">
              <button className="buttonStyle">Consulter Icones</button>
            </Link>
            <Link to="/admin/editer_slider">
              <button className="buttonStyle">Consulter Slider</button>
            </Link>
            <button className="buttonStyle">Consulter La Plume des Coachs</button>
            <Link to="/admin/consulter_biblio">
              <button className="buttonStyle">Consulter Biblio</button>
            </Link>
            <Link to="/admin/consulter_domaine">
              <button className="buttonStyle">Consulter Domaines</button>
            </Link>
          </div>
          <div className="rigth">
            <Link to="/admin/consulter_interface">
              <button className="buttonStyle">Consulter Interface</button>
            </Link>
            <button className="buttonStyle">Consulter Salon</button>
            <Link to="/admin/témoignages">
              <button className="buttonStyle">Consulter Temoignage</button>
            </Link>
            <Link to="/admin/atelier-A">
              <button className="buttonStyle">Les Ateliers Dégustation Coaching</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccueilAdmin;
