import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './styles.scss'

import * as ROUTES from 'constants/routes';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';

import Header from 'components/Header';

import moment from 'moment';

function DropDetail() {
  const { drop_num } = useParams();

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
        const matchedPass = dataPasses.find(p => p.drop_num == dropData.drop_num)
        setPass(matchedPass);
        setLoading(false);
      } catch (ex) {
        console.log(ex);
      }
    }
    fetchDrop();
  }, [])

  const formatDate = (date) => moment(date).format('MM/DD/YYYY HH:mm:ss')
  
  return (
    <div className="drop-detail-container">
      <Header />
      {!loading && (
        <div className="drop-info">
          <h2>{drop.edition}</h2>
          <div className="drop-image-container">
            <img src={drop.image} alt="drop-image" />
            <p>{drop.description}</p>
          </div>
          <div className="drop-info-detail">
            <p>
              Early Access<br />
              {formatDate(drop.presale_start)} ~ {formatDate(drop.presale_end)}<br />
              Public<br />
              {formatDate(drop.public_start)}
            </p>
          </div>
          {pass && (<div className="buy-button-wrapper">
            <Link className="link-join" to={ROUTES.PASS_DETAIL.replace(':pass_id', pass.pass_id)}>
              <div className="button-join">Buy Pass</div>
            </Link>
          </div>)}
        </div>
      )}
    </div>
  )
}

export default DropDetail;