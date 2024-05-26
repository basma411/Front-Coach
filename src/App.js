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
import AccueilAdmin from './components/admin/AccueilAdmin';
import ConsulterIcon from './components/admin/icon/ConsulterIcon';
import Edit from './components/admin/icon/Edit';
import AjouterSlider from './components/admin/slides/AjouterSlider';
import Sliders from './components/admin/slides/Sliders';
import ConsulterBiblio from './components/admin/biblio/ConsulterBiblio';
import ConsulterDomaine from './components/admin/Domaine/ConsulterDomaine';
import ConsulterInterface from './components/admin/interface/ConsulterInterface';
import Temoignage from './components/admin/temoignage/Temoignage';
import TémignageInvisible from './components/admin/temoignage/TémignageInvisible';
import TémoignageVisible from './components/admin/temoignage/TémoignageVisible';
import Article from './components/admin/article/Article';
import CoachA from './components/admin/coach_admin/CoachA';
import PartenairesA from './components/admin/partenairesAdmin/PartenairesA';
import EvenementA from './components/admin/evenementA/EvenementA';
import VedioA from './components/admin/vedioA/VedioA';
import NewsletterA from './components/admin/newsletter/NewsletterA';
import ContactA from './components/admin/contact/ContactA';
import ContactEmailA from './components/admin/contact/ContactEmailA';
import ArticleInvisible from './components/admin/article/ArticleInvisible';
import ArticleVisible from './components/admin/article/ArticleVisible';
import CoachVisib from './components/admin/coach_admin/CoachVisib';
import CoachInvisib from './components/admin/coach_admin/CoachInvisib';

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
    "/coach/login",
    "/coach/profil",
    
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
          <Route path="/admin/consulter_icon" element={<ConsulterIcon />} />
          <Route path="/admin/icon/edit/:id" element={<Edit />} />

          <Route path="/admin/editer_slider" element={<Sliders />} />
          <Route path="/admin/ajouter_slider" element={<AjouterSlider />} />
          <Route path="/admin/consulter_biblio" element={<ConsulterBiblio />} />
          <Route path="/admin/consulter_domaine" element={<ConsulterDomaine />} />
          <Route path="/admin/consulter_interface" element={<ConsulterInterface />} />
          <Route path="/admin/témoignages" element={<Temoignage />} />
          <Route path="/admin/témoignages/invisible" element={<TémignageInvisible />} />
          <Route path="/admin/témoignages/visible" element={<TémoignageVisible />} />
          <Route path="/admin/article" element={<Article />} />
          <Route path="/admin/article/invisible" element={<ArticleInvisible />} />
          <Route path="/admin/article/visible" element={<ArticleVisible />} />

          <Route path="/admin/Coachs" element={<CoachA />} />
          <Route path="/admin/Coachs/invisible" element={<CoachInvisib />} />

          <Route path="/admin/Coachs/visible" element={<CoachVisib />} />

          <Route path="/admin/Partenaires" element={<PartenairesA />} />

          {/* <Route path="/admin/Salon" element={<Article />} /> */}
          <Route path="/admin/Evenements" element={<EvenementA />} />
          <Route path="/admin/VedioCoching" element={<VedioA />} />
          <Route path="/admin/Contact" element={<ContactA />} />
                    <Route path="/admin/Contact/Email/:id" element={<ContactEmailA />} />

          <Route path="/admin/Newsletter" element={<NewsletterA />} />

            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/Accueil" element={<AccueilAdmin />} />
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
            {/* <Route path="/CoNnact" element={<Contact />} /> */}
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
