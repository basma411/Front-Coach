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
import Videocoach from './components/videoCoach/Videocoach';
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
import VideoA from './components/admin/videoA/VideoA';
import NewsletterA from './components/admin/newsletter/NewsletterA';
import ContactA from './components/admin/contact/ContactA';
import ContactEmailA from './components/admin/contact/ContactEmailA';
import ArticleInvisible from './components/admin/article/ArticleInvisible';
import ArticleVisible from './components/admin/article/ArticleVisible';
import CoachVisib from './components/admin/coach_admin/CoachVisib';
import CoachInvisib from './components/admin/coach_admin/CoachInvisib';
import AjouterEvenement from './components/admin/evenementA/AjouterEvenement';
import ListeEvenement from './components/admin/evenementA/ListeEvenement';
import Ajoutervideo from './components/admin/videoA/Ajoutervideo';
import Listevideo from './components/admin/videoA/Listevideo';
import EditArticle from './components/admin/article/EditArticle';
import ViewArticle from './components/admin/article/ViewArticle';
import EditCoach from './components/admin/coach_admin/EditCoach';
import ViewCoachInvisible from './components/admin/coach_admin/ViewCoachInvisible';
import ViewCoachVisible from './components/admin/coach_admin/ViewCoachVisible';
import AjouterPartenaires from './components/admin/partenairesAdmin/AjouterPartenaires';
import EditEvenement from './components/admin/evenementA/EditEvenement';
import Editvideo from './components/admin/videoA/Editvideo';
import EditSlider from './components/admin/slides/EditSlider';
import EditBiblio from './components/admin/biblio/EditBiblio';
import EditDomaine from './components/admin/Domaine/EditDomaine';
import AjouterDomaine from './components/admin/Domaine/AjouterDomaine';
import EditInterface from './components/admin/interface/EditInterface';
import ViewTemoignage from './components/admin/temoignage/ViewTemoignage';
import EditTemoignage from './components/admin/temoignage/EditTemoignage';
import AjouterEvtt from './components/Evenement/AjouterEvtt';
import ContactCoach from './components/ContactC/ContactCoach.js';
import WorkshopList from './components/admin/AtelierA/Workshop.js';
import WorkshopPage from './components/admin/AtelierA/WorkshopPage.js';
import AddAtelier from './components/admin/AtelierA/AddAtelier.js';
import AddPublication from './components/admin/AtelierA/AddPublication.js';
import ListCoach from './components/admin/AtelierA/ListCoach.js';
import ListProf from './components/admin/AtelierA/ListProf.js';
import BaseCoach from './components/admin/BaseCoach/BaseCoach.js';
import Faq from './components/admin/FAQ/Faq.js';
import EmailingCoach from './components/admin/BaseCoach/EmailingCoach.js';
import AddFaq from './components/admin/FAQ/AddFaq.js';
import ListFaq from './components/admin/FAQ/ListFaq.js';
import Temoignages from './components/TrouverCoach/Temoignages.js';
import ListePub from './components/Acueil/ListePub.js';
import Faq_Coach from './components/Acueil/Faq_Coach.js';
import EmailingNewsletter from './components/admin/newsletter/EmailingNewsletter.js';
import './index.css';

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
    "/video",
    "/CoNtact",
    "/coach",
    "/atelier_degustation",
    "/FormAtelier",
    "/articles",
    "/ajouter_article",
    "/formulaire",
    "/Evenement/ajouter",
    "/Contact-coach",
    "/Temoignages",
    "/atelier_degustation/:id",
    "/faq"
  ];

  // Vérifie si l'URL actuelle correspond à une route valide
  const isRouteValid = validRoutes.includes(location.pathname) || location.pathname.startsWith("/atelier_degustation");

  return (
    <div className="App"  style={{ fontFamily: '"Rubik", arial, sans-serif', fontWeight: 300 }}>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <img src={loading} alt="Chargement..." />
        </div>
      ) : (
        <>
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
            <Route path="/admin/edit_slider/:id" element={<EditSlider />} />
            <Route path="/admin/consulter_biblio" element={<ConsulterBiblio />} />
            <Route path="/admin/consulter_biblio/Edit/:id" element={<EditBiblio />} />
            <Route path="/admin/consulter_domaine" element={<ConsulterDomaine />} />
            <Route path="/admin/consulter_domaine/edit/:id" element={<EditDomaine />} />
            <Route path="/admin/consulter_domaine/ajouter" element={<AjouterDomaine />} />
            <Route path="/admin/consulter_interface" element={<ConsulterInterface />} />
            <Route path="/admin/consulter_interface/edit/:id" element={<EditInterface />} />
            <Route path="/admin/témoignages" element={<Temoignage />} />
            <Route path="/admin/témoignages/invisible" element={<TémignageInvisible />} />
            <Route path="/admin/témoignages/visible" element={<TémoignageVisible />} />
            <Route path="/admin/témoignages/invisible/view/:id" element={<ViewTemoignage />} />
            <Route path="/admin/témoignages/invisible/edit/:id" element={<EditTemoignage />} />
            <Route path="/admin/atelier-A" element={<WorkshopList />} />
            <Route path="/admin/atelier-A/:id" element={<WorkshopPage />} />
            <Route path="/admin/atelier-A/ajouter" element={<AddAtelier />} />
            <Route path="/admin/atelier-A/:id/add-PUB" element={<AddPublication />} />
            <Route path="/admin/atelier-A/:id/List-PROF" element={<ListProf />} />
            <Route path="/admin/atelier-A/:id/List-COACH" element={<ListCoach />} />
            <Route path="/admin/article" element={<Article />} />
            <Route path="/admin/article/invisible" element={<ArticleInvisible />} />
            <Route path="/admin/article/visible" element={<ArticleVisible />} />
            <Route path="/admin/article/visible/edit/:id" element={<EditArticle />} />
            <Route path="/admin/article/invisible/view/:id" element={<ViewArticle />} />
            <Route path="/admin/Coachs" element={<CoachA />} />
            <Route path="/admin/Coachs/invisible" element={<CoachInvisib />} />
            <Route path="/admin/Coachs/invisible/view/:id" element={<ViewCoachInvisible />} />
            <Route path="/admin/Coachs/visible" element={<CoachVisib />} />
            <Route path="/admin/Coachs/visible/edit/:id" element={<EditCoach />} />
            <Route path="/admin/Coachs/visible/view/:id" element={<ViewCoachVisible />} />
            <Route path="/admin/Partenaires" element={<PartenairesA />} />
            <Route path="/admin/Partenaires/ajouter" element={<AjouterPartenaires />} />
            <Route path="/admin/Evenements" element={<EvenementA />} />
            <Route path="/admin/Evenements/AjouterEvenement" element={<AjouterEvenement />} />
            <Route path="/admin/Evenements/Liste" element={<ListeEvenement />} />
            <Route path="/admin/Evenements/liste/edit/:id" element={<EditEvenement />} />
            <Route path="/admin/videoCoching" element={<VideoA />} />
            <Route path="/admin/videoCoching/ajouter" element={<Ajoutervideo />} />
            <Route path="/admin/videoCoching/edit/:id" element={<Editvideo />} />
            <Route path="/admin/videoCoching/liste" element={<Listevideo />} />
            <Route path="/admin/Contact" element={<ContactA />} />
            <Route path="/admin/Contact/Email/:id" element={<ContactEmailA />} />
            <Route path="/admin/Newsletter" element={<NewsletterA />} />
            <Route path="/admin/Newsletter/emailing" element={<EmailingNewsletter />} />

            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/Accueil" element={<AccueilAdmin />} />
            <Route path="/admin/Base-Coach" element={<BaseCoach />} />
            <Route path="/admin/EmailingCoach" element={<EmailingCoach />} />
            <Route path="/admin/FAQ" element={<Faq />} />
            <Route path="/admin/add-faq" element={<AddFaq />} />
            <Route path="/admin/list-faq" element={<ListFaq />} />
            <Route path="/coach/login" element={<LoginCoch />} />
            <Route path="/coach/profil" element={<ProfilCoach />} />
            <Route path="/coach/setting/:id" element={<SettingProfil />} />
            <Route path="/coach/edit/:id" element={<EditProfile />} />
            <Route path="/faq" element={<Faq_Coach />} />

            <Route path="/" element={<Accueil />} />
            <Route path="/Accueil" element={<Accueil />} />
            <Route path="/TrouverCoach" element={<TrouverCoach />} />
            <Route path="/Temoignages" element={<Temoignages />} />
            <Route path="/EspaceCoach" element={<EspaceCoach />} />
            <Route path="/Evenement" element={<Evenement />} />
            <Route path="/Evenement/ajouter" element={<AjouterEvtt />} />
            <Route path="/video" element={<Videocoach />} />
            <Route path="/Contact-coach" element={<ContactCoach />} />
            <Route path="/coach" element={<Coach />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/atelier_degustation" element={<Atelier_Degustation />} />
            <Route path="/atelier_degustation/:id" element={<ListePub />} />
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
