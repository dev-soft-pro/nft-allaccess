import React, { useContext } from 'react'
import { Link as RouterLink } from "react-router-dom";
import * as ROUTES from 'constants/routes';
import './styles.scss'





import { Context } from 'Context'
import Page from 'components/Page'; 

import InstagramIco from 'assets/images/social/instagram.png'
import TwitterIco from 'assets/images/social/twitter.png'

function About() {
  const { cookies, removeAuth } = useContext(Context);

  return (
    <Page>
        <div className="about-container">
            <div className="about-top">
                <h1>About All Access</h1>
                <p>It's a new era for unique collectables and we are about to change the way people collect, invest and redeem real world rewards. All Access provides premium NFT collectibles and brings the latest in collectable NFT’s to life. With partnerships throughout the sports world, history will be made and we are here to take you to the next level. Supporting your favorite athlete or just collecting sets for a once in a lifetime experience. All Access will bridge the gap between blockchain and real world utility.</p>
                
            </div>
            <h7>Founders</h7>
            <hr/>

            <div className="about-person">
                <h2 className="person-title p-title-mobile">Anthony “Showtime” Pettis - MMA Legend | Co-Foundeer</h2>
                <div className="about-person-image">
                    <video className="person-video" muted={true} loop={true} autoPlay={true} playsInLine={true} controls={false}>
                        <source src={'https://storage.googleapis.com/all_access_nft_bucket/assets/An.%20ID%20.mp4'} type="video/mp4"/>
                    </video>
                    <h3>Anthony Pettis<br/>MMA Legend</h3>
                </div>
                <div className="about-person-info">
                    <div className="about-person-info-top">
                        <h2 className="person-title p-title-desktop">Anthony “Showtime” Pettis - MMA Legend | Co-Foundeer</h2>
                        <div className="person-social">
                            <a target="_blank" href="#"><img src={InstagramIco} alt="Instagram" className="margin-fix" /></a>
                            <a target="_blank" href="#"><img src={TwitterIco} alt="Twitter"/></a>
                        </div>
                    </div>
                    <p>Leo is a 7 year veteran of the US Coast Guard and achieved the rank of E-5, Petty Officer Second Class. After service, Leo dedicated his time to network security and infrastructure design. Leo has worked in both the private sector as an IT consultant and the public sector working as a system, network, and security engineer. Currently, he is employed with the US Air force as a Database and Applications Specialist.</p>
                    <br/>
                    <p>Since 2012, Leo has been developing and maintaining a variety of crypto mining operations. This ranges from BTC and Ethereum all the way to more opportunistic markets such as Ravencoin. Most recently, he has been using his data and analytical skills to develop unique algorithms in the blockchain industry, allowing projects to capitalize and adjust to market trends. Leo now brings his advanced work ethic and valuable knowledge of data to All Access as the CTO and Co-Founder.</p>
                    <br/>
                    <p>Leo's interests include video games, collectable cards, and spending time with his family. Leo is an avid MMA fan and enjoys watching events with his friends.</p>
                </div>
            </div>

            <hr/>

            <div className="about-person">
                <div className="about-person-image">
                    <h2 className="person-title p-title-mobile">Leo Rodriguez – Chief Technology Officer | Co-Founder</h2>
                        
                    <video className="person-video" muted={true} loop={true} autoPlay={true} playsInLine={true} controls={false}>
                        <source src={"https://storage.googleapis.com/all_access_nft_bucket/assets/Leo.mp4"} type="video/mp4"/>
                    </video>
                    
                    <h3>Leo Rodriguez<br/>CTO</h3>
                </div>
                <div className="about-person-info">
                    <div className="about-person-info-top">
                        <h2 className="person-title p-title-desktop">Leo Rodriguez – Chief Technology Officer | Co-Founder</h2>
                        <div className="person-social">
                            <a target="_blank" href="#"><img src={InstagramIco} alt="Instagram" className="margin-fix" /></a>
                            <a target="_blank" href="#"><img src={TwitterIco} alt="Twitter"/></a>
                        </div>
                    </div>
                    <p>Leo is a 7 year veteran of the US Coast Guard and achieved the rank of E-5, Petty Officer Second Class. After service, Leo dedicated his time to network security and infrastructure design. Leo has worked in both the private sector as an IT consultant and the public sector working as a system, network, and security engineer. Currently, he is employed with the US Air force as a Database and Applications Specialist.</p>
                    <br/>
                    <p>Since 2012, Leo has been developing and maintaining a variety of crypto mining operations. This ranges from BTC and Ethereum all the way to more opportunistic markets such as Ravencoin. Most recently, he has been using his data and analytical skills to develop unique algorithms in the blockchain industry, allowing projects to capitalize and adjust to market trends. Leo now brings his advanced work ethic and valuable knowledge of data to All Access as the CTO and Co-Founder.</p>
                    <br/>
                    <p>Leo's interests include video games, collectable cards, and spending time with his family. Leo is an avid MMA fan and enjoys watching events with his friends.</p>
                </div>
            </div>
            
            <hr/>

            <div className="about-person">
                <h2 className="person-title p-title-mobile">Altay Ertan – Chief Operating Officer | Co-Founder</h2>
                        
                <div className="about-person-image">
                    <video className="person-video" muted={true} loop={true} autoPlay={true} playsInLine={true} controls={false}>
                        <source src={"https://storage.googleapis.com/all_access_nft_bucket/assets/Altay.mp4"} type="video/mp4"/>
                    </video>
                    <h3>Altay Ertan<br/>COO</h3>
                </div>
                <div className="about-person-info">
                    <div className="about-person-info-top">
                        <h2 className="person-title p-title-desktop">Altay Ertan – Chief Operating Officer | Co-Founder</h2>
                        <div className="person-social">
                            <a target="_blank" href="#"><img src={InstagramIco} alt="Instagram" className="margin-fix" /></a>
                            <a target="_blank" href="#"><img src={TwitterIco} alt="Twitter"/></a>
                        </div>
                    </div>
                    <p>Altay has 20+ years of experience in the Global HR Technology field. He is an advocate for process improvement, developing best practices and thinking outside the box. Altay has worked at the SR level for various Fortune 100 companies which allows him to streamline roadmaps and optimize system impact on businesses. Altay took interest in the blockchain industry in 2016 and looked to bridge the gap from blockchain to the standardized corporate world. </p>
                    <br/>
                    <p>Altay has been involved in multiple blockchain projects to consult and develop streamlined processes for project longevity. Altay was an early adopter of Ravencoin and has helped implement key systems that deliver modern day products. Altay now brings his experience in business systems and process implementation to All Access as COO and Co-Founder.</p>
                    <br/>
                    <p>Altay's interests include his family, sports and classic cars. Altay spends his free time playing and hanging out with his wife and kids. </p>
                </div>
            </div>
            
            <hr/>

            <div className="about-person">
                <h2 className="person-title p-title-mobile">Daniel Silva – Chief Experience Officer | Co-Founder</h2>
                        
                <div className="about-person-image">
                    <video className="person-video" muted={true} loop={true} autoPlay={true} playsInLine={true} controls={false}>
                        <source src={"https://storage.googleapis.com/all_access_nft_bucket/assets/Daniel.mp4"} type="video/mp4"/>
                    </video>
                    <h3>Daniel Silva<br/>CXO</h3>
                </div>
                <div className="about-person-info">
                    <div className="about-person-info-top">
                        <h2 className="person-title p-title-desktop">Daniel Silva – Chief Experience Officer | Co-Founder</h2>
                        <div className="person-social">
                            <a target="_blank" href="#"><img src={InstagramIco} alt="Instagram" className="margin-fix" /></a>
                            <a target="_blank" href="#"><img src={TwitterIco} alt="Twitter"/></a>
                        </div>
                    </div>
                    <p>Daniel manages the online operations of one of the largest Ford dealerships on the west coast. He oversees the day to day activity from all advertisements, price trends and market analysis to maintain key relationships with online vendors. His passion for cars has led him to develop key relationships in the custom automotive industry. Daniel was part of the team to develop the 800 Horsepower Honda Civic seen on Season 2 of Netflix’s Fastest Car. Daniel’s interest in the technology aspect of custom cars helped lead him to the blockchain.</p>
                    <br/>
                    <p>Daniel began researching blockchain's early 2015 before taking his first investment in 2017. Daniel created relationships within the blockchain industry in which he became the Global Social Lead for a project that grew to over $280M Market Cap. Daniel now brings his relationships and experience in content to All Access as CXO and Co-Founder.</p>
                    <br/>
                    <p>Daniel's interests include building custom cars, videogames and spending time with his family. Daniel enjoys driving in the California mountains.</p>
                </div>
            </div>
            
            <hr/>

            <div className="about-person">
                <h2 className="person-title p-title-mobile">Rahul Patel – Chief Financial Officer | Co-Founder</h2>
                        
                <div className="about-person-image">
                    <video className="person-video" muted={true} loop={true} autoPlay={true} playsInLine={true} controls={false}>
                        <source src={"https://storage.googleapis.com/all_access_nft_bucket/assets/Rahul.mp4"} type="video/mp4"/>
                    </video>
                    <h3>Rahul Patel<br/>CFO</h3>
                </div>
                <div className="about-person-info">
                    <div className="about-person-info-top">
                        <h2 className="person-title p-title-desktop">Rahul Patel – Chief Financial Officer | Co-Founder</h2>
                        <div className="person-social">
                            <a target="_blank" href="#"><img src={InstagramIco} alt="Instagram" className="margin-fix" /></a>
                            <a target="_blank" href="#"><img src={TwitterIco} alt="Twitter"/></a>
                        </div>
                    </div>
                    <p>Rahul is a financial entrepreneur. He has spent the last 6 years working with high net worth individuals at various financial institutions. Rahul developed complex financial strategies to ensure constant wealth growth for his clients and their families. While working with these individuals, Rahul saw a need for high end automotive customization which led him to launch one of Texas’s most sought after Auto Custom shops. While continuing his career in the financial world. Rahul saw the need to create a secondary market in financial consultancy.</p>
                    <br/>
                    <p>Recently, Rahul has turned his attention to the blockchain market assisting in the financial analysis of projects. Rahul continues to invest and develop the financial system while working closely with project developers. Rahul now brings his financial expertise and market predictions to All Access as CFO and Co-Founder.</p>
                    <br/>
                    <p>Rahul's hobbies include working out, customizing cars and training his 1 year old Husky. Rahul spends his free time designing latte art.</p>
                </div>
            </div>


            
        </div>


    </Page>
  )
}

export default About