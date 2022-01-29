import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, {
  EffectCoverflow,Pagination
} from 'swiper';
import 'swiper/css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow'

import moment from 'moment';

import TestImage from 'assets/images/test.jfif'

import * as ROUTES from 'constants/routes';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';

import './styles.scss'
import { Spinner, useControllableState } from '@chakra-ui/react';

SwiperCore.use([EffectCoverflow,Pagination]);

function DropList() {
  const navigate = useNavigate();

  const [drops, setDrops] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDropList = async () => {
      const response = await fetch(API.DROP_LIST, OPTIONS.GET);
      const data = await response.json();
      setDrops(data);
      setLoading(false);
    }
    
    fetchDropList();
  }, [])
  
  const handleDropClick = (drop) => {
    navigate(ROUTES.DROP_DETAIL.replace(':drop_num', drop.drop_num));
  } 
 
  let tester = 0;
  if (drops != undefined) {
    tester++;
  }

  const checkBuyingDate = (drop) => {
    const now = moment();
    const startdropDate = moment(drop.presale_start);
    const enddropDate = moment(drop.presale_end);
    if (now.isBetween(startdropDate, enddropDate)) {
      return "btn_carrousel_buy";
    } else {
      return "btn_carrousel_buy_disabled";
    }
  }
  if (tester > 3) {
  return loading ? (
    <Spinner color='white' />
  ) : (
    <Swiper
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      className="drop-swiper"
      loop={true}
    >
    {drops.map(drop =>
          <SwiperSlide >
            <img src={drop.image} alt="nft" className="image-nft-drop" />
            <div className="drop-desc">{drop.title}</div>
            <div class="buttons-wrapper">
              <a className="btn_carrousel" key={`drop-${drop.drop_num}`} onClick={() => handleDropClick(drop)}>Learn More</a>
              <a className={checkBuyingDate(drop)} href="#">Buy Now</a>
            </div>
          </SwiperSlide>
      )}
    </Swiper>
  )
}else{  
  return loading ? (
    <Spinner color='white' />
  ) : (
    <div className="drop-less-wrapper">
      {drops.map(drop =>
      <div className="drop-less-box">
        <img src={drop.image} alt="nft" className="image-nft-drop" />
        <div className="drop-desc">{drop.title}</div>
        <div class="buttons-wrapper">
          <a className="btn_carrousel" key={`drop-${drop.drop_num}`} onClick={() => handleDropClick(drop)}>Learn More</a>
          <a className={checkBuyingDate(drop)} href="#">Buy Now</a>
        </div>
      </div>)}
    </div>
  )
}
  //return loading ? (
    //  <Spinner color='white' />
    //) : (
    //  drops.map(drop =>
    //        <div className="no_carrousel_slider">
    //          <img src={drop.image} alt="nft" className="image-nft-drop" />
    //          <div className="drop-desc">{drop.description}</div>
    //          <a className="btn_carrousel" href="#">Learn More</a>
    //          <a className="btn_carrousel_buy" href="#">Buy Now</a>
    //        </div>
    //    )
    //)
}

export default DropList;