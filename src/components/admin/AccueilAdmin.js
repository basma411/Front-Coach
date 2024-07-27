import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

  const handleNavigation = (path) => {
    navigator(path);
  };

  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <OverlayA />
      <div className="PlatformeAdmin">
        <div className="containerPlatforme">
          <div className="left">
            <button className="buttonStyle" onClick={() => handleNavigation('/admin/consulter_icon')}>Consulter Icones</button>
            <button className="buttonStyle" onClick={() => handleNavigation('/admin/editer_slider')}>Consulter Slider</button>
            <button className="buttonStyle" onClick={() => handleNavigation('/admin/plume_coachs')}>Consulter La Plume des Coachs</button>
            <button className="buttonStyle" onClick={() => handleNavigation('/admin/consulter_biblio')}>Consulter Biblio</button>
            <button className="buttonStyle" onClick={() => handleNavigation('/admin/consulter_domaine')}>Consulter Domaines</button>
          </div>
          <div className="rigth">
            <button className="buttonStyle" onClick={() => handleNavigation('/admin/consulter_interface')}>Consulter Interface</button>
            <button className="buttonStyle" onClick={() => handleNavigation('/admin/consulter_salon')}>Consulter Salon</button>
            <button className="buttonStyle" onClick={() => handleNavigation('/admin/témoignages')}>Consulter Temoignage</button>
            <button className="buttonStyle" onClick={() => handleNavigation('/admin/atelier-A')}>Les Ateliers Dégustation Coaching</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccueilAdmin;
