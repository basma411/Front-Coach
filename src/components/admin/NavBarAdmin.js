import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../images/logo.jpg";
import { HiOutlineViewList } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./css/navbarAdmin.css"; 

const NavBarAdmin = () => {
  return (
    <Navbar bg="light" expand="lg" data-bs-theme="light" style={{ display: 'flex', flexDirection: 'column', margin: '80px' }} className="m-0 p-0">
      <Container style={{ display: "flex", justifyContent: "space-between" }} className="m-0 p-0">
        <div>
          <img src={logo} alt="Logo" style={{ padding: "0px" }} />
          <HiOutlineViewList className="icon-LIST" />
        </div>
        <div>
          <Nav className="me-auto">
          <Link to="/AccueilAdmin" className="nav-link-custom">Accueil</Link>
            <Link to="/Article" className="nav-link-custom">Articles</Link>
            <Link to="/Coachs" className="nav-link-custom">Coachs</Link>
            <Link to="/Partenaires" className="nav-link-custom">Partenaires</Link>
            <Link to="/Salon" className="nav-link-custom">Les Salon de coaching</Link>
            <Link to="/Evenements" className="nav-link-custom">Evenements</Link>
            <Link to="/VedioCoching" className="nav-link-custom">VedioCoching</Link>
            <Link to="/Contact" className="nav-link-custom">Contact</Link>
            <Link to="/Newsletter" className="nav-link-custom">Newsletter</Link>

          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBarAdmin;
