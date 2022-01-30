import React, { useState, useEffect, useContext } from 'react'
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
import { Context } from 'Context'

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import './styles.scss'
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

SwiperCore.use([EffectCoverflow,Pagination]);

function PassList(props) {
  const { title, passes, loading } = props;

  return (
    <div className="pass-list">
      <label className="title">{title}</label>
      {passes.length > 0 ? (
        <Swiper
          grabCursor={true}
          slidesPerView="auto"
          className="pass-swiper"
        >
          {passes.map(pass =>
            <SwiperSlide key={`pass-${pass.pass_id}`}>
              <div className="pass-wrapper">
                <label>Pass ID: {pass.pass_id}</label>
                <video loop autoPlay={true} muted={true} playsInline={true}>
                  <source src={pass.revealed ? pass.reveal_vid.reveal_vid : pass.image.image} />
                </video>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
        ) : (
          <div>
            <ClipLoader color={'#ffffff'} loading={loading} size={35} />
          </div>
        )}
    </div>
  )
}

export default PassList;