import React, { useEffect, useState, useContext } from 'react'
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

import * as ROUTES from 'constants/routes';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';

import './styles.scss'
import { Context } from 'Context'
import { Spinner, toast, useControllableState } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

SwiperCore.use([EffectCoverflow,Pagination]);

function DropList() {
  const navigate = useNavigate();

  const [drops, setDrops] = useState();
  const [loading, setLoading] = useState(true);
  const { cookies, walletState, setCart } = useContext(Context);
  const [passId, setPassId] = useState();
  const toast = useToast();



  useEffect(() => {
    const fetchDropList = async () => {
      const response = await fetch(API.DROP_LIST, OPTIONS.GET);
      const data = await response.json();
      setDrops(data);
      const response1 = await fetch(API.PASS_ID, OPTIONS.GET);
      const passId = await response1.json();
      setPassId(passId);
      setLoading(false);
    }
    
    fetchDropList();
  }, [])
  
  const handleDropClick = (drop) => {
    navigate(ROUTES.DROP_DETAIL.replace(':drop_num', drop.drop_num));
  } 

  const handlerBuyClick = () => {
    if (passId.pass_id != undefined){
      let pass_id = passId.pass_id;
      return navigate(ROUTES.PASS_DETAIL.replace(':pass_id', pass_id));
    }
    toast({
      position: 'top',
      title: 'Error',
      description: passId.error,
      status: 'error',
      duration: 9000,
      isClosable: true,})
  }

  const checkBuyingDate = (drop) => {
    const now = moment();
    const startdropDate = moment(drop.presale_start);
    const enddropDate = moment(drop.presale_end);
    if (now.isBetween(startdropDate, enddropDate)) {
      if (passId.pass_id != undefined){
        return "btn_carrousel_buy";
      }
    }
    return "btn_carrousel_buy_disabled";
  }

  return loading ? (
    <Spinner color='white' />
  ) : (
    <div className="slider-home-page">
      {drops.map(drop =>
      <div className="drop-less-box" key={`drop-${drop.drop_num}`}>
        <video src={drop.image} autoPlay={true} playsInline={true} muted={true} loop={true} alt="nft" className="image-nft-drop"></video>
        <div className="buttons-wrapper">
          <a className="btn_carrousel" key={`drop-${drop.drop_num}`} onClick={() => handleDropClick(drop)}>Learn More</a>
          <a className={checkBuyingDate(drop)}  onClick={handlerBuyClick}>Buy Now</a> 
        </div>
      </div>)}
    </div>
     
  )
}

export default DropList;
