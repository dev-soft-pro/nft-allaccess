import React, { useEffect, useState, useContext } from 'react';
import './styles.scss';

import Header from 'components/Header';
import PassList from 'components/Profile/PassList';
import ConnectButton from 'components/Buttons/ConnectButton';
import ProfileImgEmpty from 'assets/images/profile-empty.png';
import { Context } from 'Context'
import { Button } from '@chakra-ui/button';
import Page from 'components/Page';
import moment from 'moment';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';

function Profile() {
  const { buyPassCrypto } = useContext(Context)
  const { cookies } = useContext(Context)
  const formatDate = (date) => moment(date).format('MM/DD/YYYY HH:mm:ss')

  const [passlist, setPassList] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshToken = async () => {
    const response = await fetch(API.REFRESH, OPTIONS.POST({
      refresh: cookies.refresh_token
    }))
    const data = await response.json();
    return data.access;
  }

  const loadPassesCall = async (token) => {
    const response = await fetch(API.AUTH_PASS, OPTIONS.GET_AUTH(token));
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    const init = async () => {
      const access_token = await refreshToken();
      const authPasses = await loadPassesCall(access_token);
      setPassList(authPasses);
      setLoading(false);
    }
    init();
  }, []);

  return (
    <Page>
      <div className="profile-container">
        <div className="profile-slider">
          <div className="profile-image">
            <img src={ProfileImgEmpty} alt="Profile Image"/>
          </div>
          <div className="textFix">
            <h2>{cookies.userinfo.username}</h2>
           
            <p>Email: <span>{cookies.userinfo.email}</span></p>
            <p>Date Created: <span>{formatDate(cookies.userinfo.created)}</span></p>
            <p>Points: <span>{cookies.userinfo.points}</span></p>
          </div>
        </div>
        <div className="profile-bottom">
          <PassList
            title="Revealed Passes"
            passes={passlist.filter(p => p.revealed == 1)}
            loading={loading} />
          <PassList
            title="Hidden Passes"
            passes={passlist.filter(p => p.revealed == 0)}
            loading={loading} />
        </div>
      </div> 
    </Page>
  )
}

export default Profile;