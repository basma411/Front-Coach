import './App.css';
import Accueil from './components/admin/Accueil';
import Login from './components/admin/Login';
import { Route, Routes } from 'react-router-dom';
import LoginCoch from './components/coach/LoginCoch';
import { NavBar } from './components/coach/NavBar';
import ProfilCoach from './components/coach/ProfilCoach';

function App() {
  return (
    <div className="App">
    
     <Routes>

      <Route path="/admin/login" element={<> <Login/></>}/>
      <Route path="/admin/Accueil" element={<><Accueil/></>}/>
 
      <Route path="/coach/login" element={<><LoginCoch/></>}/>
      <Route path="/coach/profil" element={<><ProfilCoach/></>}/>

     </Routes>

    </div>
  );
}

export default App;
