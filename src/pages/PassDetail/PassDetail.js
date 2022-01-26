import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import './styles.scss'

import * as ROUTES from 'constants/routes';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';
import { RARITY_TITLES } from 'constants/rarity';

import Page from 'components/Page'

import moment from 'moment';
import { Spinner } from '@chakra-ui/react';
import { Context } from 'Context'

function PassDetail() {
  const { pass_id } = useParams();
  const navigate = useNavigate();
  const { cookies } = useContext(Context);

  const [pass, setPass] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrop = async () => {
      try {
        let response = await fetch(API.PASS_DETAIL.replace('$1', pass_id), OPTIONS.GET);
        let passData = await response.json();
        setPass(passData);
        setLoading(false);
      } catch (ex) {
        console.log(ex);
      }
    }
    fetchDrop();
  }, [])

  const handleBuy = async () => {
    navigate(ROUTES.PASS_BUY.replace(':pass_id', pass.pass_id))
  }
  
  return (
    <Page>
      <div className="pass-detail-container">
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
                <div className="info-row">
                  <span>Smart Contract: <a style={{color: '#DC0000'}} href={`https://polygonscan.com/token/${pass.contract}`}>Here</a></span>
                  </div>
                <div className="info-row">
                  <span>Mint Number:</span><span>{pass.token_id}</span>
                </div>
                <div className="info-row">
                  <span>Price:</span><span>${pass.price}</span>
                </div>
                {pass.revealed == 1 && (
                  <>
                  <div className="info-row">
                    <span>Rarity:</span><span>{RARITY_TITLES[pass.rarity]}</span>
                  </div>
                  <div className="info-row">
                    <span>Points:</span><span>{pass.points}</span>
                  </div>
                  </>
                )}
                <div className="info-row">
                  <span>Description:</span><span>{pass.drop_num.description}</span>
                </div>
                <div className="buynow">
                  <div className="link-join" onClick={handleBuy}>
                    <div className="button-join">Buy Now</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Page>
  )
}

export default PassDetail;