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
          <DropList />
          {/* Join Discord */}
          <div className="join-discord-wrapper">
            <img src={JoinDiscordImage} alt="join-discord" />
          </div>
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