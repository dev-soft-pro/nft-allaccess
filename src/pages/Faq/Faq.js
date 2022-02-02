import { ClassNames } from '@emotion/react';
import Page from 'components/Page';
import React, { useState } from 'react'
import { useLinkClickHandler } from 'react-router-dom';
import './styles.scss'


function Faq() {
  const [isActive, setIsActive] = useState(false),[isActive2, setIsActive2] = useState(false),[isActive3, setIsActive3] = useState(false),[isActive4, setIsActive4] = useState(false),[isActive5, setIsActive5] = useState(false),[isActive6, setIsActive6] = useState(false),[isActive7, setIsActive7] = useState(false),[isActive8, setIsActive8] = useState(false),[isActive9, setIsActive9] = useState(false),[isActive10, setIsActive10] = useState(false),[isActive11, setIsActive11] = useState(false),[isActive12, setIsActive12] = useState(false),[isActive13, setIsActive13] = useState(false),[isActive14, setIsActive14] = useState(false),[isActive15, setIsActive15] = useState(false),[isActive16, setIsActive16] = useState(false),[isActive17, setIsActive17] = useState(false),[isActive18, setIsActive18] = useState(false),[isActive19, setIsActive19] = useState(false),[isActive20, setIsActive20] = useState(false),[isActive21, setIsActive21] = useState(false);
  return (
    <Page>
      <div className="faq-container">
        
        <div className="faq-title">
          <h1>Frequently Asked Questions</h1>
        </div>

        <hr/>

        <div className="faq-general">
          <h2>General</h2>

          <div onClick={()=> isActive ? setIsActive(false): setIsActive(true)} className={`faq-item ${isActive ? "active" : ""} `}>
            <h3>What is All Access? ▼</h3>
            <div className="faq-answer">
              <p>All Access is a new type of NFT company. We aim to offer the thrill of collecting with the security of the blockchain. All Access offers a great opportunity to purchase collectible cards and earn All Access Points (AAPs) which can be redeemed for unique collectables and experiences.</p>
            </div>
          </div>

          <div onClick={()=> isActive2 ? setIsActive2(false): setIsActive2(true)} className={`faq-item ${isActive2 ? "active" : ""} `}>
            <h3>What is a blockchain? ▼</h3>
          
            <div className="faq-answer">
              <p>Blockchain is a shared process of recording transactions and tracking assets in a digital network. A blockchain is a list of transactions that anyone can view and verify. Blockchain technology power networks make it possible to transfer value online without the need for a middleman like a bank or credit card company.</p>
            </div>
          </div>

          <div onClick={()=> isActive3 ? setIsActive3(false): setIsActive3(true)} className={`faq-item ${isActive3 ? "active" : ""} `}>
            <h3>What Blockchain does All Access use? ▼</h3>
          
            <div className="faq-answer">
              <p>All Access NFTs are currently minted on the Polygon blockchain, which is an Ethereum-compatible layer 2 solution. Polygon allows for the interoperability between several scaling technologies and is quickly becoming one of Ethereum's main L2 solutions.</p>
            </div>
          </div>

          <div onClick={()=> isActive4 ? setIsActive4(false): setIsActive4(true)} className={`faq-item ${isActive4 ? "active" : ""} `}>
            <h3>How can I buy an All Access NFT? ▼</h3>
          
            <div className="faq-answer">
              <p>There are three ways of buying a NFT on our marketplace</p>
              <ul>
                <li>Through announced drops: When All Access incorporates another NFT or highlighted athlete we will clearly list the drop details and fees on the website and all of our social media.</li>
                <li>Through our marketplace (coming soon): At any time, you can access the All Access Marketplace and check out NFTs that other users are selling. You'll be able to select the NFT you want and use a wide variety of payment options.</li>
                <li>Purchase on a third party marketplace such as Opensea. If purchasing on Opensea make sure you verify the contract address. This will allow you to take full ownership of your NFT and keep or sell however you like.</li>
              </ul>
            </div>
          </div>

          <div onClick={()=> isActive5 ? setIsActive5(false): setIsActive5(true)} className={`faq-item ${isActive5 ? "active" : ""} `}>
            <h3>How can I sell an All Access NFT? ▼</h3>
          
            <div className="faq-answer">
              <p>With our unique system we are allowing users to buy and sell on our marketplace or take full ownership and transfer to your own polygon wallet. You can then sell your NFT on any available marketplace that accepts NFTs built on the polygon network.</p>
            </div>
          </div>

          <div onClick={()=> isActive6 ? setIsActive6(false): setIsActive6(true)} className={`faq-item ${isActive6 ? "active" : ""} `}>
            <h3>What is an NFT? ▼</h3>
          
            <div className="faq-answer">
              <p>An NFT, or non-fungible token, is a unique, identifiable digital asset stored on the blockchain. An NFT could be a piece of digital artwork, a collectible, or even a digital representation of a real-life physical asset. Ownership of an NFT is easily and uniquely verifiable due to its contract address on the blockchain.</p>
            </div>
          </div>

          <div onClick={()=> isActive7 ? setIsActive7(false): setIsActive7(true)} className={`faq-item ${isActive7 ? "active" : ""} `}>
            <h3>What does it mean to “mint” an All Access NFT? ▼</h3>
          
            <div className="faq-answer">
              <p>Minting refers to the process of placing a digital file, or a digital piece of art on the blockchain and securing it within the blockchain. Once an NFT is minted, you can verify ownership, validity, rarity and buy, sell, and trade the NFT on our marketplace.</p>
            </div>
          </div>

          <div onClick={()=> isActive8 ? setIsActive8(false): setIsActive8(true)} className={`faq-item ${isActive8 ? "active" : ""} `}>
            <h3>What does an All Access NFT cost? ▼</h3>
            <div className="faq-answer">
              <p>All Access NFTs will be available via mystery cases and packs much like real life trading cards. The cost of these cases/packs are estimated to range between $55 - $75 for the first launch.Price is subject to change as additional drops come to our All Access system. </p>
            </div>
          </div>
        </div>

        <hr/>

        <div className="faq-payments">
          <h2>Payments</h2>

          <div onClick={()=> isActive9 ? setIsActive9(false): setIsActive9(true)} className={`faq-item ${isActive9 ? "active" : ""} `}>
            <h3>What payment methods are available to use? ▼</h3>
          
            <div className="faq-answer">
              <p>We are offering Credit and Debit card payments through our partner Circle and cryptocurrency payments via Coinbase using BTC, BCH, LTC, DOGE, USDC & DAI or our Web3 Walletconnect using MetaMaks or Trustwallet to pay with Matic.</p>
            </div>
          </div>

          <div onClick={()=> isActive10 ? setIsActive10(false): setIsActive10(true)} className={`faq-item ${isActive10 ? "active" : ""} `}>
            <h3>What is Matic and how do I get it? ▼</h3>
          
            <div className="faq-answer">
              <p>https://polygon.technology/</p>
            </div>
          </div>

          <div onClick={()=> isActive11 ? setIsActive11(false): setIsActive11(true)} className={`faq-item ${isActive11 ? "active" : ""} `}>
            <h3>How do I set up a wallet? ▼</h3>
          
            <div className="faq-answer">
              <p>Upon launch we will have user creation that allows you to create a unique login and profile on All Access. This will make and link a custodial wallet to your account where all transactions happen and your NFT is stored. The custodial wallet enables the ease of use All Access aims for its users. We will have instructions on how to create a non-custodial wallet if you choose to transfer your NFTs out to one. We will not have any requirements to transfer out to your non-custodial wallets.</p>
            </div>
          </div>

          <div onClick={()=> isActive12 ? setIsActive12(false): setIsActive12(true)} className={`faq-item ${isActive12 ? "active" : ""} `}>
            <h3>How do I create a Metamask wallet? ▼</h3>
          
            <div className="faq-answer">
              <p>Please follow the steps in one of the below guides on Metamask and connect Polygon to it.</p>
              <br/>
              <br/>
              <p>Written guides:</p>
              <a href="https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/">Polygon Guide</a>
              <br/>
              <a href="https://medium.com/stakingbits/setting-up-metamask-for-polygon-matic-network-838058f6d844#:~:text=Setup%20MetaMask%20to%20connect%20to,Network%20Name%3A%20Polygon">Medium Guide</a>
              <br/>
              <br/>
              <p>Metamask setup:</p>
              <a href="https://www.youtube.com/watch?v=Af_lQ1zUnoM&t=0s">Youtube Metamask Guide</a>
              <br/>
              <br/>
              <p>Polygon Setup guide:</p>
              <a href="https://www.youtube.com/watch?v=LAv_wpDVLlM&ab_channel=MoneyZG">Youtube Polygon Guide</a>

            </div>
          </div>

          <div onClick={()=> isActive13 ? setIsActive13(false): setIsActive13(true)} className={`faq-item ${isActive13 ? "active" : ""} `}>
            <h3>What happens if I lose access to my wallet/address? ▼</h3>
          
            <div className="faq-answer">
              <p>With our custodial wallet the NFT will be stored on site in our secure and backed up servers.</p>
              <p>If you are creating your own external account please follow these suggestions.The best way to prevent a lost wallet or wallet address is to make physical copies of your seed phrase (“Secret Recovery Phrase”) and store these copies in places you know and trust. Unfortunately, not a lot can be done if you’ve lost every copy of your wallet seed phrase, so please ensure to keep it safe. Never share your wallet seed phrase with anyone. We will never ask for this information.</p>
            </div>
          </div>

          <div onClick={()=> isActive14 ? setIsActive14(false): setIsActive14(true)} className={`faq-item ${isActive14 ? "active" : ""} `}>
            <h3>Where can I see my NFT? ▼</h3>
          
            <div className="faq-answer">
              <p>Once the NFT has been claimed (or “minted”), you will be able to login to your account on the All Access website to view your NFT Collection. If you transfer to a non-custodial you can view your NFTs within your wallet. You can also use the All Access marketplace or on other secondary NFT marketplaces.</p>
            </div>
          </div>

          <div onClick={()=> isActive15 ? setIsActive15(false): setIsActive15(true)} className={`faq-item ${isActive15 ? "active" : ""} `}>
            <h3>Why no Token? ▼</h3>
          
            <div className="faq-answer">
              <p>Our mission is to bring value through redemption and legitimacy to the market that can sustain the real world market. With no token we eliminate the buy and sell pressure of an exchange and allow the true value of the NFT to shine.</p>
            </div>
          </div>

          <div onClick={()=> isActive16 ? setIsActive16(false): setIsActive16(true)} className={`faq-item ${isActive16 ? "active" : ""} `}>
            <h3>What is your refund policy? ▼</h3>
          
            <div className="faq-answer">
              <p>Due to the nature of NFT and blockchain technology there will be no returns, exchanges or refunds accepted. We are delivering a unique collectable linked to the blockchain and your transaction is not reversible. Should you have any questions feel free to reach us at support@allaccessnft.io or live chat on our Discord server at discord.gg/allaccess</p>
            </div>
          </div>

          <div onClick={()=> isActive17 ? setIsActive17(false): setIsActive17(true)} className={`faq-item ${isActive17 ? "active" : ""} `}>
            <h3>What about gas fees? ▼</h3>
          
            <div className="faq-answer">
              <p>We have built our NFTs on the polygon network, because of this it allows All Access to cover all gas fees for minting your NFT. </p>
            </div>
          </div>

          <div onClick={()=> isActive18 ? setIsActive18(false): setIsActive18(true)} className={`faq-item ${isActive18 ? "active" : ""} `}>
            <h3>What other fees does All Access charge? ▼</h3>
          
            <div className="faq-answer">
              <p>There will be a fee of 2.5% on all credit card transactions and there will still be a gas fee to transfer your NFT to an external wallet. </p>
            </div>
          </div>

          <div onClick={()=> isActive19 ? setIsActive19(false): setIsActive19(true)} className={`faq-item ${isActive19 ? "active" : ""} `}>
            <h3>Why not accept ETH? </h3>
          
            <div className="faq-answer">
              <p>Currently ETH network charges high gas fees and delayed responses, due the the rate at which transactions are handled we have made the choice to limit the use of ETH on our platform. If you transfer your NFT to your personal wallet and sell on another marketplace you may use ETH but will be required to handle all fees yourself.</p>
            </div>
          </div>

          <div onClick={()=> isActive20 ? setIsActive20(false): setIsActive20(true)} className={`faq-item ${isActive20 ? "active" : ""} `}>
            <h3>Do you require KYC? ▼</h3>
          
            <div className="faq-answer">
              <p>In order to comply with financial regulations, All Access members will go through a KYC process when larger sums of money(over 2999.99) are either being spent or on any payout to a non Web3 wallet. Our current process will require KYC on all withdrawal of funds from the All Access marketplace using non web3 wallets.. We have partnered with industry leader Prove to provide our KYC and AML services.</p>
            </div>
          </div>

          <div onClick={()=> isActive21 ? setIsActive21(false): setIsActive21(true)} className={`faq-item ${isActive21 ? "active" : ""} `}>
            <h3>What's in a case? ▼</h3>
          
            <div className="faq-answer">
              <p>All Access cases hold something special, your pass to the drop. Although you are not required to purchase a pass it will give you something special. You will receive one of 5 rarities of passes. These passes are also NFTs. Each one allows you to claim and purchase a set number of Collectable cards during presale to their respective collection. You may also receive a discount during presale for certain collections.</p>
            </div>
          </div>
        </div>

        <div className="faq-title">
          <h1>For additional questions join our community or contact us</h1>
        </div>
      </div>
    </Page>
  )
}


export default Faq

