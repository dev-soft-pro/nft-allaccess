import React from 'react'
import './styles.scss'

import redditIcon from 'assets/images/social/reddit.png'
import TwitterIcon from 'assets/images/social/twitter.png'
import discordIcon from 'assets/images/social/discord.png'
import InstagramIcon from 'assets/images/social/instagram.png'


function Footer() {
  return (
    <footer className="footer">
    

      <div className="footer-top">
          <a href="https://discord.com" className="discord-footer">
            <img src={discordIcon} alt='instagram' />
            Join Discord
          </a>
        <div className="footer-menu">
          <a href="#">About</a>
          <a href="#">FAQ</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms Of Service</a>
          <a href="#">Contact Us</a> 
        </div>

        <div className="footer-social-right">
          <a href="https://instagram.com">
            <img src={InstagramIcon} alt='instagram' />
          </a>
          <a href="https://twitter.com">
            <img src={TwitterIcon} alt='twitter' />
          </a>
          <a href="https://reddit.com">
            <img src={redditIcon} alt='reddit' />
          </a>
        </div>
      </div>

      <hr/>
      <span>Copyright @ 2022 All Access</span>
    </footer>
  )
}

export default Footer;