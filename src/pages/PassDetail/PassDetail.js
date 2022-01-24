import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import './styles.scss'

import * as ROUTES from 'constants/routes';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';

import Header from 'components/Header';

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
    <div className="pass-detail-container">
      <Header />
      <div className="pass-info-container">
        {loading ? (
          <Spinner color='white' />
        ) : (
          <>
            <img src={pass.image} alt="pass-img" />
            <div className="pass-info">
              <div className="mint-info">
                Price: ${pass.price}
              </div>
              <div className="amount-info"></div>
              <div className="buynow">
                <div className="link-join" onClick={handleBuy}>
                  <div className="button-join">Buy Pass</div>
                </div>
              </div>
              <div className="bottom-wrapper">
                <div className="owner-info">Contract: {pass.contract}</div>
                <div className="owner-info">Holder: {pass.holder}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PassDetail;