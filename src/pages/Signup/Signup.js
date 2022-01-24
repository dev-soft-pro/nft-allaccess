import React, { useState, useContext } from 'react'
import './styles.scss'

import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from 'constants/routes';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';
import { Context } from 'Context'

import { Form } from 'react-bootstrap'

import GoogleIcon from 'assets/images/social/google.png'
import FacebookIcon from 'assets/images/social/facebook.png'
import AppleIcon from 'assets/images/social/apple.png'

function Signup() {
  const navigate = useNavigate();
  const { updateLoadingStatus, activateAuth } = useContext(Context);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleJoin = async () => {
    if (username == '' || email == '' || password == '' || !agreed) {
      return;
    }

    updateLoadingStatus(true);
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      const response = await fetch(API.REGISTER, OPTIONS.POST_FORM_DATA(formData));
      const data = await response.json();
      activateAuth(data);
      navigate(ROUTES.HOME, { replace: true });
    } catch (ex) {
      console.log(ex)
    }
    updateLoadingStatus(false);
  }

  return (
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
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

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
              <span>Sign up with Google</span>
            </div>
            <div className="social-button">
              <img src={FacebookIcon} alt='google' />
              <span>Sign up with Facebook</span>
            </div>
            <div className="social-button">
              <img src={AppleIcon} alt='apple' />
              <span>Sign up with Apple</span>
            </div>
            <Form.Group className="mb-3 confirm-check" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label={(
                <Form.Label htmlFor="formBasicCheckbox">
                  I agree to the <Link to="/" className="link">Terms of Service</Link> and acknowledge the <Link to="/" className="link">Privacy Policy</Link>.
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
  )
}

export default Signup;