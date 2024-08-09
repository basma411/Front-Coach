import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCoach } from "../../Redux/Slice/CoachSlice";
import image from "../../images/big_image_2.jpg";
import payer from "../../images/paymee-logo.png";

import "../coach/css/Profil.css";
import { FaEarthAfrica } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import { SiRss } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import { BiLogoLinkedin } from "react-icons/bi";
import { ImYoutube2 } from "react-icons/im";

const Abonnemment = () => {
  const dispatch = useDispatch();
  const { coachdata } = useSelector((state) => state.coach);

  useEffect(() => {
    dispatch(getCoach());
  }, [dispatch]);



  return (
    <>
      <div
        className="PlatformeProfilAbonner"  data-stellar-background-ratio="0.5"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div>
          <h2 className="AbonnerTitre">Voici votre compte</h2>
        </div>
      </div>

     <div className="PROFILAbonner">
     <div className="profil-container-Abonner">
        <div style={{ textAlign: "left" }} className="Abonner_LEFT">
        

          <div className="ContactAbonner">
            <div className="informationCOACH">
              <h1 className="ProfilContactAbonner">Contact</h1>
            </div>
            <div className="informationCOACH">
              <div className="infAbonner">
                <FaEarthAfrica style={{ color: " rgb(255,205,51)" }} />
                <h3 className="inf-Item-Abonner">Site web: {coachdata.site}</h3>
              </div>
              <hr />
              <div className="infAbonner">
                <MdEmail style={{ color: " rgb(255,205,51)" }} />
                <h3 className="inf-Item-Abonner">E-mail: {coachdata.email}</h3>
              </div>
              <hr />
              <div className="infAbonner">
                <BsTelephoneFill style={{ color: " rgb(255,205,51)" }} />
                <h3 className="inf-Item-Abonner">Tél: {coachdata.num}</h3>
              </div>
              <hr />
              <div className="infAbonner">
                <GiPositionMarker style={{ color: " rgb(255,205,51)" }} />
                <h3 className="inf-Item-Abonner">Gouvernorat: {coachdata.gouv}</h3>
              </div>
              <hr />
              <div className="infAbonner">
                <SiRss style={{ color: " rgb(255,205,51)" }} />
                <h3 className="inf-Item-Abonner">Réseaux sociaux:</h3>
              </div>
            </div>
            <div className="infAbonner">
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

        <div  className="Abonner_Right ">
          <div className="abonner">
            <p className="ProfilPayer">
            Plus que quelques clics pour activer votre abonnement annuel
            </p>
            <img  className="img-payer" src={payer } alt="Paiement"/>
            <button className="buttonPayer">Payer</button>
          </div>

       

      

       
        </div>
      </div>
     </div>
    </>
  );
};


export default Abonnemment