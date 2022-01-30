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
  
  return (
    <Page>
      <div className="drop-detail-container">
        <div className="drop-info">
          {loading ? (
            <Spinner color='white' />
          ) : (
            <>
              <div className="drop-info-inner">
                <div className="drop-left">
                  <h2>{drop.edition}</h2>
                  <div className="drop-image-container">
                    <img src={drop.image} alt="drop-image" />
                  </div>
                  {cookies.isAuth == 'true' && pass && (
                    <div className="buy-button-wrapper">
                      <Link className="link-join" to={ROUTES.PASS_DETAIL.replace(':pass_id', pass.pass_id)}>
                        <div className="button-join">Buy Pass</div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="drop-info-detail-bottom">
                <h2>Drop Information:</h2>
                <div dangerouslySetInnerHTML={{__html:drop.description}} className="grabbed-data"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </Page>
  )
}

export default DropDetail;
