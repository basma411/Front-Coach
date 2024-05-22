import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Redux/Slice/CoachSlice";
import image from "../../images/big_image_2.jpg";
import Newsletter from "./Newsletter";
import Footer from "./Footer";
import './css/login.css'
const LoginCoch = () => {
  const { isAuth } = useSelector((state) => state.coach);

  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    if (isAuth) navigator("/coach/profil"); 
    else{
      navigator("/coach/login"); 
    }
  }, [isAuth, navigator]);

  const handleLoginFormSubmit = (e) => {
    e.preventDefault(); // Empêcher le formulaire de se soumettre normalement

    // Dispatch de l'action de connexion avec les informations d'identification de l'utilisateur
    dispatch(login({ email: email.current.value, pwd: password.current.value }));
  };

  return (
    <>
      <div
        className="ImagePlatforme"
        style={{
          height: "300px",
          position: "relative",
          textAlign: "center",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
        }}
      >
        <div style={{ paddingTop: "40px" }}>
          <h2>
            Bienvenue sur votre
            <br /> plateforme
            <br /> MonCoach.tn
          </h2>
        </div>
      </div>
      <div className="containerLogin">
        <form className="FormLogin" onSubmit={handleLoginFormSubmit}>
          <label className="labelField">Connectez-vous:</label>
          <div>
          <label className="labelField">Login:</label>

            <input type="email" name="email" ref={email} className="inputField" />
          </div>
          <div>
          <label className="labelField ">Password:</label>

            <input type="password" name="password" ref={password} className="inputField" />
          </div>
          <label className="labelField ">Mot de passe oublié?</label>

          <button type="submit" className="Connecter">Connecter</button>
        </form>
      </div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default LoginCoch;
