import React from 'react'
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
} from 'react-bootstrap'

import Logo from 'assets/images/logo.png'

import './styles.scss'

function Header() {
  return (
    <Navbar expand="lg" className="header-wrapper">
      <Container>
        <Navbar.Brand href="#home">
          <img src={Logo} alt="Logo" height={50} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav.Link className="header-menu">Marketplace</Nav.Link>
          <Nav.Link className="header-menu">Community</Nav.Link>
          <Nav.Link className="header-menu">Sign Up</Nav.Link>
          <Nav.Link className="header-menu">Log In</Nav.Link>
          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Sign Up</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;