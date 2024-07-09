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
<div className="NavbarAdmin">

  <div className="NavbarAdminContainer">

  <Navbar   style={{ display: "flex",width:'100%' ,justifyContent:'space-around' ,alignItems:'center'}} className="m-0 p-0 ">
      <Container style={{ display: "flex", justifyContent: "space-between",alignItems:'center' }} className="m-0 p-0">
      
      <div style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} alt="Logo" style={{ paddingLeft: "0" }} />
      <HiOutlineViewList className="icon-LIST" style={{ color: "gray" }}  />
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
  </div>
</div>
  );
};

export default NavBarAdmin;
