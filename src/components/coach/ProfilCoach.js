import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCoach } from '../../Redux/Slice/CoachSlice';
import { NavBar } from './NavBar';
import image from "../../images/big_image_2.jpg";
import '../coach/css/Profil.css'
import BarheaderProfil from './BarheaderProfil';
const ProfilCoach = () => {
    const dispatch = useDispatch();
    const { isAuth, coachdata } = useSelector((state) => state.coach);
    const navigator = useNavigate();

    useEffect(() => {
        dispatch(getCoach());
    }, [dispatch]);

    useEffect(() => {
        if (!isAuth) navigator('/coach/login');
    }, [isAuth, navigator]);

    return (
        <>
            <BarheaderProfil/>

            <NavBar />
            <div
                className="ImagePlatforme"
                style={{
                    position: "relative",
                    textAlign: "center",
                    height: "300px",
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    overflow: "hidden",
                }}
            >
                <div style={{ paddingTop: "100px" }}>
                    <h2>Voici votre compte</h2>
                </div>
            </div>

            <div className='container'>




                <div style={{ textAlign: "left" }}>
                    <div className='Photo'>
                        <p>{coachdata.NomPrenom}</p>
                        <img src={`http://localhost:8000/${coachdata.Photo}`} alt="Photo de profil" style={{ width: "200px", height: "200px", borderRadius: "50%", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }} />
                    </div>
                    <div>
                        <h1>Contact</h1>
                        <h3>Site web: {coachdata.Site}</h3>
                        <h3>E-mail: {coachdata.Email}</h3>
                        <h3>Tél: {coachdata.NumTel}</h3>
                        <h3>Gouvernorat: {coachdata.Governorat}</h3>
                        <h3>Réseaux sociaux:</h3>
                    </div>
                </div>



















                <div style={{ textAlign: "right" }}>
                    <p>Restez connecté(e) avec vos clients et activez l’accès à votre profil.</p>
                    <button style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Abonnement Annuel</button>
                    <h3>Domaines de Coaching</h3>
                    {/* <div>
                        {coachdata.DomainesIntervention.map((domaine, index) => (
                            <h3 key={index}>{domaine}</h3>
                        ))}
                    </div> */}
                    <h2>Brève Bio</h2>
                    <p>{coachdata.Bio}</p>
                </div>
            </div>
        </>
    )
}

export default ProfilCoach;
