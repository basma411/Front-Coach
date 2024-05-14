import React from 'react';
import { useSelector } from 'react-redux';
import Barheader from './Barheader';
import BarheaderProfil from './BarheaderProfil';

const Header = () => {
  // Supposons que isAuth est un état dans votre Redux qui indique si l'utilisateur est authentifié ou non
  const { isAuth } = useSelector((state) => state.coach);

  return (
    <div>
      {isAuth ? <BarheaderProfil /> : <Barheader />}
    </div>
  );
}

export default Header;
