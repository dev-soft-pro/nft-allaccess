import React, { useContext } from 'react'
import { Link as RouterLink } from "react-router-dom";
import * as ROUTES from 'constants/routes';
import './styles.scss'

import DropList from 'components/Home/DropList'




import { Context } from 'Context'
import Page from 'components/Page'; 

import HowItWorksImage1 from 'assets/images/how-it-works/1.png'
import HowItWorksImage2 from 'assets/images/how-it-works/2.png'
import HowItWorksImage3 from 'assets/images/how-it-works/3.png'
import background_image from 'assets/images/Roadmap-background.png'

function Home() {
  const { cookies, removeAuth } = useContext(Context);

  return (
    <Page>
      <div className="home-container">
        <DropList />  
        <div className="new-background">
        <img className="background-image" src={background_image}/>        
        <div className="how-it-works">
            <h2>How It Works</h2>
            <div className="how-it-works-container">
                <div className="how-it-works-item">
                    <div className="how-it-works-item-text">
                        <h3>Purchase your collectible</h3>
                        <p>Look out for future collections by joining our communities</p>
                    </div>
                    <img src={HowItWorksImage1}/> 
                </div> 
                <div className="how-it-works-item">
                    <div className="how-it-works-item-text">
                        <h3>Reveal NFT</h3>
                        <p>Open your collectable and redeem your All Access Points for exclusive experiences</p>
                    </div>
                    <img src={HowItWorksImage2}/> 
                </div> 
                <div className="how-it-works-item">
                    <div className="how-it-works-item-text">
                        <h3>Anticipate the next drop</h3>
                        <p>Look out for future collections by joining our communities</p>
                    </div>
                    <img src={HowItWorksImage3}/> 
                </div> 
            </div>   
        </div>

        <div className="roadmap-desktop">
        <h2>Roadmap</h2>
        <div className="roadmap">
        
            <div className="roadmap-top">
        
                <div className="roadmap-item">
                    <h3>1. Research and Development</h3>
                    <p> Combining the experience of our allstar development team, we formed a first of its kind collectibles company. With the announcement of key partnerships we plan to connect fans, collectors and investors like never before. </p>
                </div>
        
                <div className="roadmap-item">
                    <h3>3. All Access Case/Pass Launch</h3>
                    <p> Target date to launch is beggining of February. Hosting an exclusive private sale 48 hours prior to launch, this ensures community members are rewarded. NFT's will have an affordable price point of $50-$100 USD. </p>
                </div>
        
                <div className="roadmap-item">
                    <h3>5. All Access Pass/Card Launch</h3>
                    <p>Target date to launch is middle of February. All Access pass holders will have the ability to purchase limited inventory 48 hours prior to launch. These Collectable Cards will hold they keys to the high tier rewards being offered. </p>
                </div>
            </div>
            <div className="height-line"></div>
            <div className="roadmap-bottom">
                <div className="roadmap-item">
                    <h3>2. Creating Quality</h3>
                    <p>Working with top artists to create highly desirable collectibles to ensure we remains one of a kind. All Access collectibles will range from a variety of Cases, Packs, Passes and Cards.  </p>
                </div>
        
                <div className="roadmap-item">
                    <h3>4. Marketplace &amp; All Access Zone</h3>
                    <p>The peer to peer marketplace and All Access Zone will be launched shortly after the Case/Pass Launch. This allows users to buy/sell from each other along with a store to purchase experiences and redeem rewards. </p>
                </div>
            </div>
        </div>
        </div>
        <div className="mobile-roadmap">
        <h2>Roadmap</h2>
        <div className="roadmap">
        
            <div className="roadmap-top">
        
                <div className="roadmap-item">
                    <h3>1. Research and Development</h3>
                    <p> Combining the experience of our allstar devleopment team, we formed a first of its kind collectibles company. With the announcement of key partnerships we plan to connect fans, collectors and investors like never before. </p>
                </div>
        
                <div className="roadmap-item">
                    <h3>2. Creating Quality</h3>
                    <p>Working with top artists to create highly desirable collectibles to ensure we remains one of a kind. All Access collectibles will range from a variety of Cases, Packs, Passes and Cards.  </p>
                </div>

                <div className="roadmap-item">
                    <h3>3. All Access Case/Pass Launch</h3>
                    <p> Target date to launch is beggining of February. Hosting an exclusive private sale 48 hours prior to launch, this ensures community members are rewarded. NFT's will have an affordable price point of $50-$100 USD. </p>
                </div>
        
                <div className="roadmap-item">
                    <h3>4. Marketplace &amp; All Access Zone</h3>
                    <p>The peer to peer marketplace and All Access Zone will be launched shortly after the Case/Pass Launch. This allows users to buy/sell from each other along with a store to purchase experiences and redeem rewards. </p>
                </div>
        
                <div className="roadmap-item">
                    <h3>5. All Access Pass/Card Launch</h3>
                    <p>Target date to launch is middle of February. All Access pass holders will have the ability to purchase limited inventory 48 hours prior to launch. These Collectable Cards will hold they keys to the high tier rewards being offered. </p>
                </div>
            
            </div>
        </div>
        </div>
        </div>
      </div>


    </Page>
  )
}

export default Home
