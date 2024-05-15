import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Barheader from './Barheader';
import BarheaderProfil from './BarheaderProfil';

const Header = () => {
  const { isAuth } = useSelector((state) => state.coach);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate('/coach/login');
  //   }
  //   console.log("isAuth value changed:", isAuth); // Afficher la nouvelle valeur de isAuth dans la console
  // }, [isAuth, navigate]);
 
  return (
    <div>
      {isAuth ? <BarheaderProfil /> : <Barheader />}
    </div>
  );
}

export default Header;
