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
            <div className="video-slider-text">
             <p className="video-slider-text-large-p">It’s a new era for unique collectables and we are about to change the way people collect, invest and redeem real world rewards. All Access provides premium NFT collectibles and brings the latest in collectable NFT’s to life.</p>
             <p>All Access will bridge the gap between blockchain and real world utility.</p>
            </div>
          </div>
          <DropList />          
          <div className="how-it-works">
            <div className="how-it-works-container">
              <h2>How It Works</h2>
              <p>Buy cases and packs to earn All Access Points(AAPs)</p>
              <p>Crack open your case or pack to redeem more AAPs</p>
              <p>Redeem AAPs in the All Access Zone for crazy merch and unique experiences</p>
              <p>Maintain your collection on our platform or transfer to your favorite Polygon wallet</p>
              <p>Buy and sell on the marketplace(coming soon)</p>
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