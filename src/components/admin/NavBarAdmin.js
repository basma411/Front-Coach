import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../images/logo.jpg";
import { HiOutlineViewList } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./css/navbarAdmin.css"; 

const NavBarAdmin = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  
    const handleToggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  return (
<div className="NavbarAdmin">

  <div className="NavbarAdminContainer">

  <Navbar   style={{ display: "flex",width:'100%' ,justifyContent:'space-around' ,alignItems:'center'}} className="m-0 p-0 ">
      <Container style={{ display: "flex", justifyContent: "space-between",alignItems:'center' }} className="m-0 p-0 MENU-NAVBAR">
      
      <div style={{ display: "flex", alignItems: "center" }} className="NAVBAR-IMG">
      <img src={logo} alt="Logo" style={{ paddingLeft: "0" }} />
      <HiOutlineViewList className="icon-LIST" style={{ color: "gray" }} onClick={handleToggleMenu}  />
      </div>
      <div className={menuOpen ? 'nav-open' : 'nav-closed'}>
      <Nav className="me-auto MENU-NAVBAR">
          <Link to="/admin/Accueil" className="nav-linkAdmin">Accueil</Link>
            <Link to="/admin/article" className="nav-linkAdmin">Articles</Link>
            <Link to="/admin/Coachs" className="nav-linkAdmin">Coachs</Link>
            <Link to="/admin/Partenaires" className="nav-linkAdmin">Partenaires</Link>
            <Link to="/admin/Salon" className="nav-linkAdmin">Les Salon de coaching</Link>
            <Link to="/admin/Evenements" className="nav-linkAdmin">Evenements</Link>
            <Link to="/admin/videoCoching" className="nav-linkAdmin">VidéoCoching</Link>
            <Link to="/admin/Contact" className="nav-linkAdmin">Contact</Link>
            <Link to="/admin/Newsletter" className="nav-linkAdmin">Newsletter</Link>

          </Nav>
        </div>
      </Container>
    </Navbar>
  </div>
</div>
  );
};

export default NavBarAdmin;
