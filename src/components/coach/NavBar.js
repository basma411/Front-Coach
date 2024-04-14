import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../images/logo.jpg";
import { HiOutlineViewList } from "react-icons/hi";
import '../coach/css/login.css'
export const NavBar = () => {
  return (
<Navbar bg="light" data-bs-theme="light" style={{ display: 'flex', flexDirection: 'column'}}>
        <div style={{ width: '100%', backgroundColor: 'blue',height:'40px',padding_tob:'20x'}}>hello</div>
      <Container style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <img src={logo} alt="Logo" style={{ marginRight: "20px" }} />
          <HiOutlineViewList  style={{fontSize:"40px",color:"gray"}} />

        </div>
        <div>
          <Nav className="me-auto" >
            <Nav.Link href="#Accueil" className="nav-link-custom">Accueil</Nav.Link>
            <Nav.Link href="#Trouver un coach" className="nav-link-custom">Trouver un coach</Nav.Link>
            <Nav.Link href="#Espace Coach" className="nav-link-custom">Espace Coach</Nav.Link>
            <Nav.Link href="#Évènements" className="nav-link-custom">Évènements</Nav.Link>
            <Nav.Link href="#VidéoCoaching" className="nav-link-custom">VidéoCoaching</Nav.Link>
            <Nav.Link href="#Contact" className="nav-link-custom">Contact</Nav.Link>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
