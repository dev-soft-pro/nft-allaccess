import React, { useEffect, useState, useContext } from 'react';
import './styles.scss';

import Header from 'components/Header';
import PassList from 'components/Profile/PassList';

function Profile() {


  return (
    <div className="profile-container">
      <Header />
      <PassList />
    </div>
  )
}

export default Profile;