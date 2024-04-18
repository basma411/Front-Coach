import React, { useRef } from 'react';
import './css/Setting.css';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../Redux/Slice/CoachSlice';
import { useNavigate } from 'react-router-dom';

const Setting = () => {
    const { coachdata } = useSelector((state) => state.coach);
    const oldPassword = useRef();
    const newPassword = useRef();
    const Email = useRef();
    const dispatch = useDispatch();
    const navigator = useNavigate(); // Correctement initialisé en tant que navigateur
    const handleSubmit = (e) => {
        e.preventDefault();
        const emailValue = Email.current.value;
        const oldPasswordValue = oldPassword.current.value;
        const newPasswordValue = newPassword.current.value;

        // Dispatchez l'action updatePassword avec les données du formulaire
        dispatch(updatePassword({ newEmail: emailValue, oldPassword: oldPasswordValue, newPassword: newPasswordValue }));
        
        // Utilisez navigator() pour naviguer vers la nouvelle page
        navigator('/coach/profil');
    }

    return (
        <div className='containerr'>
            <div className='Profil'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="Email">Email</label><br />
                    <input type="text" id="nom" name="email" defaultValue={coachdata.Email} ref={Email} /><br />

                    <label htmlFor="oldPassword">Ancien mot de passe</label><br />
                    <input type="password" id="oldPassword" name="oldPassword" ref={oldPassword} /><br />

                    <label htmlFor="newPassword">Nouveau mot de passe</label><br />
                    <input type="password" id="newPassword" name="newPassword" ref={newPassword} /><br />

                    <div className='UpdatePasword'>
                        <button type="submit">Modifier</button>
                        <h3>Annuler</h3>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Setting;
