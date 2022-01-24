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

import TestImage from 'assets/images/test.jfif'

import * as ROUTES from 'constants/routes';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';

import './styles.scss'
import { Spinner } from '@chakra-ui/react';

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
        <SwiperSlide key={`drop-${drop.drop_num}`} onClick={() => handleDropClick(drop)}>
          <img src={drop.image} alt="nft" className="image-nft-drop" />
          <div className="drop-desc">{drop.description}</div>
        </SwiperSlide>
      )}
    </Swiper>
  )
}

export default DropList;