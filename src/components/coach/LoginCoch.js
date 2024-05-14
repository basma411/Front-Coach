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
    if (isAuth) navigator("/coach/profil"); // Rediriger vers la page de profil si l'utilisateur est authentifié
  }, [isAuth, navigator]);

  const handleLoginFormSubmit = (e) => {
    e.preventDefault(); // Empêcher le formulaire de se soumettre normalement

    // Dispatch de l'action de connexion avec les informations d'identification de l'utilisateur
    dispatch(login({ Email: email.current.value, Password: password.current.value }));
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
      <div className="container-Form">
        <form className="Form-Login" onSubmit={handleLoginFormSubmit}>
          <h5>Connectez-vous:</h5>
          <div>
            <input type="email" name="email" ref={email} />
          </div>
          <div>
            <input type="password" name="password" ref={password} />
          </div>
          <label>Mot de passe oublié?</label>

          <button type="submit">Connecter</button>
        </form>
      </div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default LoginCoch;
