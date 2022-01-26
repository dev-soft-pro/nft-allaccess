import React, { useContext, useEffect } from 'react'
import './styles.scss'

import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as ROUTES from 'constants/routes';

import { Context } from 'Context'

import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
} from 'react-bootstrap'

import Logo from 'assets/images/logo.png'

function Header() {
  const { cookies, removeAuth } = useContext(Context);
  const navigate = useNavigate();
  console.log(cookies)

  const handleLogout = () => {
    removeAuth();
    navigate(ROUTES.HOME, { replace: true });
  }

  return (
    <Navbar expand="lg" className="header-wrapper" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => navigate(ROUTES.HOME)}>
          <img src={Logo} alt="Logo" height={50} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav.Link className="header-menu" href="/marketplace">
            Marketplace
          </Nav.Link>
          <Nav.Link className="header-menu" href="/community">
            Community
          </Nav.Link>
          {cookies.isAuth == 'true' && cookies.userinfo ? (
            <NavDropdown title={cookies.userinfo.username} id="profile-dropdown" className="header-menu">
              <NavDropdown.Item onClick={() => navigate(ROUTES.PROFILE)}>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => handleLogout()}>Log Out</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Nav.Link className="header-menu" href="/join">
                Sign Up
              </Nav.Link>
              <Nav.Link className="header-menu" href="/login">
                Log In
              </Nav.Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;