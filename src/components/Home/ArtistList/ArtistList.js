import React from 'react'
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

import './styles.scss'

SwiperCore.use([EffectCoverflow,Pagination]);

function ArtistList() {
  return (
    <div className="featured-artists">
      <label className="title">Artists</label>
      <Swiper
        grabCursor={true}
        // centeredSlides={true}
        slidesPerView="auto"
        className="artist-swiper"
      >
        {[...Array(30).keys()].map(key =>
          <SwiperSlide key={key}>
            <div className="artist-wrapper">
              <img src={UserAvatar} alt="artist-avatar" className="image-artist-avatar" />
              <label>Wayne Gretzky</label>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}

export default ArtistList;