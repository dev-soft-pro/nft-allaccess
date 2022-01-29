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

import FacebookIco from 'assets/images/social/facebook.png'
import InstagramIco from 'assets/images/social/instagram.png'
import TwitterIco from 'assets/images/social/twitter.png'
import DiscordIco from 'assets/images/social/discord.png'
import EmptyProfile from 'assets/images/profile-empty-tiny.png'

let styletag = "width:300px;height:50px; fill:#DC9000;";

function Header() {
  const { cookies, removeAuth } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuth();
    navigate(ROUTES.HOME, { replace: true });
  }

  return (
    <Navbar expand="lg" className="header-wrapper" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => navigate(ROUTES.HOME)}>
          <div>
            <svg className="logo_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1032.03 250.97">
                <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1_copy" data-name="Layer 1 copy">
                <g id="Layer_2_copy" data-name="Layer 2 copy">
                <path className="cls-1" d="M26.29,223.7q0,6.24-3.05,9.3t-9.88,3.06H9v14.46H.63V211.4H13.36q7,0,10,3.06T26.29,223.7Zm-8.42,0a7.91,7.91,0,0,0-1.06-4.59c-.71-1-1.95-1.47-3.73-1.47H9v12.13h4.1c1.78,0,3-.49,3.73-1.47A8,8,0,0,0,17.87,223.7Z"/>
                <path className="cls-1" d="M55.83,234.81v15.71H47.42V211.4H60.28q7,0,9.88,2.78t2.91,8.9a14.51,14.51,0,0,1-1.3,6.52,8.3,8.3,0,0,1-4.24,3.91l7,17H65.82l-5.95-15.71Zm4.38-6.23c1.69,0,2.85-.46,3.49-1.39a9.35,9.35,0,0,0,0-8.19c-.61-.91-1.79-1.36-3.52-1.36H55.83v10.94Z"/>
                <path className="cls-1" d="M104.32,227.5h11v6.24h-11v10.54h12.73v6.24H96V211.4h21.07v6.29H104.32Z"/>
                <path className="cls-1" d="M172,250.52h-8.41v-22.9l-6,15.3h-4.52l-6-15.13v22.73h-8.41V211.4h8.41L155.35,232l8.28-20.64H172Z"/>
                <path className="cls-1" d="M203.5,211.4v39.12h-8.34V211.4Z"/>
                <path className="cls-1" d="M228.3,245.87a9.67,9.67,0,0,1-1.68-5.61V211.4H235v28.69a4.78,4.78,0,0,0,1.1,3.48,4.51,4.51,0,0,0,3.35,1.11q4.46,0,4.45-4.59V211.4h8.41v28.86a9.86,9.86,0,0,1-1.64,5.61,10.71,10.71,0,0,1-4.58,3.77,15.94,15.94,0,0,1-6.64,1.33,15.66,15.66,0,0,1-6.6-1.33A11,11,0,0,1,228.3,245.87Z"/>
                <path className="cls-1" d="M308.5,250.52h-8.42v-22.9l-6,15.3h-4.51l-5.95-15.13v22.73h-8.42V211.4h8.42L291.8,232l8.28-20.64h8.42Z"/>
                <path className="cls-1" d="M387.09,250.52h-8.42l-9.85-20.86v20.86h-8.41V211.4h8.41l9.85,21.77V211.4h8.42Z"/>
                <path className="cls-1" d="M418.34,227.67h11V234h-11v16.56h-8.41V211.4H431v6.29H418.34Z"/>
                <path className="cls-1" d="M466.36,217.69v32.83H458V217.69H449.8V211.4h24.7v6.29Z"/>
                <path className="cls-1" d="M523.53,239.75V222.12q0-5.56,3.77-8.42t9.92-2.86a15,15,0,0,1,9.51,2.83q3.62,2.84,3.62,8.62v1.19h-8.41v-1.14a5.23,5.23,0,0,0-1.34-3.94,5,5,0,0,0-3.59-1.27,4.59,4.59,0,0,0-3.86,1.53,7.36,7.36,0,0,0-1.2,4.59V239q0,5.73,5.06,5.73a4.91,4.91,0,0,0,3.59-1.31,5.13,5.13,0,0,0,1.34-3.85v-1h8.34v1.08q0,5.67-3.79,8.53a15.76,15.76,0,0,1-9.75,2.86q-6.09,0-9.65-2.86T523.53,239.75Z"/>
                <path className="cls-1" d="M572.65,239.75V222.12q0-5.56,3.76-8.42t9.92-2.86q6,0,9.54,2.86t3.59,8.42v17.63a9.83,9.83,0,0,1-3.8,8.33,15.73,15.73,0,0,1-9.81,2.89q-6.09,0-9.65-2.86T572.65,239.75Zm18.4-.8v-15.7a7.25,7.25,0,0,0-1.23-4.56,4.45,4.45,0,0,0-3.7-1.56,4.59,4.59,0,0,0-3.86,1.53,7.36,7.36,0,0,0-1.2,4.59V239q0,5.73,5.06,5.73a4.51,4.51,0,0,0,3.66-1.5A6.36,6.36,0,0,0,591.05,239Z"/>
                <path className="cls-1" d="M630.44,211.4v32.88H643.1v6.24H622V211.4Z"/>
                <path className="cls-1" d="M672.64,211.4v32.88H685.3v6.24H664.23V211.4Z"/>
                <path className="cls-1" d="M714.78,227.5h10.94v6.24H714.78v10.54H727.5v6.24H706.43V211.4H727.5v6.29H714.78Z"/>
                <path className="cls-1" d="M748.91,239.75V222.12q0-5.56,3.76-8.42t9.92-2.86a15,15,0,0,1,9.51,2.83q3.61,2.84,3.62,8.62v1.19h-8.41v-1.14A5.23,5.23,0,0,0,766,218.4a5,5,0,0,0-3.59-1.27,4.6,4.6,0,0,0-3.86,1.53,7.36,7.36,0,0,0-1.2,4.59V239q0,5.73,5.06,5.73a4.89,4.89,0,0,0,3.59-1.31,5.13,5.13,0,0,0,1.34-3.85v-1h8.35v1.08q0,5.67-3.8,8.53a15.74,15.74,0,0,1-9.75,2.86q-6.09,0-9.65-2.86T748.91,239.75Z"/>
                <path className="cls-1" d="M812.24,217.69v32.83H803.9V217.69h-8.21V211.4h24.7v6.29Z"/>
                <path className="cls-1" d="M849.25,211.4v39.12H840.9V211.4Z"/>
                <path className="cls-1" d="M898.09,239.18q0,6-3,8.64t-10,2.7h-12.8V211.4h12.8q6.9,0,9.85,2.53t2.94,8a9.88,9.88,0,0,1-1.16,4.93,7.41,7.41,0,0,1-4,3.12,7.08,7.08,0,0,1,4.17,3.34A13.22,13.22,0,0,1,898.09,239.18Zm-17.38-12.07h3.56c2,0,3.33-.37,4.1-1.11a4.78,4.78,0,0,0,1.17-3.6,4.86,4.86,0,0,0-1.17-3.69c-.77-.71-2.14-1.07-4.1-1.07h-3.56Zm9,11.56a6,6,0,0,0-1.26-4.25,5.71,5.71,0,0,0-4.21-1.31h-3.49v11.17h3.49c2.1,0,3.53-.42,4.31-1.27S889.67,240.71,889.67,238.67Z"/>
                <path className="cls-1" d="M929.07,211.4v32.88h12.65v6.24H920.65V211.4Z"/><path className="cls-1" d="M971.2,227.5h10.94v6.24H971.2v10.54h12.72v6.24H962.85V211.4h21.07v6.29H971.2Z"/><path className="cls-1" d="M1004,239.35H1012a6.52,6.52,0,0,0,1.41,4.25,4.81,4.81,0,0,0,3.72,1.36,4.61,4.61,0,0,0,3.6-1.25,5.8,5.8,0,0,0,1.12-4,5,5,0,0,0-1.26-3.6,11.57,11.57,0,0,0-4.28-2.47l-3.21-1.19a15,15,0,0,1-6.6-4.19,10.33,10.33,0,0,1-2-6.69,9.83,9.83,0,0,1,3.45-7.88q3.47-3,9.34-2.95t9,2.92q3.18,2.91,3.38,8.42h-7.73a6.64,6.64,0,0,0-1.12-4,4.26,4.26,0,0,0-3.53-1.33q-4.58,0-4.58,4.48a4.59,4.59,0,0,0,1.13,3.26,9.66,9.66,0,0,0,3.79,2.18l3.08,1.13a16.2,16.2,0,0,1,7.15,4.54,11.11,11.11,0,0,1,2.22,7.25q0,5.44-3.42,8.39t-9.71,2.95q-6.23,0-9.51-3T1004,239.35Z"/>
                <path className="cls-2 red_fill" d="M45.9,146.58l-8.24,34.64H0L52.07,2.84H87.38l51.78,178.38H101.5l-8.24-34.64ZM69.73,45.76,52.66,118.14H86.79Z"/>
                <path className="cls-2 red_fill" d="M177.69,2.84V152.78h54.43v28.44H141.51V2.84Z"/>
                <path className="cls-2 red_fill" d="M277.89,2.84V152.78h54.43v28.44H241.71V2.84Z"/><path className="cls-1" d="M369.21,146.58,361,181.22H323.31L375.39,2.84h35.3l51.78,178.38H424.81l-8.23-34.64ZM393,45.76,376,118.14H410.1Z"/><path className="cls-1" d="M461.88,132.1V51.7q0-25.33,16.18-38.39t42.66-13q25.31,0,40.89,12.92t15.6,39.3v5.43H541V52.74q0-12.15-5.74-18T519.84,29q-11.47,0-16.63,7t-5.14,20.94v71.61q0,26.11,21.77,26.11,9.7,0,15.44-5.94T541,131.07v-4.66h35.89v4.91q0,25.86-16.33,38.91t-41.92,13.06q-26.19,0-41.48-13.06T461.88,132.1Z"/><path className="cls-1" d="M587.79,132.1V51.7q0-25.33,16.18-38.39t42.66-13q25.3,0,40.9,12.92t15.59,39.3v5.43H666.93V52.74q0-12.15-5.73-18T645.75,29q-11.47,0-16.62,7T624,56.87v71.61q0,26.11,21.77,26.11,9.71,0,15.45-5.94t5.73-17.58v-4.66h35.9v4.91q0,25.86-16.33,38.91t-41.93,13.06q-26.18,0-41.48-13.06T587.79,132.1Z"/><path className="cls-1" d="M750.78,76.26h47.07V104.7H750.78v48.08H805.5v28.44H714.88V2.84H805.5v28.7H750.78Z"/><path className="cls-1" d="M806.67,130.29H840.8q.59,13.19,6,19.39t16,6.2q10.59,0,15.44-5.68t4.86-18.1q0-10.34-5.45-16.41t-18.38-11.25L845.51,99q-19.71-7.76-28.39-19.13t-8.68-30.5q0-22.5,14.85-35.94T863.45,0q25,0,38.69,13.31T916.71,51.7H883.46q-.3-12.15-4.85-18.22T863.45,27.4q-19.71,0-19.71,20.43,0,9.3,4.86,14.86t16.32,10l13.24,5.17q21.2,8.28,30.75,20.68t9.56,33.09q0,24.82-14.71,38.26T862,183.29q-26.78,0-40.89-13.7T806.67,130.29Z"/><path className="cls-1" d="M920.23,130.29h34.13q.58,13.19,6,19.39t16,6.2q10.61,0,15.45-5.68t4.86-18.1q0-10.34-5.45-16.41T972.9,104.44L959.07,99q-19.71-7.76-28.39-19.13T922,49.38q0-22.5,14.85-35.94T977,0q25,0,38.69,13.31t14.56,38.39H997q-.3-12.15-4.85-18.22T977,27.4q-19.71,0-19.71,20.43,0,9.3,4.86,14.86t16.32,10l13.24,5.17q21.19,8.28,30.75,20.68t9.56,33.09q0,24.82-14.71,38.26t-41.78,13.45q-26.77,0-40.89-13.7T920.23,130.29Z"/></g></g></g></svg>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <div className="navbar-left">
            <Nav.Link className="header-menu" href="/marketplace">
              Marketplace
            </Nav.Link>
            <Nav.Link className="header-menu" href="/community">
              Community
            </Nav.Link>
            <Nav.Link className="header-menu" href="/about-us">
              About Us
            </Nav.Link>
          </div>
          <div className="navbar-right">
          {cookies.isAuth == 'true' && cookies.userinfo ? (
            <>
            <div className="user-info">
              <img src={EmptyProfile} alt="Profile Image" id="profile-tiny"/>
              <NavDropdown title={cookies.userinfo.username} id="profile-dropdown" className="header-menu">
                <NavDropdown.Item onClick={() => navigate(ROUTES.PROFILE)}>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleLogout()}>Log Out</NavDropdown.Item>
                
              </NavDropdown>
              <div className="md-1">
                <p>Points: {cookies.userinfo.points}</p>
              </div>
              
            </div>
              <div className="social-icons">
                <a target="_blank" href="#"><img src={FacebookIco} alt="Facebook"/></a>
                <a target="_blank" href="#"><img src={InstagramIco} alt="Instagram"/></a>
                <a target="_blank" href="#"><img src={TwitterIco} alt="Twitter"/></a>
                <a target="_blank" href="#"><img src={DiscordIco} alt="Discord"/></a>
              </div>
            </>
          ) : (
            <>
              <Nav.Link className="header-menu" href="/join">
                Sign Up
              </Nav.Link>
              <Nav.Link className="header-menu" href="/login    ">
                Log In
              </Nav.Link>
              <div className="social-icons">
                <a target="_blank" href="#"><img src={FacebookIco} alt="Facebook"/></a>
                <a target="_blank" href="#"><img src={InstagramIco} alt="Instagram"/></a>
                <a target="_blank" href="#"><img src={TwitterIco} alt="Twitter"/></a>
                <a target="_blank" href="#"><img src={DiscordIco} alt="Discord"/></a>
              </div>
            </>
            
          )}
          </div>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  )
}

export default Header;