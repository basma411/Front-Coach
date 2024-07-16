import React, { useRef } from "react";
import './css/style.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


import { login } from '../../Redux/Slice/AdminSlice'

const Login = () => {
  const user = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  return (
    <div className="Login">
      <div className="containe">
        <form>
          <h1 className="Loginconnection">Connexion</h1>
          <label className="logintitle">
            Nom d'utilisateur
          </label>
          <input type="text" placeholder="Entrer le nom d'utilisateur" ref={user} className="inputadmin" />

          <label className="logintitle">
            Mot de passe
          </label>
          <input type="password" placeholder="Entrer le mot de passe" ref={password} className="inputadmin" />

          <h2 href="#" className="mdpoublie">Mot de passe oublié ?</h2>
          <input 
            type="submit" 
            value="LOGIN" 
            className="loginAdmin"   
            onClick={() => {
              dispatch(login({ nom_utilisateur: user.current.value, mot_de_passe: password.current.value }));
              navigator('/admin/Accueil');
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
