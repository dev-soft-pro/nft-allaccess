import React from 'react'
import { Container } from 'react-bootstrap'

import Header from 'components/Header'
import DropList from 'components/Home/DropList'
import ArtistList from 'components/Home/ArtistList'

import JoinDiscordImage from 'assets/images/join_discord.png'

import './styles.scss'

function Home() {
  return (
    <div className="home-container">
      <Header />
      <Container>
        <DropList />
        {/* Join Discord */}
        <div className="join-discord-wrapper">
          <img src={JoinDiscordImage} alt="join-discord" />
        </div>
        <div className="how-it-works">
          <div>
            <h2>How It Works</h2>
            <p>COLLECT LIMITED-EDITION NFTS</p>
            <p>GAIN ACCESS TO EXCLUSIVE EVENTS AND MEMORABILIA</p>
            <p>SHOW OFF YOUR COLLECTIBLES IN BINDERS</p>
            <p>MAKE PURCHASE OR TRADE OFFERS ON NFTS IN OTHER BINDERS</p>
            <p>SELL YOUR COLLECTIBLES IN THE SECONDARY MARKETPLACE</p>
          </div>
        </div>
        <ArtistList />
        {/* About team to start */}
      </Container>
    </div>
  )
}

export default Home