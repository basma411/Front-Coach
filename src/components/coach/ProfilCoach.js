import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCoach } from "../../Redux/Slice/CoachSlice";
import image from "../../images/big_image_2.jpg";
import "../coach/css/Profil.css";
import { FaEarthAfrica } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import { SiRss } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import { BiLogoLinkedin } from "react-icons/bi";
import { ImYoutube2 } from "react-icons/im";
import { getImageUrl } from "../..";

const ProfilCoach = () => {
  const dispatch = useDispatch();
  const { isAuth, coachdata } = useSelector((state) => state.coach);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCoach());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) navigate("/coach/profil");
    else navigate("/coach/login");
  }, [isAuth, navigate]);

  return (
    <>
      <div
        className="PlatformeProfil site-hero site-sm-hero overlay"  data-stellar-background-ratio="0.5"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div>
          <h2 className="ProfilTitre">Voici votre compte</h2>
        </div>
      </div>

     <div className="PROFIL">
     <div className="profil-container">
        <div style={{ textAlign: "left" }} className="PROFIL_LEFT">
          <div className="Photo">
            <p className="NomProfil">{coachdata.nom}</p>
            <img
              src={getImageUrl(coachdata.image)}
              alt="Photo de profil"
              className="PhotoProfil"
            />
          </div>

          <div className="Contact">
            <div className="informationCOACH">
              <h1 className="ProfilContact">Contact</h1>
            </div>
            <div className="informationCOACH">
              <div className="information">
                <FaEarthAfrica style={{ color: " rgb(255,205,51)" }} />
                <h3 className="information-Item">Site web: {coachdata.site}</h3>
              </div>
              <hr />
              <div className="information">
                <MdEmail style={{ color: " rgb(255,205,51)" }} />
                <h3 className="information-Item">E-mail: {coachdata.email}</h3>
              </div>
              <hr />
              <div className="information">
                <BsTelephoneFill style={{ color: " rgb(255,205,51)" }} />
                <h3 className="information-Item">Tél: {coachdata.num}</h3>
              </div>
              <hr />
              <div className="information">
                <GiPositionMarker style={{ color: " rgb(255,205,51)" }} />
                <h3 className="information-Item">Gouvernorat: {coachdata.gouv}</h3>
              </div>
              <hr />
              <div className="information">
                <SiRss style={{ color: " rgb(255,205,51)" }} />
                <h3 className="information-Item">Réseaux sociaux:</h3>
              </div>
            </div>
            <div className="information">
              <FaFacebookF
                style={{
                  color: "rgb(255,205,51)",
                  marginRight: "20px",
                  fontSize: "20px",
                }}
              />
              <BiLogoLinkedin
                style={{
                  color: "rgb(255,205,51)",
                  marginRight: "20px",
                  fontSize: "20px",
                }}
              />
              <ImYoutube2
                style={{
                  color: "rgb(255,205,51)",
                  marginRight: "20px",
                  fontSize: "30px",
                }}
              />
            </div>
          </div>
        </div>

        <div  className="PROFIL_Right ">
          <div className="abonner">
            <p className="ProfilAccès">
              Restez connecté(e) avec vos clients et activez l’accès à votre
              profil.
            </p>
            <button className="buttonAccès">Abonnement Annuel</button>
          </div>

          <h3 className="domaines-coaching-title titre">Domaines de Coaching</h3>
          <div className="domaines-intervention list">
            {coachdata.domain &&
              coachdata.domain.map((domaine, index) => (
                <h3 className="ProfilDomaine" key={index}>
                  {domaine}
                </h3>
              ))}
          </div>

          <h2 className="domaines-coaching-title titre">Brève Bio</h2>
          <div className="bio">
            <p className="bioCoach">{coachdata.bio}</p>
          </div>

          <h2 className="Méthodes de Coaching-title titre list">Méthodes de Coaching</h2>
          <div className="Méthodes-Coaching list">
            {coachdata.method &&
              coachdata.method.map((MethCoach, index) => (
                <h3 className="ProfilMethode" key={index}>
                  {MethCoach}
                </h3>
              ))}
          </div>

          <h2 className="Type-de-Client-title titre list">Type de Client</h2>
          <div className="Type-de-Client list">
            <h3 className="ProfilType">{coachdata.type_client}</h3>
          </div>

          <h2 className="Langues titre list">Langues</h2>
          <div className="Langues list">
            {coachdata.langue &&
              coachdata.langue.map((Lang, index) => (
                <h3 className="ProfilLangues" key={index}>
                  {Lang}
                </h3>
              ))}
          </div>

          <h2 className="tarif titre list">
            Tarif préférentiel (réduction de 10% pour les clients de la plateforme)
          </h2>
          <div className="Tarif list">
            {coachdata.tarif ? (
              <h3 className="ProfilTarif">oui</h3>
            ) : (
              <h3 className="ProfilTarif">non</h3>
            )}
          </div>
        </div>
      </div>
     </div>
    </>
  );
};

export default ProfilCoach;
