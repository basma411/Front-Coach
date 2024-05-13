import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/coach/Header'; 
import Accueil from './components/Acueil/Accueil';
import Login from './components/admin/Login';
import LoginCoch from './components/coach/LoginCoch';
import ProfilCoach from './components/coach/ProfilCoach';
import SettingProfil from './components/coach/SettingProfil';
import EditProfile from './components/coach/EditProfile';
import { NavBar } from './components/coach/NavBar';
import TrouverCoach from './components/TrouverCoach/TrouverCoach';
import EspaceCoach from './components/espaceCoach/EspaceCoach';
import Evenement from './components/Evenement/Evenement';
import Contact from './components/Contact/Contact';
import Vediocoach from './components/vedioCoach/Vediocoach';
import Coach from './components/Acueil/Coach';
import { setLoading } from './Redux/Slice/LodingSlice';
import loading from './images/loading.gif';
import NotFound from './components/coach/NotFound';
import Atelier_Degustation from './components/Acueil/Atelier_Degustation';
import FormAtelier from './components/Acueil/FormAtelier';
import Articles from './components/espaceCoach/Articles';
import AjoutArticle from './components/espaceCoach/AjoutArticle';
import Formulaire from './components/espaceCoach/Formulaire';

function App() {
  const isLoading = useSelector(state => state.loading.isLoading);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Simulation d'un chargement asynchrone initial (par exemple, une requête API)
    dispatch(setLoading(true));
    const delay = setTimeout(() => {
      dispatch(setLoading(false));
    }, 2000);

    // Nettoyage du timeout si le composant est démonté avant la fin du délai
    return () => clearTimeout(delay);
  }, [dispatch]);

  // Routes valides de l'application
  const validRoutes = [
    "/admin/login",
    "/admin/Accueil",
    "/coach/login",
    "/coach/profil",
    "/coach/setting/:id",
    "/coach/edit/:id",
    "/",
    "/Accueil",
    "/TrouverCoach",
    "/EspaceCoach",
    "/Evenement",
    "/Vedio",
    "/CoNtact",
    "/coach",
    "/atelier_degustation",
    "/FormAtelier",
    "/articles",
   "/ajouter_article",
   "/formulaire"
  ];

  // Vérifie si l'URL actuelle correspond à une route valide
  const isRouteValid = validRoutes.includes(location.pathname);

  return (
    <div className="App">
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <img src={loading} alt="Chargement..." />
        </div>
      ) : (
        <>
          {/* Afficher le Header et la NavBar si la route est valide */}
          {isRouteValid && (
            <>
              <Header />
              <NavBar />
            </>
          )}
          <Routes>
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/Accueil" element={<Accueil />} />
            <Route path="/coach/login" element={<LoginCoch />} />
            <Route path="/coach/profil" element={<ProfilCoach />} />
            <Route path="/coach/setting/:id" element={<SettingProfil />} />
            <Route path="/coach/edit/:id" element={<EditProfile />} />
            <Route path="/" element={<Accueil />} />
            <Route path="/Accueil" element={<Accueil />} />
            <Route path="/TrouverCoach" element={<TrouverCoach />} />
            <Route path="/EspaceCoach" element={<EspaceCoach />} />
            <Route path="/Evenement" element={<Evenement />} />
            <Route path="/Vedio" element={<Vediocoach />} />
            <Route path="/CoNtact" element={<Contact />} />
            <Route path="/coach" element={<Coach />} />
            {/* Route pour la page non trouvée */}
            <Route path="*" element={<NotFound />} />
            <Route path="/atelier_degustation" element={<Atelier_Degustation />} />
            <Route path="/formatelier" element={<FormAtelier />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/ajouter_article" element={<AjoutArticle />} />
            <Route path="/formulaire" element={<Formulaire />} />

          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
