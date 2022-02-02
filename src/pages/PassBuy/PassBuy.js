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
  ModalFooter,
  ModalCloseButton
} from '@chakra-ui/react'
import { Form } from 'react-bootstrap'
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { v4 as uuidv4 } from 'uuid'

import { Context, USDC_CONTRACT_ADDRESS, USDC_RECEIVE_ADDRESS } from 'Context';
import abiJson from 'assets/usdc-abi.json'
import Header from 'components/Header';
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
    clearCart,
    refreshToken
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

  const [loading, setLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCard, setIsCard] = useState(false);
  const [isCrypto, setIsCrypto] = useState(false);
  const [pass_id, setPassId] = useState('');
  const [amount, setAmount] = useState(1);
  const [buyPassIds, setBuyPassIds] = useState([]);

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
              processFailureWithMessage(err.message)
            })
          }
        }).catch(err => {
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


            
            <div className="checkout-container">
              <div className="checkout-top">
                <div className="checkout-left">
                  <video className="NFT" src={pass.image.image} muted={true} autoPlay={true} playsInline={true} loop={true} alt="NFT"></video>
                  <p>{pass.drop_num.edition}</p>
                  <p>Recipient: {cookies.userinfo.username}</p>
                  <p>Smart Contract: {pass.contract}</p>
                </div>

                <div className="checkout-right">
                  <h1>Select Payment Method</h1>
                  

                  <Button className="white-button" onClick={() => setIsCard(true)}>Pay With New Credit Card</Button>
                  <Button className="white-button" onClick={() => setIsCrypto(true)}> Pay With Cryptocurrency</Button>
                  <hr/>
                  <div className="price-box">
                    {/* Double check the price math please */}
                    <div className="total-price">
                      <h2>Total ▽</h2>
                      <h2>${amount * pass.price} ({amount} passes)</h2>
                    </div>
                    <div className="sub-total">
                      <h3>Subtotal</h3>
                      <h3>${amount * pass.price} ({amount} passes)</h3>
                    </div>
                    <div className="service-fee">
                      <h3>Service Fee</h3>
                      <h3>$0.00</h3>
                    </div>
                  </div>

                </div>

              </div>
              
              <hr/>

              <Button className="red-button">Continue</Button>




              <Modal isOpen={isCard}>
                <ModalOverlay />
                <ModalContent className="card-modal">
                  <div className="card-wrapper">
                  <Cards
                      cvc={cardInfo.cvc}
                      expiry={cardInfo.expiry}
                      focused={focus}
                      name={cardInfo.name}
                      number={cardInfo.number}
                    />
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

                      <Form.Group className="mb-3">
                        <Form.Control
                          type="tel"
                          name="expire"
                          placeholder="Expire"
                          maxLength={5}
                          onChange={(e) => setCardInfo(prev => ({...prev, expiry: e.target.value.replace('/', '')}))}
                          onFocus={(e) => setFocus(e.target.name)} />
                      </Form.Group>
                      <Form.Group className="mb-3">
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

                      
                    </Form>
                  </div>

                    <div className="button-footer">
                      <Button className="red-button" type="submit" onClick={handleBuy}>
                        Submit
                      </Button>

                    <Button className="red-button" onClick={() => setIsCard(false)}>Close</Button>
                    </div> 
                </ModalContent>
              </Modal>



              <Modal isOpen={isCrypto}>
                <ModalOverlay />
              
                <ModalContent className="crypto-modal">
                <ModalHeader>Pay With Cryptocurrency</ModalHeader>
                    
                <ModalBody>
                  <div className="crypto-nft">
                    <p className="nft_name">{pass.drop_num.edition} - Price: ${pass.price}</p>
                    <p className="nft_name">Total: ${amount * pass.price} ({amount} passes)</p>
                    <video src={pass.image.image} src={pass.image.image} muted={true} autoPlay={true} playsInline={true} loop={true} alt="NFT"></video>
                    <div className="crypto-nft-button-wrapper">
                      <ConnectButton />
                      <div className="button-footer">
                        <Button className="red-button" type="submit" onClick={handleCryptoBuy}>
                          Pay Now
                        </Button>
                        <Button className="red-button" onClick={() => setIsCrypto(false)}>Close</Button>
                      </div>
                    </div>
                  </div>
                </ModalBody>

                </ModalContent>
              </Modal>
            </div>

          )}
        </div>
        <Modal isOpen={isFinished}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Successfully purchased</ModalHeader>
            <ModalBody>
              {pass && isRevealed && (
                <video loop={true} autoPlay={true} muted={true} playsInline={true}>
                  <source src={pass.reveal_vid.reveal_vid} />
                </video>
              )}
              {pass && !isRevealed && (
                <video loop={true} autoPlay={true} muted={true} playsInline={true}>
                  <source src={pass.image.image} />
                </video>
              )}
            </ModalBody>
            <ModalFooter>
              {!isRevealed ? (
                <>
                  <Button className="red-button" mr={3} onClick={confirmRevealPass}>Reveal</Button>
                  <Button variant='ghost' className="red-button" onClick={skipRevealPass}>Skip</Button>
                </>
              ) : (
                <Button variant='ghost' className="red-button" onClick={skipRevealPass}>Close</Button>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </Page>
  )
}

export default PassBuy;