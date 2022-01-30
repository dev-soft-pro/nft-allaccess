import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react'
import { Form } from 'react-bootstrap'
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { v4 as uuidv4 } from 'uuid'

import { Context, USDC_CONTRACT_ADDRESS, USDC_RECEIVE_ADDRESS } from 'Context';
import abiJson from 'assets/usdc-abi.json'
import countries from 'assets/countries.json'
import usProvinces from 'assets/provinces_us.json'
import usCanada from 'assets/provinces_ca.json'
import * as ROUTES from 'constants/routes';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';
import * as CardApi from 'services/cardsApi'
import openPGP from 'services/openpgp'
import './styles.scss'
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import Page from 'components/Page';
import ConnectButton from 'components/Buttons/ConnectButton';

function PassBuy() {
  const provinces = {
    'US': usProvinces,
    'CA': usCanada,
  }

  const navigate = useNavigate();
  const {
    cookies,
    walletState,
    connectWallet,
    updateLoadingStatus,
    clearCart
  } = useContext(Context);
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

  //if (pass != undefined) {
  //  console.log(pass);
  //}

  const [loading, setLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [pass_id, setPassId] = useState('');
  const [amount, setAmount] = useState(1);
  const [buyPassIds, setBuyPassIds] = useState([]);

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

  const setPending = async (id, amount, token) => {
    const response = await fetch(API.PASS_SET_PENDING, OPTIONS.POST_AUTH(
      {
        drop_num: id,
        num_requested: amount.toString(),
      }, token
    ))
    const result = await response.json();
    if (result.result == 'success') {
      setBuyPassIds(result.pass_ids);
    }
    return result;
  }

  const releasePending = async (id, token) => {
    const response = await fetch(API.PASS_UNSET_PENDING, OPTIONS.POST_AUTH(
      { pass_ids: pass_list.map(p => p.toString()) }, token
    ))
    const result = await response.json();
    return result;
  }

  const revealPass = async (id, token) => {
    const response = await fetch(API.REVEAL_PASS, OPTIONS.POST_AUTH(
      { drop_num: id }, token
    ))
    const result = await response.json();
    return result;
  }

  useEffect(() => {
    if (!cookies.cartinfo) {
      return;
    }
    const init = async (id, amount) => {
      try {
        const passData = await fetchDrop(id);
        setPass(passData);
        setIsRevealed(passData.revealed != 0)
        const auth_token = await refreshToken();
        setPending(passData.drop_num.drop_num, amount, auth_token);
      } catch (ex) {
        console.log(ex);
      }
      setLoading(false);
    }
    setPassId(cookies.cartinfo.pass_id)
    setAmount(cookies.cartinfo.amount)
    init(cookies.cartinfo.pass_id, cookies.cartinfo.amount)
  }, [cookies])

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
        position: 'top',
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
      amount: pass.price * amount,
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

  const processSuccess = async () => {
    const token = await refreshToken();
    let response = await fetch(API.PURCHASE_PASS, OPTIONS.POST_AUTH(
      { pass_ids: buyPassIds }, token
    ))
    const result = await response.json();
    updateLoadingStatus(false)
    if (result.result == "success") {
      setIsFinished(true);
      clearCart();
    } else {
      processFailure()
    }
  }

  const processFailureWithMessage = (msg) => {
    toast({
      position: 'top',
      title: 'Crypto Error',
      description: msg,
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
    processFailure();
  }

  const processFailure = async () => {
    updateLoadingStatus(false)
    const token = await refreshToken();
    releasePending(pass_id, token);
    navigate(ROUTES.HOME, { replace: true });
  }

  const handleBuy = async (e) => {
    e.preventDefault();
    updateLoadingStatus(true)
    try {
      const card = await makeCreateCardCall();
      if (card && card.id) {
        const payment = await makeChargeCall(card.id);
        if (payment.data.source) {
          processSuccess();
        } else {
          processFailure();
        }
      }
    } catch (err) {
      console.log(err)
      processFailure();
    }
  }

  const handleCryptoBuy = async (e) => {
    if (!pass) return;
    e.preventDefault();
    try {
      buyPassCrypto(pass.price);
    } catch (err) {
      processFailure();
    }
  }

  const buyPassCrypto = async (price) => {
    try {
      if (walletState.provider) {
        const web3 = walletState.web3Provider;
        const contract = new web3.eth.Contract(abiJson, USDC_CONTRACT_ADDRESS, {
          from: walletState.address,
          gas: 100000
        });
        contract.methods.approve(
          USDC_RECEIVE_ADDRESS,
          price * 10 ^ 18
        ).call().then(res => {
          if (res === true) {
            contract.methods.transfer(USDC_RECEIVE_ADDRESS, amount * price * 10 ^ 18)
            .call()
            .then(res => {
              processSuccess();
            })
            .catch(err => {
              console.log(err, 1)
              processFailureWithMessage(err.message)
            })
          }
        }).catch(err => {
          console.log(err.message, 2)
          processFailureWithMessage(err.message)
        })
      }
    } catch(error) {
      processFailure()
    }
  }
  
  const confirmRevealPass = async () => {
    const token = await refreshToken()
    const res = await revealPass(pass.drop_num.drop_num, token)
    if (res.result == 'success') {
      setIsRevealed(true);
    }
  }

  const skipRevealPass = () => {
    navigate(ROUTES.PROFILE, {replace: true});
  }
  
  return (
    <Page>
      <div className="buy-detail-container">
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
                        {(cardInfo.country == 'US' || cardInfo.country == 'CA') ? (
                          <Form.Select
                            onChange={(e) => setCardInfo(prev => ({...prev, district: e.target.value}))}
                            value={cardInfo.district}>
                            <option value="">Select District</option>
                            {provinces[cardInfo.country].map(ct => 
                              <option value={ct.value} key={`district-${ct.value}`}>{ct.text}</option>
                            )}
                          </Form.Select>
                        ) : (
                          <Form.Control
                            type="text"
                            placeholder="District"
                            onChange={(e) => setCardInfo(prev => ({...prev, district: e.target.value}))}
                            disabled={cardInfo.country == ''} />
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Select
                          aria-label="Default select example"
                          onChange={(e) => setCardInfo(prev => ({
                            ...prev,
                            country: e.target.value,
                            district: e.target.value == 'US' || e.target.value == 'US' ? '' : prev.district
                          }))}>
                          <option value="">Select Country</option>
                          {countries.map(ct => 
                            <option key={`country-${ct.value}`} value={ct.value}>{ct.text}</option>
                          )}
                        </Form.Select>
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

                      <Button colorScheme="red" type="submit" onClick={handleBuy}>
                        Submit
                      </Button>
                    </Form>
                    <div>
                    <p className="nft_name">{pass.drop_num.edition} - Price: ${pass.price}</p>
                    <p className="nft_name">Total: ${amount * pass.price} ({amount} passes)</p>
                    <video src={pass.image.image} muted={true} autoPlay={true} muted={true} alt="NFT"></video>
                    <Cards
                      cvc={cardInfo.cvc}
                      expiry={cardInfo.expiry}
                      focused={focus}
                      name={cardInfo.name}
                      number={cardInfo.number}
                    />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="crypto-nft">
                    <p className="nft_name">{pass.drop_num.edition} - Price: ${pass.price}</p>
                    <p className="nft_name">Total: ${amount * pass.price} ({amount} passes)</p>
                    <video src={pass.image.image} muted={true} autoPlay={true} muted={true} alt="NFT"></video>
                    <div className="crypto-nft-button-wrapper">
                      <ConnectButton />
                      <Button colorScheme="red" type="submit" onClick={handleCryptoBuy}>
                        Pay Now
                      </Button>
                    </div>
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </div>
        <Modal isOpen={isFinished}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Successfully purchased</ModalHeader>
            <ModalBody>
              {pass && isRevealed && (
                <video loop autoPlay={true} muted={true} playsInline={true}>
                  <source src={pass.reveal_vid.reveal_vid} />
                </video>
              )}
              {pass && !isRevealed && (
                <video loop autoPlay={true} muted={true} playsInline={true}>
                  <source src={pass.image.image} />
                </video>
              )}
            </ModalBody>
            <ModalFooter>
              {!isRevealed ? (
                <>
                  <Button colorScheme='red' mr={3} onClick={confirmRevealPass}>Reveal</Button>
                  <Button variant='ghost' onClick={skipRevealPass}>Skip</Button>
                </>
              ) : (
                <Button variant='ghost' onClick={skipRevealPass}>Close</Button>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </Page>
  )
}

export default PassBuy;