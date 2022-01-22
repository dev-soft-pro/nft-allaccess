import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './styles.scss'

import * as ROUTES from 'constants/routes';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';

import Header from 'components/Header';

import moment from 'moment';

function PassBuy() {
  const { pass_id } = useParams();

  // const [drop, setDrop] = useState(undefined);
  const [pass, setPass] = useState(undefined);
  const [loading, setLoading] = useState(true);

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
      {pass && (<div className="pass-info-container">
        <img src={pass.image} alt="pass-img" />
        <div className="pass-info">
          <div className="mint-info">
            Info on collection details and general pack or card details <br/>
            95 / 100 minted
          </div>
          <div className="amount-info"></div>
          <div className="buynow">
            <Link className="link-join" to={ROUTES.PASS_DETAIL.replace(':pass_id', pass.pass_id)}>
              <div className="button-join">Buy Pass</div>
            </Link>
          </div>
          <div className="bottom-wrapper">
            <div className="owner-info">Contract: {pass.contract}</div>
            <div className="owner-info">Holder: {pass.holder}</div>
          </div>
        </div>
      </div>)}
    </div>
  )
}

export default PassBuy;