import React, { useEffect, useState, useContext, useMemo, useRef } from 'react';
import {useNavigate} from 'react-router-dom'
import './styles.scss';
import * as ROUTES from 'constants/routes';
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
import { useToast } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react'
import { RARITY_TITLES } from 'constants/rarity';

function PassVideo(props) {
  const { pass } = props
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [pass])

  if (pass.revealed === 0) {
    return (
      <video
        ref={videoRef}
        loop={true}
        playsInline={true}
        autoPlay={true}
        muted={true}
        playsInline={true}>
        <source src={pass.hidden_image.image} />
      </video>
    );
  } else if (pass.revealed === 1) {
    return (
      <video
        ref={videoRef}
        loop={true}
        playsInline={true}
        autoPlay={true}
        muted={true}
        playsInline={true}>
        <source src={pass.image.image} />
      </video>
    )
  } else {
    return null
  }
}


function Profile() {
  const { cookies } = useContext(Context)
  const navigate = useNavigate();
  const [passlist, setPassList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState('')

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

  const sortedPasses = useMemo(() => {
    console.log(orderBy)
    if (orderBy == 'rarity') {
      let sPasses = passlist.map(sp => ({...sp, rarity: sp.revealed === 1 ? sp.rarity : 0}));
      return sPasses.sort((a, b) => b.rarity - a.rarity);
    } else {
      return passlist
    }
  }, [passlist, orderBy])

  useEffect(() => {
    const init = async () => {
      const access_token = await refreshToken();
      const authPasses = await loadPassesCall(access_token);
      setPassList(authPasses);
      setLoading(false);
    }
    init();
  }, []);

  function handleClick(pass_id) {
    if (pass_id) {
      return navigate(ROUTES.PROFILE_PASS_DETAIL.replace(':pass_id', pass_id));
    }
  }

  return (
    <Page>
      <div className="profile-container">
        <div className="profile-top">
          <div className="profile-info">
            <div className="profile-image">
              <img src={ProfileImgEmpty} alt="Profile Image"/>
            </div>
            <h2>{cookies.userinfo.username}</h2>
            <div className="points-container">
              <p>All Access Points</p>
              <p>{cookies.userinfo.points}</p>
            </div>
          </div>

          <button className="edit-profile-button" >
            <a href="/profile/edit">Edit Profile</a>
          </button>



        </div>
        <hr/>
        <div className="profile-bottom">
          <div className="profile-bottom-top-bar">
            <h1>My Collection</h1>
            {/* <a className="sort-by">Sort By</a> */}
            <Select
              className="sort-by"
              textColor='white'
              maxWidth={200}
              onChange={(e) => setOrderBy(e.target.value)}>
              <option value=''>Sort by</option>
              <option value='rarity'>Rarity</option>
            </Select>
          </div>
          <div className="profile-bottom-collection">
            {loading ? (<></>) : (sortedPasses.map((pass, index) =>
              <div onClick={() => handleClick(pass.pass_id)} key={index} className="profile-bottom-collection-inner">
                <h3>
                  {pass.drop_num.edition}
                  {pass.revealed === 1 ? `(${RARITY_TITLES[pass.rarity]})` : ''}
                </h3>
                <PassVideo pass={pass} />
              </div>
            ))}
          </div>
        </div>
      </div> 
    </Page>
  )
}

export default Profile;