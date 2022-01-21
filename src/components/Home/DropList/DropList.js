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

import TestImage from 'assets/images/test.jfif'

import './styles.scss'

SwiperCore.use([EffectCoverflow,Pagination]);

function DropList() {
  return (
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
      {[...Array(10).keys()].map(key =>
        <SwiperSlide key={key}>
          <img src={TestImage} alt="nft" className="image-nft-drop" />
        </SwiperSlide>
      )}
    </Swiper>
  )
}

export default DropList;