import React from 'react'
import './styles.scss'

import { Link as RouterLink } from "react-router-dom";
import * as ROUTES from 'constants/routes';

import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
} from 'react-bootstrap'

import Logo from 'assets/images/logo.png'

function Header() {
  return (
    <Navbar expand="lg" className="header-wrapper">
      <Container>
        <Navbar.Brand href="#home">
          <img src={Logo} alt="Logo" height={50} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav.Link className="header-menu">
            <RouterLink className="link" to="/marketplace">Marketplace</RouterLink>
          </Nav.Link>
          <Nav.Link className="header-menu">
            <RouterLink className="link" to="/community">Community</RouterLink>
          </Nav.Link>
          <Nav.Link className="header-menu">
            <RouterLink className="link" to="/join">Sign Up</RouterLink>
          </Nav.Link>
          <Nav.Link className="header-menu">
            <RouterLink className="link" to="/login">Log In</RouterLink>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;