import React, { useEffect, useState, useContext } from 'react';
import './styles.scss';

import Header from 'components/Header';
import PassList from 'components/Profile/PassList';
import ConnectButton from 'components/Buttons/ConnectButton';

function Profile() {


  return (
    <div className="profile-container">
      <Header />
      <PassList />
      <div className="connect-button-wrapper">
        <ConnectButton />
      </div>
    </div>
  )
}

export default Profile;