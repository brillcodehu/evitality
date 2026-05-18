"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { IMAGES } from "./theme";

const dataBlog = [
  {
    image: IMAGES.avatarlarge1,
    text: "Évek óta próbálkoztam egyedül, eredmény nélkül. Itt 16 hét alatt nemcsak lefogytam, hanem végre megszerettem a mozgást. Reális tervet kaptam, ami beleférhetett az életembe.",
    name: "Kovács Anita",
    position: "Ügyfél",
  },
  {
    image: IMAGES.avatarlarge2,
    text: "A személyre szabott edzés és a folyamatos visszajelzés mindent megváltoztatott. Erősebb vagyok, mint valaha, és először érzem azt, hogy ez tartós lesz.",
    name: "Tóth Gábor",
    position: "Ügyfél",
  },
  {
    image: IMAGES.avatarlarge3,
    text: "Szülés után teljesen elvesztettem a formám és az önbizalmam. Türelmesen, lépésről lépésre vezetett vissza. Ma újra jól érzem magam a bőrömben.",
    name: "Nagy Eszter",
    position: "Ügyfél",
  },
];

function ClientSlider() {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const paginationRef = React.useRef(null);
  return (
    <>
      <Swiper
        className="testimonial-swiper"
        slidesPerView={"auto"}
        spaceBetween={0}
        loop={true}
        speed={1500}
        navigation={{
          nextEl: ".btn-next",
          prevEl: ".btn-prev",
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
          renderBullet: function (index, className) {
            return (
              '<span class="' + className + '"> 0' + (index + 1) + "</span>"
            );
          },
        }}
        modules={[Navigation, Pagination]}
      >
        {dataBlog.map((item, ind) => (
          <SwiperSlide key={ind}>
            <div className="testimonial-1">
              <div className="testimonial-pic">
                <img src={item.image} alt="" />
              </div>
              <ul className="testimonial-rating">
                <li>
                  <i className="fa-solid fa-star"></i>
                </li>
                <li>
                  <i className="fa-solid fa-star"></i>
                </li>
                <li>
                  <i className="fa-solid fa-star"></i>
                </li>
                <li>
                  <i className="fa-solid fa-star"></i>
                </li>
                <li>
                  <i className="fa-solid fa-star"></i>
                </li>
              </ul>
              <div className="testimonial-info">
                <p className="testimonial-text">{item.text}</p>
                <h4 className="testimonial-name">{item.name}</h4>
                <span className="testimonial-position text-primary">
                  {item.position}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="num-pagination">
          <div
            className="testimonial-button-prev btn-prev"
            ref={navigationPrevRef}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <div className="swiper-pagination style-1" ref={paginationRef}></div>
          <div
            className="testimonial-button-next btn-next"
            ref={navigationNextRef}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </Swiper>
    </>
  );
}
export default ClientSlider;
