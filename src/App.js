import React, { useState } from 'react';
import Accueil from './components/Acueil/Accueil';
import Login from './components/admin/Login';
import { Route, Routes } from 'react-router-dom';
import LoginCoch from './components/coach/LoginCoch';
import ProfilCoach from './components/coach/ProfilCoach';
import SettingProfil from './components/coach/SettingProfil';
import EditProfile from './components/coach/EditProfile';
import Barheader from './components/coach/Barheader';
import BarheaderProfil from './components/coach/BarheaderProfil'; // Importez le composant BarheaderProfil
import { useSelector } from 'react-redux';
import TrouverCoach from './components/TrouverCoach';
import EspaceCoach from './components/EspaceCoach';
import Evenement from './components/Evenement';
import Contact from './components/Contact';
import Vediocoach from './components/Vediocoach';
import { NavBar } from './components/coach/NavBar';
import Acueil from './components/Acueil/Accueil';

function App() {
  // Définissez un état pour suivre l'état de connexion de l'utilisateur
  const { isAuth } = useSelector((state) => state.coach);

  return (
    <div className="App">
      {isAuth ? <BarheaderProfil /> : <Barheader />}
      <Routes>
        <Route path="/admin/login" element={<> <Login /></>} />
        <Route path="/admin/Accueil" element={<><Acueil /></>} />

        <Route path="/coach/login" element={<><LoginCoch /></>} />
        <Route path="/coach/profil" element={<><ProfilCoach /></>} />
        <Route path="/coach/setting/:id" element={<><SettingProfil /></>} />
        <Route path="/coach/edit/:id" element={<><EditProfile /></>} />


      </Routes>
      
      <NavBar /> {/* Incluez le NavBar en haut de votre application */}
      <Routes>
        {/* Définissez les routes avec les composants correspondants */}
        <Route path="/" element={<Accueil />} />

        <Route path="/Accueil" element={<Accueil />} />
        <Route path="/TrouverCoach" element={<TrouverCoach />} />
        <Route path="/EspaceCoach" element={<EspaceCoach />} />
        <Route path="/Evenement" element={<Evenement />} />
        <Route path="/Vedio" element={<Vediocoach />} />
        <Route path="/Coatact" element={<Contact />} />
      </Routes>
   
    </div>
  );
}

export default App;
