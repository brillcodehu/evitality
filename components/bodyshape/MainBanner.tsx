"use client";
import React from "react";
import { Link } from "./Link";
import { IMAGES } from "./theme";

const MainBanner = () => {
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
                      to={"/contact"}
                      className="btn btn-skew btn-lg btn-primary shadow-primary"
                    >
                      <span>Kezdjük el</span>
                    </Link>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBanner;
