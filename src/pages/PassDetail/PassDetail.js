import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import './styles.scss'

import * as ROUTES from 'constants/routes';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';
import { RARITY_TITLES } from 'constants/rarity';

import Page from 'components/Page'

import moment from 'moment';
import {
  Spinner,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { Context } from 'Context'

function PassDetail() {
  const { pass_id } = useParams();
  const navigate = useNavigate();
  const { cookies, setCart } = useContext(Context);

  const [pass, setPass] = useState(undefined);
  const [amount, setAmount] = useState(1);
  const [maxAmount, setMaxAmount] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrop = async () => {
      try {
        let response = await fetch(API.PASS_DETAIL.replace('$1', pass_id), OPTIONS.GET);
        let passData = await response.json();
        setPass(passData);
        response = await fetch(API.PASS_NUM_AVAILABLE, OPTIONS.POST({
          drop_num: passData.drop_num.drop_num
        }))
        let maxData = await response.json();
        setMaxAmount(maxData.max_available)
        setLoading(false);
      } catch (ex) {
        console.log(ex);
      }
    }
    fetchDrop();
  }, [])

  const handleBuy = async () => {
    setCart({
      pass_id: pass.pass_id,
      amount: amount
    })
    navigate(ROUTES.PASS_BUY.replace(':pass_id', pass.pass_id))
  }
  //add ifsold variable here "true or false"
  function checkIfSoldOut(ifsold){
    if(!ifsold){
      return "buynow_disabled";
    }
    return "buynow";
  }
  
  return (
    <Page>
      <div className="pass-detail-container">
        <h1 className="pass-info">Purchase All Access Pass For Access To The Marketplace</h1>
        <div className="pass-info-container">
          {loading ? (
            <Spinner color='white' />
          ) : (
            <>
              <video loop autoPlay={true} muted={true} playsInline={true}>
                {pass.revealed == 0 ? (
                  <source src={pass.image.image} />
                ) : (
                  <source src={pass.reveal_vid.reveal_vid} />
                )}
              </video>
              <div className="pass-detail-info">
                <div className="info-row header-pass">
                  <h1>{pass.drop_num.edition}</h1>
                  {/* ADD TOTAL MINTED */}
                  <p>Mint Number:<span>{pass.token_id} / 14</span></p>
                  <p>Price:<span>${pass.price}</span></p>
                </div>
                {pass.revealed == 0 && (
                  <>
                  <div className="info-row">
                    <div>
                      <p>Rarity:<span>{RARITY_TITLES[pass.rarity]}</span></p>
                      <p>Points:<span>{pass.points}</span></p>
                    </div>
                    <div className="button-join" href={`https://polygonscan.com/token/${pass.contract}`}>Smart Contract</div>
                  </div>
                  </>
                )}
                {pass.revealed == 1 && (
                  <>
                  <div className="info-row">
                    <div className="button-join" href={`https://polygonscan.com/token/${pass.contract}`}>Smart Contract</div>
                  </div>
                  </>
                )}
                <div className="info-row">
                  <div>Amout: 
                  <NumberInput
                    min={1}
                    max={maxAmount}
                    defaultValue={1}
                    onChange={(v) => setAmount(v)} >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  </div>
                </div>
                <div style={{width:100+"%"}} className={checkIfSoldOut(true)}>
                  <div className="info-row" onClick={handleBuy}>
                    <div className="button-join-but">Buy Pass</div>
                  </div>
                </div>
              </div>
              <div className="desc-fix">
                {<div dangerouslySetInnerHTML={{__html:pass.drop_num.description}} className="grabbed-data"></div>}
              </div>
            </>
          )}
        </div>
        
      </div>
    </Page>
  )
}

export default PassDetail;
