import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.scss'

import { Link } from "react-router-dom";
import * as ROUTES from 'constants/routes';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';
import { Context } from 'Context'

import { Form } from 'react-bootstrap'

import GoogleIcon from 'assets/images/social/google.png'
import FacebookIcon from 'assets/images/social/facebook.png'
import AppleIcon from 'assets/images/social/apple.png'

function Login() {
  const navigate = useNavigate();
  const {
    cookies,
    activateAuth,
    updateLoadingStatus
  } = useContext(Context);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email == '' || password == '') {
      return;
    }
    
    updateLoadingStatus(true);
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      const response = await fetch(API.LOGIN, OPTIONS.POST_FORM_DATA(formData));
      const data = await response.json();
      activateAuth(data);
      navigate(ROUTES.HOME, { replace: true });
    } catch (ex) {
      console.log(ex)
    }
    updateLoadingStatus(false);
  }

  return (
    <div className="auth-container">
      <div className="auth-panel-wrapper">
        <div className="auth-panel">
          <h2>Sign In</h2>
          <p>Don't have an account? <Link className="link" to={ROUTES.REGISTER}>Sign Up</Link></p>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
          </Form>
          <p>OR</p>
          <div className="button-wrapper">
            <div className="social-button">
              <img src={GoogleIcon} alt='google' />
              <span>Sign in with Google</span>
            </div>
            <div className="social-button">
              <img src={FacebookIcon} alt='google' />
              <span>Sign in with Facebook</span>
            </div>
            <div className="social-button">
              <img src={AppleIcon} alt='apple' />
              <span>Sign in with Apple</span>
            </div>
            <div className="continue-button" onClick={() => handleLogin()}>
              <span>Continue</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;