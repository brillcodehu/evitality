"use client";
import React, { useState } from "react";

const NewsLetter = () => {
  const [sent, setSent] = useState(false);
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
    window.setTimeout(() => setSent(false), 4000);
  };
  return (
    <>
      <div className="inner-content wow fadeInUp" data-wow-delay="0.8s">
        <div className="row justify-content-between align-items-center">
          <div className="text-center text-lg-start col-xl-6 m-lg-b20">
            <h2 className="title">Iratkozz fel a hírlevélre</h2>
            <p>
              {sent
                ? "Köszönjük, sikeresen feliratkoztál!"
                : "Heti egy gyakorlatias tipp edzésről és táplálkozásról."}
            </p>
          </div>
          <div className="text-center text-lg-end col-xl-6">
            <form className="dzSubscribe" onSubmit={sendEmail}>
              <div className="dzSubscribeMsg"></div>
              <div className="form-group mb-0">
                <div className="input-group mb-0">
                  <div className="input-skew ">
                    <input
                      name="dzEmail"
                      required
                      type="email"
                      className="form-control"
                      placeholder="E-mail címed"
                    />
                  </div>
                  <div className="input-group-addon">
                    <button
                      name="submit"
                      type="submit"
                      className="btn btn-secondary btn-lg btn-skew"
                    >
                      <span>Feliratkozom</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsLetter;
