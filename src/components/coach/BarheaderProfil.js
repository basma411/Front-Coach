import React, { useState } from 'react';
import { GoPersonFill } from "react-icons/go";
import '../coach/css/barheader.css';
import { useSelector } from 'react-redux';
import { RiArrowDropDownLine } from "react-icons/ri";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

const BarheaderProfil = () => {
    const [isListOpen, setIsListOpen] = useState(false);
    const { coachdata } = useSelector((state) => state.coach);
    const navigator=useNavigate()

    const toggleList = () => {
        setIsListOpen(!isListOpen);
    };

    const handleMenuItemClick = (option) => {
        // Implement your logic for each menu item here
        console.log("Clicked on:", option);
        if (option === "Déconnexion") {

            navigator('/coach/login'); // Remplacez 'LoginPage' par le nom de la page de connexion dans votre application
        }
        if (option === "Settings") {
            navigator('/coach/setting'); // Remplacez 'LoginPage' par le nom de la page de connexion dans votre application
        }
        if (option === "Modifier Profil") {
            navigator('/coach/edit'); // Remplacez 'LoginPage' par le nom de la page de connexion dans votre application
        }
        if (option === "Profil") {
            navigator('/coach/profil'); // Remplacez 'LoginPage' par le nom de la page de connexion dans votre application
        }
        // Close the dropdown menu after clicking on an option
        setIsListOpen(false);
    };

    return (
        <div className="barheader">
            <GoPersonFill className="iconCompte" />
            <h5>{coachdata.NomPrenom}</h5>
            <RiArrowDropDownLine onClick={toggleList} style={{fontSize:'40px'}} />

            <Dropdown show={isListOpen} align="end" onClose={() => setIsListOpen(false)}>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleMenuItemClick("Profil")}>Profil</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleMenuItemClick("Modifier Profil")}>Modifier Profil</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleMenuItemClick("Settings")}>Settings</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleMenuItemClick("Déconnexion")}>Déconnexion</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <h5>FAQ</h5>
        </div>
    );
};

export default BarheaderProfil;
