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

function Profile() {
  const { buyPassCrypto } = useContext(Context)
  const { cookies } = useContext(Context)
  const formatDate = (date) => moment(date).format('MM/DD/YYYY HH:mm:ss')
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
          <PassList />
          <div className="connect-button-wrapper">
            <div>
              <ConnectButton />
            </div>
          </div>
        </div>
      </div> 
    </Page>
  )
}

export default Profile;