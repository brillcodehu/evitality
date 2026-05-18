"use client";
import React from "react";

import ClientSlider from "./ClientSlider";
import FitnessIdeas from "./FitnessIdeas";
import QuoteBlock from "./QuoteBlock";
import FitnessGoal from "./FitnessGoal";
import MainBanner from "./MainBanner";
import PerfectTrainers from "./PerfectTrainers";
import { IMAGES, SVGICON } from "./theme";
import LeadForm from "./LeadForm";
import { Link } from "./Link";

const Home = () => {
  return (
    <>
      <div className="page-content bg-white">
        <div className="main-bnr-one">
          <MainBanner />
        </div>
        <section className="content-inner about-wrapper1 about-bx1">
          <div className="container">
            <div className="row align-items-center">
              <PerfectTrainers />
            </div>
          </div>
        </section>
        <section className="counter-wrapper1">
          <div className="container">
            <div className="counter-inner bg-dark">
              <div className="row">
                <QuoteBlock />
              </div>
              <svg
                className="triangle1"
                width="250"
                height="70"
                viewBox="0 0 250 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M250 32L0 70L40 0L250 32Z"
                  fill="url(#paint0_linear_58_264)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_58_264"
                    x1="131.123"
                    y1="34.448"
                    x2="-0.36495"
                    y2="34.448"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="1" stopColor="var(--primary-dark)" />
                    <stop offset="1" stopColor="var(--primary)" />
                  </linearGradient>
                </defs>
              </svg>
              <svg
                className="triangle2"
                width="250"
                height="71"
                viewBox="0 0 250 71"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 38.3735L250 0.373535L210 70.3735L0 38.3735Z"
                  fill="url(#paint0_linear_58_261)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_58_261"
                    x1="118.877"
                    y1="35.9255"
                    x2="250.365"
                    y2="35.9255"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="1" stopColor="var(--primary-dark)" />
                    <stop offset="1" stopColor="var(--primary)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <img
              className="man wow fadeInUp"
              data-wow-delay="0.8s"
              src={IMAGES.aboutman}
              alt="man"
            />
          </div>
        </section>
        <section
          className="content-inner about-wrapper2"
          style={{
            backgroundImage: "url(" + IMAGES.BgImage3 + ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="container">
            <div className="row about-bx2 align-items-center">
              <FitnessGoal />
            </div>
          </div>
        </section>
        <section
          className="content-inner overflow-hidden"
          style={{ backgroundImage: "url(" + IMAGES.BgImage1 + ")" }}
        >
          <div className="container">
            <div className="row justify-content-between align-items-center m-b20">
              <div className="col-md-9 col-lg-8 col-xl-7">
                <div className="section-head side-line">
                  <h5 className="sub-title wow fadeInUp" data-wow-delay="0.2s">
                    Szolgáltatások
                  </h5>
                  <h2 className="title wow fadeInUp" data-wow-delay="0.4s">
                    Valósítsd meg a fitnesz céljaid
                  </h2>
                </div>
              </div>
              <div
                className="col-md-3 d-none d-md-block text-md-end wow fadeInUp"
                data-wow-delay="0.6s"
              >
                <Link to={"/services"} className="btn btn-primary btn-skew">
                  <span>Összes</span>
                </Link>
              </div>
            </div>
            <FitnessIdeas />
          </div>
        </section>
        <section
          className="content-inner"
          style={{
            backgroundImage: "url(" + IMAGES.BgImage3 + ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <LeadForm />
        </section>
        <section
          className="content-inner-1 testimonial-wrapper1"
          data-text="FEEDBACK"
          style={{
            backgroundImage: "url(" + IMAGES.BgImage2 + ")",
            backgroundPosition: "center",
          }}
        >
          <div className="container">
            <div className="section-head text-center">
              <h5 className="sub-title wow fadeInUp" data-wow-delay="0.2s">
                VÉLEMÉNYEK
              </h5>
              <h2 className="title wow fadeInUp" data-wow-delay="0.4s">
                Mit mondanak az ügyfelek
              </h2>
            </div>
            <ClientSlider />
          </div>
          <div className="avatar1">
            <img src={IMAGES.avatarlarge1} alt="" />
          </div>
          <div className="avatar2">
            <img src={IMAGES.avatarlarge2} alt="" />
          </div>
          <div className="avatar3">
            <img src={IMAGES.avatar3} alt="" />
          </div>
          <div className="avatar4">
            <img src={IMAGES.avatarlarge1} alt="" />
          </div>
          <div className="avatar5">
            <img src={IMAGES.avatarlarge2} alt="" />
          </div>
          <div className="avatar6">
            <img src={IMAGES.avatar3} alt="" />
          </div>
          <img
            className="svg-shape rotate-360"
            src={SVGICON.circlebigSvg1}
            alt=""
          />
          <img
            className="svg-shape-2 rotate-360"
            src={SVGICON.circlebigSvg2}
            alt=""
          />
        </section>
      </div>
    </>
  );
};

export default Home;
