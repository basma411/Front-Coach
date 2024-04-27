import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../images/logo.jpg";
import { HiOutlineViewList } from "react-icons/hi";
import { Link } from 'react-router-dom'; // Import the Link component
import '../coach/css/navbar.css';

export const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg" data-bs-theme="light" style={{ display: 'flex', flexDirection: 'column', margin: '80px' }} className="m-0 p-0">
      <Container style={{ display: "flex", justifyContent: "space-between" }} className="m-0 p-0">
        <div>
          <img src={logo} alt="Logo" style={{ paddingLeft: "100px" }} />
          <HiOutlineViewList className="icon-LIST" />
        </div>
        <div>
          <Nav className="me-auto">
            {/* Use Link instead of Nav.Link for routing */}
            <Link to="/Accueil" className="nav-link-custom">Accueil</Link>
            <Link to="/TrouverCoach" className="nav-link-custom">Trouver un coach</Link>
            <Link to="/EspaceCoach" className="nav-link-custom">Espace Coach</Link>
            <Link to="/Evenement" className="nav-link-custom">Évènements</Link>
            <Link to="/Vedio" className="nav-link-custom">VidéoCoaching</Link>
            <Link to="/Coatact" className="nav-link-custom">Contact</Link>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
