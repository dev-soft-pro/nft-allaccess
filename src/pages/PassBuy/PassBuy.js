import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './styles.scss'

import * as ROUTES from 'constants/routes';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';
import Header from 'components/Header';

import moment from 'moment';

import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import MaskInput from 'react-maskinput';

import { Form, Button } from 'react-bootstrap'

function PassBuy() {
  const { pass_id } = useParams();

  // const [drop, setDrop] = useState(undefined);
  const [pass, setPass] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    const fetchDrop = async () => {
      try {
        let response = await fetch(API.PASS_DETAIL.replace('$1', pass_id), OPTIONS.GET);
        let passData = await response.json();
        setPass(passData);
        setLoading(false);
        console.log(passData);
      } catch (ex) {
        console.log(ex);
      }
    }
    fetchDrop();
  }, [])

  const formatDate = (date) => moment(date).format('MM/DD/YYYY HH:mm:ss')
  
  return (
    <div className="pass-detail-container">
      <Header />
      {pass && (
        <div className="pass-info-container">
          
        </div>
      )}
      <div className="card-wrapper">
        <Cards
          cvc={cvc}
          expiry={expiry}
          focused={focus}
          name={name}
          number={number}
        />
        <Form className="input-wrapper">
          <Form.Group className="mb-3">
            <Form.Control
              type="tel"
              name="number"
              placeholder="Card Number"
              maxLength={16}
              onChange={(e) => setNumber(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="tel"
              name="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)} />
          </Form.Group>

          <Form.Group className="mb-3 split">
            <Form.Control
              type="tel"
              name="expire"
              placeholder="Expire"
              maxLength={4}
              onChange={(e) => setExpiry(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)} />
            <Form.Control
              type="tel"
              name="cvc"
              placeholder="CVC"
              maxLength={3}
              onChange={(e) => setCvc(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default PassBuy;