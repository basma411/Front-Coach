import React, { useEffect, useRef } from 'react';
import './css/Setting.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCoach, updatePassword } from '../../Redux/Slice/CoachSlice';
import { useNavigate, useParams } from 'react-router-dom';
import BarheaderProfil from './BarheaderProfil';
import { NavBar } from './NavBar';

const Setting = () => {
    const { isAuth, coachdata } = useSelector((state) => state.coach);
    const oldPassword = useRef();
    const newPassword = useRef();
    const Email = useRef();
    const dispatch = useDispatch();
    const navigator = useNavigate(); 
    const { id } = useParams();
    useEffect(() => {
        dispatch(getCoach());
        
      }, [dispatch]);
      useEffect(() => {
        if (!isAuth) navigator("/coach/setting/:id");
      }, [isAuth, navigator]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const emailValue = Email.current.value;
        const oldPasswordValue = oldPassword.current.value;
        const newPasswordValue = newPassword.current.value;

        // Dispatchez l'action updatePassword avec les données du formulaire
        dispatch(updatePassword({ _id:id,newEmail: emailValue, oldPassword: oldPasswordValue, newPassword: newPasswordValue }));
        
        // Utilisez navigator() pour naviguer vers la nouvelle page
        navigator('/coach/profil');
    }

    return (
       <>
       <BarheaderProfil/>
       <NavBar/>
       <div className='containerr'>
            <div className='Profil'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="Email" className='Labelstyle'>Email</label><br />
                    <input type="text"  name="email" defaultValue={coachdata.Email} ref={Email} className='inputStyle'/><br />

                    <label htmlFor="oldPassword" className='Labelstyle'>Ancien mot de passe</label><br />
                    <input type="password"  name="oldPassword" ref={oldPassword}  className='inputStyle'/><br />

                    <label htmlFor="newPassword" className='Labelstyle'>Nouveau mot de passe</label><br />
                    <input type="password"  name="newPassword" ref={newPassword} className='inputStyle'/><br />

                    <div className='UpdatePasword'>
                        <button type="submit" className='Setting'>Modifier</button>
                        <h3>Annuler</h3>
                    </div>
                </form>
            </div>
        </div>
       
       </>
    );
};

export default Setting;
