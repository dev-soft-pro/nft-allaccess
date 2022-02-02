
import Page from 'components/Page';
import React from 'react'
import './styles.scss'
import { useToast } from '@chakra-ui/react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from 'constants/routes';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';
import { Context } from 'Context'


function Submit() {
    const navigate = useNavigate();
    const { updateLoadingStatus, activateAuth } = useContext(Context);
    const toast = useToast();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [details , setDetails] = useState('');


    if (name == undefined && email == undefined && subject == undefined && details == undefined) {
    toast({
        title: 'Please fill in all fields',
        description: 'Please try again',
        status: 'error',
        duration: 5000,
        isClosable: true,
        });
        return;
    }

    //ADD YOUR API CALL HERE



}


function Contact() {
  return (
    <Page>
        <div className="contact-container">
        
            <div className="contact-panel">
                <h2>Contact Us</h2>
               
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        type="text"
                        onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                        type="email"
                        onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicSubject">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                        type="text"
                        onChange={(e) => setSubject(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDetails" >
                        <Form.Label>Details (Optional)</Form.Label>
                        <Form.Control
                        className="details-box"
                        type="text"
                        onChange={(e) => setDetails(e.target.value)} />
                    </Form.Group>
                    
                </Form>

                <img src="https://www.google.com/recaptcha/intro/images/hero-recaptcha-demo.gif" alt="reCaptcha" className="reCaptcha" />

                <div className="continue-button" onClick={() => submit()}>
                    <span>Continue</span>
                </div>
            
            </div>
        </div>
    </Page>
  )
}

export default Contact;

