import React from 'react'
import './styles.scss'

import FacebookIcon from 'assets/images/social/facebook.png'
import TwitterIcon from 'assets/images/social/twitter.png'
import discordIcon from 'assets/images/social/discord.png'
import InstagramIcon from 'assets/images/social/instagram.png'

function Footer() {
  return (
    <footer className="footer">
      <span>©All Access NFT 2022</span>
      <a href="https://facebook.com">
        <img src={FacebookIcon} alt='facebook' />
      </a>
      <a href="https://twitter.com">
        <img src={TwitterIcon} alt='twitter' />
      </a>
      <a href="https://discord.com">
      <img src={discordIcon} alt='discord' />
      </a>
      <a href="https://instagram.com">
        <img src={InstagramIcon} alt='instagram' />
      </a>
    </footer>
  )
}

export default Footer;