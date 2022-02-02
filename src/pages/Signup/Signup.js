import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { useToast } from '@chakra-ui/react'
import { Form } from 'react-bootstrap'

import * as ROUTES from 'constants/routes';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';
import { Context } from 'Context'
import Header from 'components/Header';

import GoogleIcon from 'assets/images/social/google.png'
import FacebookIcon from 'assets/images/social/facebook.png'
import AppleIcon from 'assets/images/social/apple.png'

import GoogleAuth from 'assets/google-auth.json'

import './styles.scss'
import Page from 'components/Page';

function Signup() {
  const navigate = useNavigate();
  const { updateLoadingStatus, activateAuth } = useContext(Context);
  const toast = useToast();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordV, setPasswordV] = useState('');
  const [agreed, setAgreed] = useState(false);

  const joinRequest = async (username, email, password) => {
    updateLoadingStatus(true);
     if (password !== passwordV) {
       toast({
         title: 'Passwords do not match',
         description: 'Please try again',
         status: 'error',
         duration: 5000,
         isClosable: true,
       });
       updateLoadingStatus(false);
       return;
     }
    

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('passwordV', passwordV);
      const response = await fetch(API.REGISTER, OPTIONS.POST_FORM_DATA(formData));
      const data = await response.json();
      if (response.status === 201) {
        activateAuth(data);
        navigate(ROUTES.HOME, { replace: true });
      } else {
        toast({
          position: 'top',
          title: 'Authentication Error',
          description: data.detail,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    } catch (ex) {
      console.log(ex)
    }
    updateLoadingStatus(false);
  }

  const handleJoin = async () => {
     if (username == undefined && email == undefined && password == undefined && passwordV == undefined && agreed == false) {
       toast({
         title: 'Please fill in all fields',
         description: 'Please try again',
         status: 'error',
         duration: 5000,
         isClosable: true,
       });
       return;
     }
    joinRequest(username, email, password, passwordV);
  }

  const responseGoogle = async (res) => {
    if (res) {
      const profile = res.profileObj
      joinRequest(profile.name, profile.email, profile.googleId)
    }
  }

  return (
    <Page checkLocation>
      <div className="signup-container">
        <div className="auth-panel-wrapper">
          <div className="auth-panel">
            <h2>Sign Up</h2>
            <p>Already have an account? <Link className="link" to={ROUTES.LOGIN}>Log in</Link></p>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPasswordv">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPasswordV(e.target.value)} />
              </Form.Group>
              
            </Form>
            <p>OR</p>
            <div className="button-wrapper">
              <GoogleLogin
                clientId={GoogleAuth.web.client_id}
                render={renderProps => (
                  <div className="social-button" onClick={renderProps.onClick}>
                    <img src={GoogleIcon} alt='google' />
                    <span>Sign up with Google</span>
                  </div>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
              
              <Form.Group className="mb-3 confirm-check" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label={(
                  <Form.Label htmlFor="formBasicCheckbox">
                    I agree to the <Link to="/" className="link"><strong>Terms of Service</strong></Link> and acknowledge the <Link to="/" className="link"><strong>Privacy Policy</strong></Link>.
                  </Form.Label>
                  )} 
                  onChange={(e) => setAgreed(e.target.checked) } />
              </Form.Group>
              <div className="continue-button" onClick={() => handleJoin()}>
                <span>Continue</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Signup;