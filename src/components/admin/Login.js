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
          <h1>Connexion</h1>
          <label className="title">
            <h2>Nom d'utilisateur</h2>
          </label>
          <input type="text" placeholder="Entrer le nom d'utilisateur" ref={user} className="inputadmin" />

          <label className="title">
            <h3>Mot de passe</h3>
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
