import React, { useEffect, useState, useContext } from 'react';
import './styles.scss';

import Header from 'components/Header';
import PassList from 'components/Profile/PassList';
import ConnectButton from 'components/Buttons/ConnectButton';

import { Context } from 'Context'
import { Button } from '@chakra-ui/button';
import Page from 'components/Page';

function Profile() {
  const { buyPassCrypto } = useContext(Context)

  return (
    <Page>
      <div className="profile-container">
        <PassList />
        <div className="connect-button-wrapper">
          <ConnectButton />
        </div>
      </div>
    </Page>
  )
}

export default Profile;