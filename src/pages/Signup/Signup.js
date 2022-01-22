import React from 'react'
import './styles.scss'

import { Link } from "react-router-dom";
import * as ROUTES from 'constants/routes';

import { Form } from 'react-bootstrap'

import GoogleIcon from 'assets/images/social/google.svg'
import FacebookIcon from 'assets/images/social/facebook.svg'
import AppleIcon from 'assets/images/social/apple.svg'

function Signup() {
  return (
    <div className="signup-container">
      <div className="auth-panel-wrapper">
        <div className="auth-panel">
          <h2>Sign Up</h2>
          <p>Already have an account? <Link className="link" to={ROUTES.LOGIN}>Log in</Link></p>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
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
              <Form.Check type="checkbox" label={(
                <label for="formBasicCheckbox">
                  I agree to the <Link to="/" className="link">Terms of Service</Link> and acknowledge the <Link to="/" className="link">Privacy Policy</Link>.
                </label>
              )} />
            </Form.Group>
            <div className="continue-button">
              <span>Continue</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;