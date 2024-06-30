import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../images/logo.jpg";
import { HiOutlineViewList } from "react-icons/hi";
import { Link } from 'react-router-dom'; 
import '../coach/css/navbar.css';

export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <div className="navbarcontainer">
        <Navbar className="m-0 p-0 ">
          <Container style={{ display: "flex",width:'100%' ,justifyContent:'space-around' }} className="me auto p-0 navbarContainerStyle" >
            <div style={{ display: "flex", alignItems: "center" }} className="test">
              <img src={logo} alt="Logo" style={{ paddingLeft: "0" }} />
              <HiOutlineViewList className="icon-navbar" style={{ color: "gray" }} onClick={handleToggleMenu} />
            </div>
            <div className={menuOpen ? 'nav-open' : 'nav-closed'}>
              <Nav className="ms menu-Navba">
                <Link to="/Accueil" className="nav-link-coach">Accueil</Link>
                <Link to="/TrouverCoach" className="nav-link-coach">Trouver un coach</Link>
                <Link to="/EspaceCoach" className="nav-link-coach">Espace Coach</Link>
                <Link to="/Evenement" className="nav-link-coach">Évènements</Link>
                <Link to="/video" className="nav-link-coach">VidéoCoaching</Link>
                <Link to="/Contact-coach" className="nav-link-coach">Contact</Link>
              </Nav>
            </div>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};