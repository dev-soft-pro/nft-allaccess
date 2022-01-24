import React, { useEffect, useState, useContext } from 'react';
import './styles.scss';

import Header from 'components/Header';
import PassList from 'components/Profile/PassList';
import ConnectButton from 'components/Buttons/ConnectButton';

import { Context } from 'Context'
import { Button } from '@chakra-ui/button';

function Profile() {
  const { buyPassCrypto } = useContext(Context)

  return (
    <div className="profile-container">
      <Header />
      <PassList />
      <div className="connect-button-wrapper">
        <ConnectButton />
      </div>
      <Button onClick={() => buyPassCrypto()}>Test</Button>
    </div>
  )
}

export default Profile;