import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { GoogleLogin } from 'react-google-login';
import { useToast } from '@chakra-ui/react'
import './styles.scss'

import * as ROUTES from 'constants/routes';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';
import { Context } from 'Context'

import GoogleIcon from 'assets/images/social/google.png'
import FacebookIcon from 'assets/images/social/facebook.png'
import AppleIcon from 'assets/images/social/apple.png'

import GoogleAuth from 'assets/google-auth.json'
import Header from 'components/Header';
import Page from 'components/Page';

function Login() {
  const navigate = useNavigate();
  const {
    cookies,
    activateAuth,
    updateLoadingStatus
  } = useContext(Context);
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginRequest = async (email, password) => {
    updateLoadingStatus(true);
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      const response = await fetch(API.LOGIN, OPTIONS.POST_FORM_DATA(formData));
      const data = await response.json();
      if (response.status === 200) {
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

  const handleLogin = async () => {
    if (email == '' || password == '') {
      return;
    }
    loginRequest(email, password)
  }

  const responseGoogle = (res) => {
    if (res) {
      const profile = res.profileObj
      loginRequest(profile.email, profile.googleId)
    }
  }

  return (
    <Page checkLocation>
      <div className="auth-container">
        <div className="auth-panel-wrapper">
          <div className="auth-panel">
            <h2>Log In</h2>
            <p>Don't have an account? <Link className="link" to={ROUTES.REGISTER}>Sign Up</Link></p>
            <Form>
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
            </Form>
            <p>OR</p>
            <div className="button-wrapper">
              <GoogleLogin
                clientId={GoogleAuth.web.client_id}
                render={renderProps => (
                  <div className="social-button" onClick={renderProps.onClick}>
                    <img src={GoogleIcon} alt='google' />
                    <span>Sign in with Google</span>
                  </div>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
              <div className="continue-button" onClick={() => handleLogin()}>
                <span>Continue</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Login;