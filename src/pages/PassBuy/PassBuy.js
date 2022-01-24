import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Spinner, useToast } from '@chakra-ui/react'
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
  const { cookies, walletState, connectWallet } = useContext(Context);
  const toast = useToast();

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

  const refreshToken = async () => {
    const response = await fetch(API.REFRESH, OPTIONS.POST({
      refresh: cookies.refresh_token
    }))
    const data = await response.json();
    return data.access;
  }

  const fetchDrop = async (id) => {
    try {
      const response = await fetch(API.PASS_DETAIL.replace('$1', id), OPTIONS.GET);
      if (response.status != 200) {
        navigate(ROUTES.HOME, { replace: true });
      }
      const passData = await response.json();
      return passData;
    } catch (err) {
      console.log(err);
      navigate(ROUTES.HOME, { replace: true })
    }
  }

  const setPending = async (id, token) => {
    const response = await fetch(API.PASS_SET_PENDING, OPTIONS.POST_AUTH(
      { pass_id: id }, token
    ))
    const result = await response.json();
    return result;
  }

  const unsetPending = async (id, token) => {
    const response = await fetch(API.PASS_UNSET_PENDING, OPTIONS.POST_AUTH(
      { pass_id: id }, token
    ))
    const result = await response.json();
    return result;
  }

  useEffect(() => {
    const init = async () => {
      try {
        const passData = await fetchDrop(pass_id);
        setPass(passData);
        const auth_token = await refreshToken();
        setPending(pass_id, auth_token);
      } catch (ex) {
        console.log(ex);
      }
      setLoading(false);
    }
    init();
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
    if (card.code) {
      toast({
        title: 'Card Error',
        description: card.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      processFailure();
      return undefined;
    }
    return card.data
  }

  const makeChargeCall = async (card_id) => {
    const amountDetail = {
      amount: pass.price,
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

    const cardDetails = { cvv: cardInfo.cvc }
    const publicKey = await CardApi.getPCIPublicKey()
    const encryptedData = await openPGP.encrypt(cardDetails, publicKey)

    payload.encryptedData = encryptedData.encryptedMessage
    payload.keyId = encryptedData.keyId
    const payment = await CardApi.createPayment(payload)

    return payment;
  }

  const purchasePass = async () => {
    const token = await refreshToken();
    let response = await fetch(API.PURCHASE_PASS, OPTIONS.POST_AUTH(
      { pass_id: pass_id }, token
    ))
    const result = await response.json();
    if (result.result == "success") {
      navigate(ROUTES.PROFILE, {replace: true});
    } else {
      response = await fetch(API.PASS_UNSET_PENDING, OPTIONS.POST_AUTH(
        { pass_id: pass_id }, token
      ))
      let pendingResult = await response.json();
      navigate(ROUTES.HOME, { replace: true })
    }
  }

  const handleBuy = async (e) => {
    e.preventDefault();
    try {
      const card = await makeCreateCardCall();
      if (card && card.id) {
        const payment = await makeChargeCall(card.id);
        if (payment.data.source) {
          purchasePass();
        } else {
          processFailure();
        }
      }
    } catch (err) {
      console.log(err)
      processFailure();
    }
  }

  const buyPassCrypto = async (price) => {
    try {
      if (walletState.provider) {
        const web3 = walletState.web3Provider;
        const contract = new web3.eth.Contract(abiJson, USDC_CONTRACT_ADDRESS);
        const amount = price;
        const tx = {
          from: walletState.address,
          to: USDC_RECEIVE_ADDRESS,
          data: contract.methods.transfer(USDC_RECEIVE_ADDRESS, web3.utils.toBN(amount)).encodeABI()
        };
        web3.eth.sendTransaction(tx).then(res => {
          console.log('success')
          // processSuccess();
        }).catch(err => {
          processFailure();
        });
      }
    } catch(error) {
      console.log(error);
      processFailure();
    }
  }

  const handleCryptoBuy = async (e) => {
    if (!pass) return;
    e.preventDefault();
    const res = await buyPassCrypto(pass.price);
    console.log(res);
    if (res.code) {
      console.log(message);
      processFailure();
    }
  }

  const processFailure = async () => {
    const token = await refreshToken();
    unsetPending(pass_id, token);
    navigate(ROUTES.HOME, { replace: true });
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