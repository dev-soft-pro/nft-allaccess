import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import './styles.scss'

import * as ROUTES from 'constants/routes';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';

import Header from 'components/Header';
import { Context } from 'Context';

import moment from 'moment';
import { Spinner } from '@chakra-ui/spinner';
import Page from 'components/Page';
import background_image from 'assets/images/Roadmap-background.png'
import { drop } from 'lodash';

function FillDropInfo(drop){
  let fillInfo = drop.description
  return
}

function DropDetail() {
  const { drop_num } = useParams();
  const { cookies } = useContext(Context);

  const [drop, setDrop] = useState(undefined);
  const [pass, setPass] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrop = async () => {
      try {
        let response = await fetch(API.DROP_DETAIL.replace('$1', drop_num), OPTIONS.GET);
        let dropData = await response.json();
        setDrop(dropData);
        response = await fetch(API.ALL_PASS, OPTIONS.GET);
        let dataPasses = await response.json();
        const matchedPass = dataPasses.find(p => p.drop_num.drop_num == dropData.drop_num)
        setPass(matchedPass);
        setLoading(false);
      } catch (ex) {
        console.log(ex);
      }
    }
    fetchDrop();
    
  }, [])

  const formatDate = (date) => moment(date).format('MM/DD/YYYY HH:mm:ss')

  if (drop){
    console.log(drop);
  }

  return (
    <Page>
      <div className="drop-detail-container">
        <div className="drop-info">
        <img className="background-image" src={background_image}/>
          {loading ? (
            <Spinner color='white' />
          ) : (
            <>
              <div className="drop-info-item">
                <div className="drop-info-inner">
                    <div className="drop-image-container">
                      <video muted={true} loop={true} autoPlay={true} playsInLine={true} controls={false} src={drop.image} alt="drop-image"></video>
                    </div>
                    <h2>{drop.edition}</h2>
                    <p>{drop.subdescription}</p>
                </div>

                <div className="drop-info-inner">
                  <h2>How much are {drop.title} Cases?</h2>
                  <ul className="bullets-item">
                  {
                      drop.description.how_much.bullets.map((bullet,index) =>
                          <li>{bullet}</li>
                      )
                  }
                  </ul>
                  <hr className="white-line"/>
                </div>
                <div className="drop-info-inner">
                  <h2>When will they launch?</h2>
                  <ul className="bullets-item">
                  {
                      drop.description.when.bullets.map((bullet,index) =>
                          <li>{bullet}</li>
                      )     
                  }
                  </ul>
                  <hr/>
                </div>
                <div className="drop-info-inner">
                  <h2>What are the rarities?</h2>
                  <ul className="bullets-item">
                  {
                      drop.description.rarities.bullets.map((bullet,index) =>
                          <li>{bullet}</li>
                      )     
                  }
                  </ul>
                  <div className="table-wrapper">
                    <table className="table-item">
                      <thead>
                        <tr>
                          <th>Unsigned - {drop.description.rarities.table.unsigned.quantity}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {drop.description.rarities.table.unsigned.rows.map(
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
                          <th>Signed - {drop.description.rarities.table.signed.quantity}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {drop.description.rarities.table.signed.rows.map(
                          (row,index) =>
                            <tr>
                              <td>{row.rarity} - {row.quantity}</td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </div>
                <hr/>
                </div>
                <div className="drop-info-inner">
                  <h2>How many All Access Zone Points will I receive?</h2>
                  <ul className="bullets-item">
                  {
                    drop.description.points.bullets.map((bullet,index) =>
                      <li>{bullet}</li>
                    )    
                  }
                  </ul>
                  <div className="table-wrapper">
                      <table className="table-item">
                        <thead>
                          <tr>
                            <th>Unsigned</th>
                          </tr>
                        </thead>
                        <tbody>
                          {drop.description.points.table.unsigned.map(
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
                                <th>Signed</th>
                              </tr>
                            </thead>
                            <tbody>
                              {drop.description.points.table.signed.map(
                                (row,index) =>
                                  <tr>
                                    <td>{row.rarity} - {row.quantity}</td>
                                  </tr>
                              )}
                            </tbody>
                      </table>
                    </div>
                  <hr/>
                </div>
                <div className="drop-info-inner">
                  <h2>How many Redemptions?</h2>
                  <ul className="bullets-item">
                  {
                      drop.description.points.redemptions.bullets.map((bullet,index) =>
                          <li>{bullet}</li>
                      )     
                  }
                  </ul>
                  <div className="table-wrapper">
                    <table className="table-item">
                      <thead>
                        <tr>
                          <th>Unsigned</th>
                        </tr>
                      </thead>
                      <tbody>
                        {drop.description.points.redemptions.table.unsigned.map(
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
                          <th>Signed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {drop.description.points.redemptions.table.signed.map(
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

export default DropDetail;