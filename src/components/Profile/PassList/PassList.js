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
  const { cookies, updateAuthToken } = useContext(Context);

  const [passlist, setPassList] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshToken = async () => {
    const response = await fetch(API.REFRESH, OPTIONS.POST({
      refresh: cookies.refresh_token
    }))
    const data = await response.json();
    return data.access;
  }

  const loadPassesCall = async (token) => {
    const response = await fetch(API.AUTH_PASS, OPTIONS.GET_AUTH(token));
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    const init = async () => {
      const access_token = await refreshToken();
      const authPasses = await loadPassesCall(access_token);
      setPassList(authPasses);
      setLoading(false);
    }
    init();
  }, []);

  return (
    <div className="pass-list">
      <label className="title">All Access Pass</label>
      {passlist.length > 0 ? (
        <Swiper
          grabCursor={true}
          slidesPerView="auto"
          className="pass-swiper"
        >
          {passlist.map(pass =>
            <SwiperSlide key={`pass-${pass.pass_id}`}>
              <div className="pass-wrapper">
                <label>Pass ID: {pass.pass_id}</label>
                <video loop autoPlay={true}>
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