import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Spinner } from '@chakra-ui/react'
import { Form, Button } from 'react-bootstrap'
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid'

import { Context } from 'Context';
import Header from 'components/Header';
import * as ROUTES from 'constants/routes';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';
import * as CardApi from 'services/cardsApi'
import openPGP from 'services/openpgp'
import './styles.scss'

function PassBuy() {
  const { pass_id } = useParams();
  const navigate = useNavigate();
  const { cookies, walletState, connectWallet, buyPassCrypto } = useContext(Context);

  const [pass, setPass] = useState(undefined);
  const [focus, setFocus] = useState('');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    address: '',
    postal: '',
    city: '',
    district: '',
    country: '',
    phone: '',
    email: ''
  })

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrop = async () => {
      try {
        let response = await fetch(API.PASS_DETAIL.replace('$1', pass_id), OPTIONS.GET);
        let passData = await response.json();
        setPass(passData);
        response = await fetch(API.PASS_SET_PENDING, OPTIONS.POST_AUTH(
          { pass_id: pass_id }, cookies.access_token
        ))
        let pendingResult = await response.json();
      } catch (ex) {
        console.log(ex);
      }
      setLoading(false);
    }
    console.log('fetchDrop');
    fetchDrop();
  }, [])

  const formatDate = (date) => moment(date).format('MM/DD/YYYY HH:mm:ss')

  const makeCreateCardCall = async () => {
    const payload = {
      idempotencyKey: uuidv4(),
      expMonth: parseInt(cardInfo.expiry.substr(0, 2)),
      expYear: parseInt(`20${cardInfo.expiry.substr(2, 2)}`),
      keyId: '',
      encryptedData: '',
      billingDetails: {
        line1: cardInfo.address,
        line2: undefined,
        city: cardInfo.city,
        district: cardInfo.district,
        postalCode: cardInfo.postal,
        country: cardInfo.country,
        name: cardInfo.name,
      },
      metadata: {
        phoneNumber: cardInfo.phone,
        email: cardInfo.email,
        sessionId: 'xxx',
        ipAddress: '172.33.222.1',
      },
    }
    const publicKey = await CardApi.getPCIPublicKey()
    
    const cardDetails = {
      number: cardInfo.number.replace(/ /g,''),
      cvv: cardInfo.cvc,
    }
    
    const encryptedData = await openPGP.encrypt(cardDetails, publicKey)
    const { encryptedMessage, keyId } = encryptedData

    payload.keyId = keyId
    payload.encryptedData = encryptedMessage

    const card = await CardApi.createCard(payload)
    return card
  }

  const makeChargeCall = async (card_id) => {
    const amountDetail = {
      amount: pass.price,
      // amount: 75,
      currency: 'USD',
    }
    const sourceDetails = {
      id: card_id,
      type: 'card',
    }

    const payload = {
      idempotencyKey: uuidv4(),
      amount: amountDetail,
      verification: 'cvv',
      source: sourceDetails,
      description: '',
      channel: '',
      metadata: {
        phoneNumber: cardInfo.phone,
        email: cardInfo.email,
        sessionId: 'xxx',
        ipAddress: '172.33.222.1',
      },
    }

    try {
      const cardDetails = { cvv: cardInfo.cvc }
      const publicKey = await CardApi.getPCIPublicKey()
      const encryptedData = await openPGP.encrypt(cardDetails, publicKey)

      payload.encryptedData = encryptedData.encryptedMessage
      payload.keyId = encryptedData.keyId
      const payment = await CardApi.createPayment(payload)

      if (payment.data.source) {
        purchasePass();
      }
    } catch (err) {

    } finally {

    }
  }

  const purchasePass = async () => {
    let response = await fetch(API.PURCHASE_PASS, OPTIONS.POST_AUTH(
      { pass_id: pass_id }, cookies.access_token
    ))
    const result = await response.json();
    if (result == "success") {
      navigate(ROUTES.PROFILE, {replace: true});
    } else {
      response = await fetch(API.PASS_UNSET_PENDING, OPTIONS.POST_AUTH(
        { pass_id: pass_id }, cookies.access_token
      ))
      let pendingResult = await response.json();
      navigate(ROUTES.HOME, { replace: true })
    }
  }

  const handleBuy = async (e) => {
    e.preventDefault();
    // buyPassCrypto();
    const card = await makeCreateCardCall();
    if (card && card.id) {
      await makeChargeCall(card.id);
    }
  }

  const handleCryptoBuy = async (e) => {
    if (!pass) return;
    e.preventDefault();
    buyPassCrypto(pass.price);
  }
  
  return (
    <div className="buy-detail-container">
      <Header />
      <div className="tab-wrapper">
        {loading ? (
          <Spinner color="white" />
        ) : (
          <Tabs>
            <TabList>
              <Tab>Card</Tab>
              <Tab>Crypto</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div className="card-wrapper">
                  <Form className="input-wrapper">
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="tel"
                        name="number"
                        placeholder="Card Number"
                        onChange={(e) => setCardInfo(prev => ({...prev, number: e.target.value.trim()}))}
                        onFocus={(e) => setFocus(e.target.name)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="tel"
                        name="name"
                        placeholder="Name"
                        onChange={(e) => setCardInfo(prev => ({...prev, name: e.target.value}))}
                        onFocus={(e) => setFocus(e.target.name)} />
                    </Form.Group>

                    <Form.Group className="mb-3 split">
                      <Form.Control
                        type="tel"
                        name="expire"
                        placeholder="Expire"
                        maxLength={5}
                        onChange={(e) => setCardInfo(prev => ({...prev, expiry: e.target.value.replace('/', '')}))}
                        onFocus={(e) => setFocus(e.target.name)} />
                      <Form.Control
                        type="tel"
                        name="cvc"
                        placeholder="CVC"
                        maxLength={3}
                        onChange={(e) => setCardInfo(prev => ({...prev, cvc: e.target.value}))}
                        onFocus={(e) => setFocus(e.target.name)} />
                    </Form.Group>

                    <Form.Group className="mb-3 pt-3">
                      <Form.Control
                        type="text"
                        placeholder="Address"
                        onChange={(e) => setCardInfo(prev => ({...prev, address: e.target.value}))} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Postal Code"
                        onChange={(e) => setCardInfo(prev => ({...prev, postal: e.target.value}))} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="City"
                        onChange={(e) => setCardInfo(prev => ({...prev, city: e.target.value}))} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="District"
                        onChange={(e) => setCardInfo(prev => ({...prev, district: e.target.value}))} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Country Code"
                        onChange={(e) => setCardInfo(prev => ({...prev, country: e.target.value}))} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setCardInfo(prev => ({...prev, email: e.target.value}))} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="tel"
                        placeholder="Phone Number"
                        onChange={(e) => setCardInfo(prev => ({...prev, phone: e.target.value}))} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleBuy}>
                      Submit
                    </Button>
                  </Form>
                  <Cards
                    cvc={cardInfo.cvc}
                    expiry={cardInfo.expiry}
                    focused={focus}
                    name={cardInfo.name}
                    number={cardInfo.number}
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="card-wrapper">
                  {!walletState.provider ? (
                    <Button variant="primary" type="submit" onClick={() => connectWallet()}>
                      Connect Wallet
                    </Button>
                  ) : (
                    <Button variant="primary" type="submit" onClick={handleCryptoBuy}>
                      Pay Now
                    </Button>
                  )}
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </div>
    </div>
  )
}

export default PassBuy;