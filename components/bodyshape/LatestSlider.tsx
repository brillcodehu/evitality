"use client";
import React from "react";
import { Link } from "./Link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import { IMAGES } from "./theme";

const dataBlog = [
  {
    image1: IMAGES.bloggrid1,
    image2: IMAGES.avatar1,
    author: "Nagy Viktória",
    title: "Hogyan tartsd formában a tested",
    date: "2026. máj. 17.",
  },
  {
    image1: IMAGES.bloggrid2,
    image2: IMAGES.avatar2,
    author: "Nagy Viktória",
    title: "A fitnesz filozófiája",
    date: "2026. máj. 18.",
  },
  {
    image1: IMAGES.bloggrid3,
    image2: IMAGES.avatar3,
    author: "Nagy Viktória",
    title: "50 legjobb tipp a fitneszhez",
    date: "2026. máj. 17.",
  },
];

function LatestSlider() {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const paginationRef = React.useRef(null);
  return (
    <div className="container">
      <div className="row justify-content-between align-items-center m-b10">
        <div className="col-xl-7">
          <div className="section-head text-center text-md-start">
            <h2 className="title">
              Friss <span>hírek</span>
            </h2>
          </div>
        </div>
        <div className="col-xl-5 text-md-end d-flex align-items-center justify-content-xl-end justify-content-sm-between justify-content-center m-sm-b30 m-b40">
          <div className="num-pagination">
            <div className="swiper-blog-prev btn-prev" ref={navigationPrevRef}>
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div
              className="swiper-blog-pagination1 swiper-pagination style-1"
              ref={paginationRef}
            ></div>
            <div className="swiper-blog-next btn-next" ref={navigationNextRef}>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <Link
            to={"/blog"}
            className="btn btn-primary btn-skew d-none d-sm-block"
          >
            <span>Összes</span>
          </Link>
        </div>
      </div>
      <Swiper
        className="swiper blog-slider-full blog-slider-wrapper"
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        speed={1500}
        autoplay={{
          delay: 3000,
        }}
        navigation={{
          nextEl: ".btn-next",
          prevEl: ".btn-prev",
        }}
        pagination={{
          el: ".swiper-blog-pagination1",
          clickable: true,
          renderBullet: function (index, className) {
            return (
              '<span class="' + className + '"> 0' + (index + 1) + "</span>"
            );
          },
        }}
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={{
          1200: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
            centeredSlides: false,
          },
          320: {
            slidesPerView: 1,
            centeredSlides: false,
          },
        }}
      >
        {dataBlog.map((item, ind) => (
          <SwiperSlide key={ind}>
            <div className="dz-card style-1 overlay-shine">
              <div className="dz-media">
                <Link to={"/blog"}>
                  <img src={item.image1} alt="" />
                </Link>
              </div>
              <div className="dz-info">
                <div className="dz-meta">
                  <ul>
                    <li className="post-author">
                      <Link to={"#"}>
                        <img src={item.image2} alt="" />
                        <span>{item.author}</span>
                      </Link>{" "}
                    </li>
                    <li className="post-date">
                      <Link to={"#"}> {item.date}</Link>
                    </li>
                  </ul>
                </div>
                <h4 className="dz-title">
                  <Link to={"/blog"}>{item.title}</Link>
                </h4>
                <p>
                  Gyakorlatias, kipróbált tanácsok edzésről, táplálkozásról és
                  motivációról.
                </p>
                <Link to={"/blog"} className="btn btn-primary btn-skew">
                  <span>Tovább</span>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export default LatestSlider;
