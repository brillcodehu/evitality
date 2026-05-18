"use client";
import React, { useState } from "react";
import { Link } from "./Link";
import { IMAGES } from "./theme";

const boxWrapper = [
  { image: IMAGES.boxlog1, title: "Helyes táplálkozás" },
  { image: IMAGES.boxlog2, title: "Egészség & fitnesz" },
  { image: IMAGES.boxlog3, title: "Edzés & gyakorlatok" },
  { image: IMAGES.boxlog4, title: "Motiváció" },
];

const FitnessIdeas = () => {
  const [hoverBox, setHoverBox] = useState(0);
  return (
    <>
      <div className="row">
        {boxWrapper.map((item, index) => (
          <div className="col-xl-3 col-md-6 m-b30" key={index}>
            <div
              className={`icon-bx-wraper style-1 box-hover ${
                index === hoverBox ? "active" : ""
              }`}
              onMouseEnter={() => setHoverBox(index)}
            >
              <div className="icon-bx m-b30">
                <span className="icon-cell">
                  <img src={item.image} alt="" />
                </span>
              </div>
              <div className="icon-content">
                <h5 className="dz-title m-b10">
                  <Link to={"/services"}>{item.title}</Link>
                </h5>
                <p className="m-b25">
                  Személyre szabott megközelítés, mérhető haladás és
                  következetes támogatás a célod eléréséhez.
                </p>
                <Link
                  to={"/services"}
                  className="btn btn-primary shadow-primary btn-skew"
                >
                  <span>Tovább</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FitnessIdeas;
