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
          <Link to="/admin/Accueil" className="nav-link">Accueil</Link>
            <Link to="/admin/article" className="nav-link">Articles</Link>
            <Link to="/admin/Coachs" className="nav-link">Coachs</Link>
            <Link to="/admin/Partenaires" className="nav-link">Partenaires</Link>
            <Link to="/admin/Salon" className="nav-link">Les Salon de coaching</Link>
            <Link to="/admin/Evenements" className="nav-link">Evenements</Link>
            <Link to="/admin/videoCoching" className="nav-link">VidéoCoching</Link>
            <Link to="/admin/Contact" className="nav-link">Contact</Link>
            <Link to="/admin/Newsletter" className="nav-link">Newsletter</Link>

          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBarAdmin;
