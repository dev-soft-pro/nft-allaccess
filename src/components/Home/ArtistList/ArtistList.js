import React, { useEffect, useState } from 'react'
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

import UserAvatar from 'assets/images/avatar.png'

import * as ROUTES from 'constants/routes';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';

import './styles.scss'
import { Spinner } from '@chakra-ui/spinner';



SwiperCore.use([EffectCoverflow,Pagination]);

function ArtistList() {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);

  const initData = async () => {
    const response = await fetch(API.ATHLET_LIST, OPTIONS.GET);
    const data = await response.json();
    setAthletes(data);
    setLoading(false);
  }

  useEffect(() => {
    initData();
  }, []);
  let atester = 0;
  if (athletes != undefined) {
    atester++;
  }
  if (atester > 3){
  return loading ? (
    <Spinner color='white' />
  ) : (
    <div className="featured-artists">
      <label className="title">Featured Athletes</label>
      <Swiper
        grabCursor={true}
        slidesPerView="auto"
        className="artist-swiper"
      >
        {athletes.map(athlete =>
          <SwiperSlide key={`athlete-${athlete.id}`}>
            <div className="artist-wrapper">
              <img src={athlete.image} alt="artist-avatar" className="image-artist-avatar" />
              <label>{athlete.name}</label>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
  }else{
    return loading ? (
      <Spinner color='white' />
    ) : (
    <div className="artist-less">    
    <label className="title">Featured Athletes</label>
    <div className="artist-less-wrapper">
        {athletes.map(athlete =>
          <div className="artist-less-box" key={`athlete-${athlete.id}`}>
            <div className="artist-wrapper">
              <img src={athlete.image} alt="artist-avatar" className="image-artist-avatar" />
              <label>{athlete.name}</label>
            </div>
          </div>
        )}
    </div>
    </div>
    )
  }
}

export default ArtistList;