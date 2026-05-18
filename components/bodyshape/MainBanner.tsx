"use client";
import React, { useState } from "react";
import { Link } from "./Link";
import { IMAGES } from "./theme";

const logoBlog = [
  { logo: IMAGES.logo1 },
  { logo: IMAGES.logo2 },
  { logo: IMAGES.logo3 },
];

const iconDropBlog = [
  { title: "Legjobb kar edzés", id: "icon1" },
  { title: "Legjobb térd edzés", id: "icon2" },
  { title: "Legjobb láb edzés", id: "icon3" },
];

const MainBanner = ({ isOpenModal }: { isOpenModal: (v: boolean) => void }) => {
  const [iconTitle, setIconTitle] = useState<string>();
  return (
    <>
      <div
        className="banner-inner"
        style={{ backgroundImage: "url(" + IMAGES.SliderBg1 + ")" }}
      >
        <h2 className="data-text">
          <span>F</span>
          <span>I</span>
          <span>T</span>
          <span>N</span>
          <span>E</span>
          <span>S</span>
          <span>S</span>
        </h2>
        <div className="container">
          <div className="row banner-row">
            <div className="col-lg-6 col-md-7 col-sm-8">
              <div className="banner-content">
                <div className="top-content">
                  <h1 className="title">
                    Maradj formában a{" "}
                    <span className="text-primary">legjobb edződdel</span>
                  </h1>
                  <p>
                    Akár fogyni, formálódni vagy izmot építeni szeretnél, együtt
                    összeállítjuk a hozzád illő programot és megtaláljuk a
                    számodra ideális edzéseket.
                  </p>
                  <div className="d-flex align-items-center">
                    <Link
                      to={"/about"}
                      className="btn btn-skew btn-lg btn-primary shadow-primary"
                    >
                      <span>Kezdjük el</span>
                    </Link>
                    <div className="video-bx4">
                      <Link
                        to={"#"}
                        className="video-btn style-1 popup-youtube"
                        onClick={() => isOpenModal(true)}
                      >
                        <i className="fa fa-play" />{" "}
                        <span className="text">Videó</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="bottom-content">
                  <h4 className="partner-title" data-wow-delay="0.8s">
                    Partnereink
                  </h4>
                  <div className="row">
                    {logoBlog.map((data, ind) => (
                      <div className="col-4" key={ind}>
                        <div className="clients-logo">
                          <img src={data.logo} alt="" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-5 col-sm-4">
              <div
                className="banner-media media1 anm wow fadeInRight"
                data-wow-delay="1s"
                data-speed-x="-2"
                data-speed-scale="-1"
              >
                <img src={IMAGES.sliderpic1} className="main-img" alt="" />
                <ul className="point-list">
                  {iconDropBlog.map((item, ind) => (
                    <li
                      className={`icon-dropdown anm ${
                        item.id === iconTitle ? "show" : ""
                      }`}
                      data-speed-x="-1"
                      data-speed-scale="-1"
                      onClick={() => {
                        setIconTitle(item.id);
                        if (item.id === iconTitle) {
                          setIconTitle("");
                        }
                      }}
                      key={ind}
                    >
                      <i className="fa-solid fa-plus"></i>
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBanner;
