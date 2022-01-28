import React, { useContext } from 'react'
import { Link as RouterLink } from "react-router-dom";
import * as ROUTES from 'constants/routes';
import './styles.scss'

import { Container } from 'react-bootstrap'

import JoinDiscordImage from 'assets/images/join_discord.png'

import Header from 'components/Header'
import DropList from 'components/Home/DropList'
import ArtistList from 'components/Home/ArtistList'
import SetList from 'components/Home/SetList'

import { Context } from 'Context'
import Page from 'components/Page';

function Home() {
  const { cookies, removeAuth } = useContext(Context);

  return (
    <Page>
      <div className="home-container">
        <Container>
          <div className="video-slider">
            <video src="https://storage.googleapis.com/all_access_nft_bucket/assets/Copy%20of%20Logo%20trailer%20official%20-%20HD%201080p.mov" loop={true} autoPlay={true} muted={true} alt="Video"></video>
          </div>
          <DropList />          
          <ArtistList />
          <div className="how-it-works">
            <div className="how-it-works-container">
              <h2>How It Works</h2>
              <p>COLLECT LIMITED-EDITION NFTS</p>
              <p>GAIN ACCESS TO EXCLUSIVE EVENTS AND MEMORABILIA</p>
              <p>SHOW OFF YOUR COLLECTIBLES IN BINDERS</p>
              <p>MAKE PURCHASE OR TRADE OFFERS ON NFTS IN OTHER BINDERS</p>
              <p>SELL YOUR COLLECTIBLES IN THE SECONDARY MARKETPLACE</p>
              {!(cookies.isAuth == 'true') && (
                <div className="button-wrapper">
                  <RouterLink className="link-join" to={ROUTES.REGISTER}>
                    <div className="button-join">GET STARTED</div>
                  </RouterLink>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </Page>
  )
}

export default Home