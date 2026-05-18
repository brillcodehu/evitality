"use client";
import React from "react";
import { Link } from "./Link";
import { IMAGES, SVGICON } from "./theme";
import Logo from "./Logo";

const Footer = () => {
  const update = new Date();
  return (
    <>
      <footer
        className="site-footer style-1 bg-img-fix footer-action"
        style={{ backgroundImage: "url(" + IMAGES.footerbg + ")" }}
        id="footer"
      >
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-md-12">
                <div className="widget widget_about">
                  <div className="footer-logo logo-dark">
                    <Link to={"/"}>
                      <Logo variant="light" />
                    </Link>
                  </div>
                  <p>
                    Fogarasi Éva személyi edző. Személyre szabott edzés és
                    táplálkozás Debrecenben, tartós eredményért.
                  </p>
                  <h6 className="m-b15">Kövess minket</h6>
                  <div className="dz-social-icon style-1">
                    <ul>
                      <li>
                        <Link
                          target="_blank"
                          to="https://www.facebook.com/"
                          rel="noreferrer"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </Link>
                      </li>{" "}
                      <li>
                        <Link
                          target="_blank"
                          to="https://www.instagram.com/?hl=en"
                          rel="noreferrer"
                        >
                          <i className="fab fa-instagram"></i>
                        </Link>
                      </li>{" "}
                      <li>
                        <Link
                          target="_blank"
                          to="https://www.whatsapp.com/"
                          rel="noreferrer"
                        >
                          <i className="fa-brands fa-whatsapp"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.6s"
              >
                <div className="widget widget_locations">
                  <h4 className="footer-title">Elérhetőség</h4>
                  <div className="clearfix">
                    <h6>Debrecen</h6>
                    <p>4025 Debrecen, Piac utca 1.</p>
                    <p>
                      <a href="tel:+36303651000" style={{ color: "inherit" }}>
                        +36 30 365 1000
                      </a>
                    </p>
                    {SVGICON.map}
                  </div>
                </div>
              </div>
              <div
                className="col-xl-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.8s"
              >
                <div className="widget widget_working">
                  <h4 className="footer-title">Nyitvatartás</h4>
                  <ul>
                    <li>
                      <span className="days">Hétfő – Péntek:</span>
                      <span className="time">
                        <Link to={"/contact"}>07:00 – 21:00</Link>
                      </span>
                    </li>
                    <li>
                      <span className="days">Szombat:</span>
                      <span className="time">
                        <Link to={"/contact"}>07:00 – 16:00</Link>
                      </span>
                    </li>
                    <li>
                      <span className="days">Vasárnap zárva</span>
                    </li>
                  </ul>
                  <Link to={"/contact"} className="btn-link">
                    Bővebben <i className="fa-solid fa-arrow-right m-l10"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="footer-bottom">
            <div className="text-center">
              <span className="copyright-text">
                Copyright © {update.getFullYear()} eVitality. Minden jog
                fenntartva.
              </span>
            </div>
          </div>
        </div>
        <img className="girl-img" src={IMAGES.footergril1} alt="" />
        <img
          className="svg-shape-1 rotate-360"
          src={IMAGES.footercircle}
          alt=""
        />
        <img
          className="svg-shape-2 rotate-360"
          src={IMAGES.footercircle}
          alt=""
        />
      </footer>
    </>
  );
};

export default Footer;
