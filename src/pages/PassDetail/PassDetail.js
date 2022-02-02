import React, { useState, useEffect, useContext, useMemo, useRef } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import './styles.scss'

import * as ROUTES from 'constants/routes';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';
import { RARITY_TITLES } from 'constants/rarity';

import Page from 'components/Page'
import PassClip from 'components/PassClip';

import moment from 'moment';
import { Spinner } from '@chakra-ui/react';
import { Context } from 'Context'

function PassDetail() {
  const { pass_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { cookies, refreshToken } = useContext(Context);

  const [pass, setPass] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const detailFrom = useMemo(() => {
    if (location.pathname.startsWith('/profile')) {
      return 'profile'
    } else {
      return 'buy'
    }
  }, [location])

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
  if (pass != undefined) {
    console.log(pass);
  }

  const handleBuy = async () => {
    navigate(ROUTES.PASS_BUY.replace(':pass_id', pass.pass_id))
  }

  const handleReveal = async () => {
    const token = await refreshToken();
    const response = await fetch(API.REVEAL_PASS, OPTIONS.POST_AUTH({
      pass_id: pass.pass_id.toString(),
      drop_num: pass.drop_num.drop_num.toString()
    }, token));
    const data = await response.json();
    setPass(prev => ({...prev, revealed: 1}))
  }

  //add ifsold variable here "true or false"
  function checkIfSoldOut(ifsold){
    if(!ifsold){
      return "buynow_button_disabled";
    }
    return "buynow_button";
  }
  function createOptionQuantity(quantity){
    let options = [];
    for(let i = 0; i < quantity+1; i++){
      options.push(i)
    }
    return options;
  }
  
  return (
    <Page>
      <div className="pass-detail-container">
        <div className="pass-info-container">
          {loading ? (
            <Spinner color='white' />
          ) : (
            <>
            <div className="pass-info-wrapper">
              <PassClip pass={pass} />
              <div className="pass-detail-info">
                <div className="header-pass">
                  <h2>{pass.drop_num.edition}</h2>
                  <hr className="line-description"/>
                  
                  {detailFrom === 'buy' && (
                    <div className="buybox">
                      <p>Price:<span>${pass.price}</span></p>
                      <select>
                        {/* createOptionQuantity(ProductQuantity) it will map whatever quantity a client can buy*/}
                        {createOptionQuantity(20).map(i => (
                          <option key={i} value={i}>{i}</option>
                        ))}
                      </select>
                      <div className={checkIfSoldOut(true)}>
                        <div className="info-row" onClick={handleBuy}>
                          <div className="button-join-but">Buy Pass</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {pass.revealed === 0 && (
                    <div className="revealbox" onClick={handleReveal}>
                      <div className="button-reveal">Reveal</div>
                    </div>
                  )}
                  <div className="pass-description">
                    <p>Team Pettis Case can be opened to reveal a Team Pettis Collectible Pass</p>
                    <h2>Rewards:</h2>
                    <ul>
                      <li>100 All Access Points</li>
                      <li>1 Collectible Pass NFT</li>
                    </ul>
                    <p>Total Purchased: <span>{pass.token_id} / 1000</span></p>
                    <p>Smart Contract: {pass.contract}</p>

                {pass.revealed == 1 && (
                  <>
                  <div className="info-row">
                    <div>
                      <p>Rarity:<span>{RARITY_TITLES[pass.rarity]}</span></p>
                      <p>Points:<span>{pass.points}</span></p>
                    </div>
                  </div>
                  </>
                )}
                </div>
                </div>
              </div>
              </div>
              <div className="description-wrapper">
              <hr className="line-description"/>
              <div className="description-passdetail">
              <div className="table-wrapper">
                <table className="table-item">
                  <thead>
                    <tr>
                      <th>Unsigned - {pass.drop_num.description.rarities.table.unsigned.quantity}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pass.drop_num.description.rarities.table.unsigned.rows.map(
                      (row,index) =>
                        <tr>
                          <td>{row.rarity} - {row.quantity}</td>
                        </tr>
                      )}
                  </tbody>
                </table>
                <table className="table-item">
                  <thead>
                    <tr>
                      <th>Signed - {pass.drop_num.description.rarities.table.signed.quantity}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pass.drop_num.description.rarities.table.signed.rows.map(
                      (row,index) =>
                        <tr>
                          <td>{row.rarity} - {row.quantity}</td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
              <div className="table-wrapper">
                <table className="table-item">
                  <thead>
                    <tr>
                      <th>Unsigned - Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pass.drop_num.description.points.table.unsigned.map(
                      (row,index) =>
                        <tr>
                          <td>{row.rarity} - {row.quantity} Points</td>
                        </tr>
                      )}
                  </tbody>
                </table>
                <table className="table-item">
                  <thead>
                    <tr>
                      <th>Signed - Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pass.drop_num.description.points.table.signed.map(
                      (row,index) =>
                        <tr>
                          <td>{row.rarity} - {row.quantity} Points</td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
              <div className="table-wrapper">
                <table className="table-item">
                  <thead>
                    <tr>
                      <th>Unsigned - Right To Buy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pass.drop_num.description.points.redemptions.table.unsigned.map(
                      (row,index) =>
                        <tr>
                          <td>{row.rarity} - {row.quantity}</td>
                        </tr>
                      )}
                  </tbody>
                </table>
                <table className="table-item">
                  <thead>
                    <tr>
                      <th>Signed - Right To Buy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pass.drop_num.description.points.redemptions.table.signed.map(
                      (row,index) =>
                        <tr>
                          <td>{row.rarity} - {row.quantity}</td>
                        </tr>
                      )}
                  </tbody>
                </table>
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