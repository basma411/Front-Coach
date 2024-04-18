import React, { useRef, useState } from "react";
import { NavBar } from "./NavBar";
import image from "../../images/big_image_2.jpg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Redux/Slice/CoachSlice";
import Barheader from "./Barheader";
import '../coach/css/login.css'
import Newsletter from "./Newsletter";
import Footer from "./Footer";

const LoginCoch = () => {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <>
    <Barheader/>
      <NavBar />
      <div
        className="ImagePlatforme"
        style={{
          height:'300px',
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

      <form  className="Form-Login">
          <h5>Connectez-vous:
</h5>
          <div>
            <input type="email" id="email" name="email"  ref={email}/>
          </div>
          <div>
            <input type="password" id="password" name="password" ref={password} />
          </div>
          <label >Mot de passe oublié?</label>

          <button type="submit"   onClick={() => {
              dispatch(login({ Email: email.current.value, Password: password.current.value }));
              navigator('/coach/profil');
            }}>Connecter</button>
        </form>

      </div>
        <Newsletter/>
        <Footer/>
    </>
  );
};

export default LoginCoch;