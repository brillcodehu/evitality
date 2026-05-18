"use client";
import React from "react";
import { Link } from "./Link";
import { IMAGES, SVGICON } from "./theme";

const iconBox = [
  { image: IMAGES.aboutlogo1, title: "Edzés & gyakorlatok" },
  { image: IMAGES.aboutlogo2, title: "Egészség & fitnesz" },
  { image: IMAGES.aboutlogo3, title: "Motiváció" },
  { image: IMAGES.aboutlogo4, title: "Helyes táplálkozás" },
];

const PerfectTrainers = () => {
  return (
    <>
      <div className="col-lg-6 m-b30">
        <div className="dz-media ">
          <img
            src={IMAGES.aboutgirl}
            alt=""
            className="wow fadeInUp"
            data-wow-delay="0.6s"
          />
          {SVGICON.multilines}
          <ul>
            <li>
              <span>FITNESZ</span>
            </li>
            <li>
              <span>EGÉSZSÉG</span>
            </li>
            <li></li>
          </ul>
        </div>
      </div>
      <div className="col-lg-6 m-b30 about-content">
        <div className="section-head">
          <span className="sub-title wow fadeInUp" data-wow-delay="0.2s">
            A tökéletes edzésért
          </span>
          <h2 className="title wow fadeInUp" data-wow-delay="0.4s">
            Tökéletes <span>edző</span>
          </h2>
          <p className="wow fadeInUp" data-wow-delay="0.6s">
            Több mint nyolc éve segítek embereknek formába lendülni Debrecenben.
            Személyre szabott edzés- és táplálkozási tervet kapsz, valódi
            támogatással, hogy az eredmény tartós legyen.
          </p>
        </div>
        <div className="row m-t40 m-sm-b20 m-b30">
          {iconBox.map((item, ind) => (
            <div className="col-sm-6 m-sm-b20 m-b30" key={ind}>
              <div className="icon-bx-wraper style-2">
                <div className="icon-bx">
                  <span className="icon-cell">
                    <img src={item.image} alt="" />
                  </span>
                </div>
                <div className="icon-content">
                  <h5 className="dz-title">{item.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="clearfix wow fadeInUp" data-wow-delay="1.0s">
          <Link
            to={"/about"}
            className="btn btn-skew btn-lg btn-primary shadow-primary"
          >
            <span>Rólam bővebben</span>
          </Link>
        </div>
      </div>
    </>
  );
};
export default PerfectTrainers;
