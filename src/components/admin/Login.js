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
          <label>
            <h3>Nom d'utilisateur</h3>
          </label>
          <input type="text" placeholder="Entrer le nom d'utilisateur" ref={user} />

          <label>
            <h3>Mot de passe</h3>
          </label>
          <input type="password" placeholder="Entrer le mot de passe" ref={password} />

          <h3 href="#" className="mdpoublie">Mot de passe oublié ?</h3>
          <input 
            type="submit" 
            id="submit" 
            value="LOGIN"    
            onClick={() => {
              dispatch(login({ login: user.current.value, password: password.current.value }));
              navigator('/admin/Accueil');
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
