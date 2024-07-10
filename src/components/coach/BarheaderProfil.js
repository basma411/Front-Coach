import React, { useEffect, useState } from 'react';
import { GoPersonFill } from "react-icons/go";
import '../coach/css/barheader.css';
import { useDispatch, useSelector } from 'react-redux';
import { RiArrowDropDownLine } from "react-icons/ri";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import { getCoach } from '../../Redux/Slice/CoachSlice';
import { Link } from "react-router-dom";

const BarheaderProfil = () => {
    const [isListOpen, setIsListOpen] = useState(false);
    const { isAuth, coachdata } = useSelector((state) => state.coach);
    const navigator = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCoach());
    }, [dispatch, navigator]);

    const toggleList = () => {
        setIsListOpen(!isListOpen);
    };
const handlFAQ=()=>{
    navigator("/faq")


}
    const handleMenuItemClick = (option) => {
        console.log("Clicked on:", option);
        if (option === "Déconnexion") {
            localStorage.removeItem("isAuth");
            localStorage.removeItem("token");
            navigator("/coach/login");
        } else if (option === "Settings") {
            navigator(`/coach/setting/${coachdata._id}`);
        } else if (option === "Modifier Profil") {
            navigator(`/coach/edit/${coachdata._id}`);
        } else if (option === "Profil") {
            navigator('/coach/profil');
        }
        setIsListOpen(false);
    };

    return (
        <div className="barheaderC">
            <div className="barheader-Container">
                <GoPersonFill className="iconCom" />
                <h5 className='mocompte'>{coachdata.nom}</h5>
                <RiArrowDropDownLine onClick={toggleList} style={{ fontSize: '20px', color:'#e3d80a'}} />
                <Dropdown show={isListOpen} align="end" onClose={() => setIsListOpen(false)}>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleMenuItemClick("Profil")} className='selected'>Profil</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleMenuItemClick("Modifier Profil")} className='selected'>Modifier Profil</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleMenuItemClick("Settings")} className='selected'>Settings</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleMenuItemClick("Déconnexion")} className='selected'>Déconnexion</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                    <h5 className='faq' onClick={()=>handlFAQ()}>FAQ</h5>
            </div>
        </div>
    );
};

export default BarheaderProfil;
