import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCoach } from "../../Redux/Slice/CoachSlice";
import { NavBar } from "./NavBar";
import image from "../../images/big_image_2.jpg";
import "../coach/css/Profil.css";
import BarheaderProfil from "./BarheaderProfil";
import { FaEarthAfrica } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import { SiRss } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import { BiLogoLinkedin } from "react-icons/bi";
import { ImYoutube2 } from "react-icons/im";

const ProfilCoach = () => {
  const dispatch = useDispatch();
  const { isAuth, coachdata } = useSelector((state) => state.coach);
  const navigator = useNavigate();

  useEffect(() => {
    dispatch(getCoach());
  }, [dispatch]);

  // useEffect(() => {
  //   if (isAuth) navigator("/coach/profil")
  // }, [isAuth, navigator]);

  return (
    <>

      <div
        className="ImagePlatforme"
        style={{
          position: "relative",
          textAlign: "center",
          height: "300px",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <div style={{ paddingTop: "100px" }}>
          <h2>Voici votre compte</h2>
        </div>
      </div>

      <div className="profil-container">
        <div style={{ textAlign: "left" }} className="PROFIL_LEFT">
          <div className="Photo">
            <p>{coachdata.NomPrenom}</p>
            <img
              src={`http://localhost:8000/${coachdata.Photo}`}
              alt="Photo de profil"
              style={{
                width: "220px",
                height: "207px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>

          <div className="Contact">
            <div>
              <h1>Contact</h1>
            </div>
            <div className="information">
              <div>
                <FaEarthAfrica style={{ color: " rgb(255,205,51)" }} />
                <h3>Site web: {coachdata.Site}</h3>
              </div>
              <hr />
              <div>
                <MdEmail style={{ color: " rgb(255,205,51)" }} />

                <h3>E-mail: {coachdata.Email}</h3>
              </div>
              <hr />
              <div>
                <BsTelephoneFill style={{ color: " rgb(255,205,51)" }} />

                <h3>Tél: {coachdata.NumTel}</h3>
              </div>
              <hr />
              <div>
                <GiPositionMarker style={{ color: " rgb(255,205,51)" }} />

                <h3>Gouvernorat: {coachdata.Governorat}</h3>
              </div>
              <hr />

              <div>
                <SiRss style={{ color: " rgb(255,205,51)" }} />

                <h3>Réseaux sociaux:</h3>
              </div>
            </div>
            <div>
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

        <div style={{ textAlign: "right", width: "50%" }}>
          <div className="abonner">
            <p>
              Restez connecté(e) avec vos clients et activez l’accès à votre
              profil.
            </p>

            <button>Abonnement Annuel</button>
          </div>

          <h3 className="domaines-coaching-title titre">
            Domaines de Coaching
          </h3>

          <div className="domaines-intervention list">
            {coachdata.DomainesIntervention &&
              coachdata.DomainesIntervention.map((domaine, index) => (
                <h3 key={index}>{domaine}</h3>
              ))}
          </div>

          <h2 className="domaines-coaching-title titre">Brève Bio</h2>

          <div className="bio">
            <p>{coachdata.Bio}</p>
          </div>

          <h2 className="Méthodes de Coaching-title titre list">
            {" "}
            Méthodes de Coaching
          </h2>

          <div className="Méthodes-Coaching list">
            {coachdata.MethodesDeCoaching &&
              coachdata.MethodesDeCoaching.map((MethCoach, index) => (
                <h3 key={index}>{MethCoach}</h3>
              ))}
          </div>

          <h2 className="Type-de-Client-title titre list"> Type de Client</h2>

          <div className="Type-de-Client list">
            <h3>{coachdata.TypesDeClients}</h3>
          </div>

          <h2 className="Langues titre list">Langues</h2>

          <div className="Langues list">
            {coachdata.Langues &&
              coachdata.Langues.map((Lang, index) => (
                <h3 key={index}>{Lang}</h3>
              ))}
          </div>
          <h2 className="tarif titre list">Tarif préférentiel (réduction de 10% pour les clients de la plateforme)</h2>
          <div className="Tarif list">
          {coachdata.TarifPreferentiel ? <h3>oui</h3> : <h3>non</h3>}

          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilCoach;
