import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import "./css/BrandSwiper.css";
import { Autoplay } from 'swiper/modules';
import BurBerry from "/images/burberry.jpeg"
import HenryLlyod from "/images/Henri-Lloyd.png"
import RalphLauren from "/images/Ralph-Lauren.png"
import Prada from "/images/prada.jpg"
import ArmaniJeans from "/images/ArmaniJeans.png"
import Lacoste from "/images/lacoste.png"

export default function BrandSwiper() {
  return (
    <>
      <Swiper  grabCursor={true} centeredSlides={true} slidesPerView={'auto'}  autoplay={{delay : 4000, disableOnInteraction : false}} modules={[ Autoplay]} className="mySwiper" >
        <SwiperSlide><img src={BurBerry} alt='BurBerry' /></SwiperSlide>
        <SwiperSlide><img src={HenryLlyod} alt='Henry Llyod' /></SwiperSlide>
        <SwiperSlide><img src={RalphLauren} alt='Ralph Lauren' /></SwiperSlide>
        <SwiperSlide><img src={Prada} alt='Prada' /></SwiperSlide>
        <SwiperSlide><img src={ArmaniJeans} alt='Armani Jeans' /></SwiperSlide>
        <SwiperSlide><img src={Lacoste} alt='Lacoste' /></SwiperSlide>
      </Swiper>
    </>
  );
}
