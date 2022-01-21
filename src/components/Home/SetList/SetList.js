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

// import UserAvatar from 'assets/images/avatar.png'
import SetSample from 'assets/images/featured_edition.png'

import './styles.scss'

SwiperCore.use([EffectCoverflow,Pagination]);

function SetList() {
  return (
    <div className="featured-setlist">
      <label className="title">Featured Sets</label>
      <Swiper
        grabCursor={true}
        slidesPerView="auto"
        className="set-swiper"
      >
        {[...Array(30).keys()].map(key =>
          <SwiperSlide key={key}>
            <div className="set-wrapper">
              <img src={SetSample} alt="set-avatar" className="image-set-avatar" />
              <label>Wayne Gretzky Sapphire Signed Immortal Statue</label>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}

export default SetList;