import React from 'react'
import './styles.scss'

import redditIcon from 'assets/images/social/Reddit.png'
import TwitterIcon from 'assets/images/social/twitter.png'
import discordIcon from 'assets/images/social/discord.png'
import InstagramIcon from 'assets/images/social/instagram.png'

import * as ROUTES from 'constants/routes';


function Footer() {
  return (
    <footer className="footer">
    

      <div className="footer-top">
          <a href="https:// discord.gg/allaccess" className="discord-footer">
            <img src={discordIcon} alt='instagram' />
            Join Discord
          </a>
        <div className="footer-menu">
          <a href="/about">About</a>
          <a href="/faq">FAQ</a>
          <a href="https://app.termly.io/document/privacy-policy/a4392d90-b98f-43fd-869f-bcebff5f824e">Privacy Policy</a>
          <a href="https://app.termly.io/document/terms-of-use-for-online-marketplace/ceda0a5f-9bb5-48c5-ad28-559e96a5cd76">Terms Of Service</a>
          <a href="https://app.termly.io/document/cookie-policy/2050497c-8f1c-4a9b-88a7-a90fbaf92694">Cookie Policy</a>
          <a href="https://app.termly.io/document/disclaimer/750deeda-fb68-48a8-a3e3-5c40c619ec2d">Disclaimer of Liability</a>
          <a href="/contact">Contact Us</a> 
        </div>
        

        <div className="footer-social-right">
          <a href="https://instagram.com/allaccessnft">
            <img src={InstagramIcon} alt='instagram' />
          </a>
          <a href="https://twitter.com/allaccessnft">
            <img src={TwitterIcon} alt='twitter' />
          </a>
          <a href="https://www.reddit.com/r/AllAccessNFT/">
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