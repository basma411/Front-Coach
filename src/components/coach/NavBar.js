import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../images/logo.jpg";
import { HiOutlineViewList } from "react-icons/hi";
import { Link } from 'react-router-dom'; 
import '../coach/css/navbar.css';

export const NavBar = () => {
  
  return (
    <Navbar   style={{ display: 'flex', flexDirection: 'column', margin: '80px',backgroundColor:'#fff' }} className="m-0 p-0">
      <Container style={{ display: "flex", justifyContent: "space-between" }} className="m-0 p-0">
        <div>
          <img src={logo} alt="Logo" style={{ paddingLeft: "100px" }} />
          <HiOutlineViewList className="icon-LIST" />
        </div>
        <div>
          <Nav className="me-auto">
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
  );
};
