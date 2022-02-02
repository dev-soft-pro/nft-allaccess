import React, { useEffect, useState, useContext } from 'react';
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



function Profile() {
  const { buyPassCrypto } = useContext(Context)
  const { cookies } = useContext(Context)
  const formatDate = (date) => moment(date).format('MM/DD/YYYY HH:mm:ss')
  const navigate = useNavigate();
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
  const consoleThis = (console) => {
    alert(console);
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

  function handleClick(drop) {
    navigate(ROUTES.DROP_DETAIL.replace(':drop_num', drop.drop_num));
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
            <a className="sort-by">Sort By</a>
          </div>
          <div className="profile-bottom-collection">
            { loading ? (<></>) : (passlist.map((pass, index) =>
              <div onClick={() => handleClick(pass.drop_num)} key={index} className="profile-bottom-collection-inner">
                <h3>{pass.drop_num.edition}</h3>
                <video muted={true} controls={false} playsInline={true} autoPlay={true} loop={true}>
                  <source src={pass.drop_num.image} type="video/mp4" />
                </video>
              </div>
            ))}
            {/*<PassList
              passes={passlist.filter(p => p.revealed == 1)}
              loading={loading} />
            <PassList
              passes={passlist.filter(p => p.revealed == 0)}
            loading={loading} />*/}


            
          </div>
        </div>
      </div> 
    </Page>
  )
}

export default Profile;