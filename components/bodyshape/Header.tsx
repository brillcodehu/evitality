"use client";
import React, { useState, useEffect } from "react";
import { Link } from "./Link";
import Collapse from "react-bootstrap/Collapse";
import Logo from "./Logo";

type MenuItem = {
  title: string;
  classChange?: string;
  to?: string;
  content?: { title: string; to: string }[];
};

const MenuList: MenuItem[] = [
  { title: "Kezdőlap", to: "/" },
  { title: "Rólam", to: "/about" },
  { title: "Szolgáltatások", to: "/services" },
  { title: "Árak", to: "/pricing" },
  { title: "Blog", to: "/blog" },
  { title: "Kapcsolat", to: "/contact" },
];

const Header = () => {
  const [headerFix, setheaderFix] = useState(false);
  useEffect(() => {
    const onScroll = () => setheaderFix(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="site-header mo-left header header-transparent style-1">
      <div className="top-bar">
        <div className="container">
          <div className="dz-topbar-inner d-flex justify-content-between align-items-center">
            <div className="dz-topbar-left">
              <ul>
                <li>
                  <i className="fa-regular fa-envelope"></i> hello@evitality.hu
                </li>
              </ul>
            </div>
            <div className="dz-topbar-right">
              <ul>
                <li>
                  <i className="fa-regular fa-clock"></i> H–P 06:00 – 20:00
                </li>{" "}
                <li>
                  <i className="fa fa-phone"></i> +36 30 123 4567
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`sticky-header main-bar-wraper navbar-expand-lg ${
          headerFix ? "is-fixed" : ""
        }`}
      >
        <Mainheader MenuList={MenuList} />
      </div>
    </header>
  );
};

export default Header;

export const Mainheader = ({ MenuList }: { MenuList: MenuItem[] }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("");

  const handleMenuActive = (status: string) => {
    setActive(active === status ? "" : status);
  };

  return (
    <div className="main-bar clearfix">
      <div className="container clearfix">
        <div className="box-header clearfix">
          <div className="logo-header mostion logo-dark">
            <Link to={"/"}>
              <Logo variant="dark" />
            </Link>
          </div>

          <button
            className={`navbar-toggler navicon justify-content-end ${
              sidebarOpen ? "open" : "collapsed"
            }`}
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="extra-nav">
            <div className="extra-cell">
              <button
                id="quik-search-btn"
                type="button"
                className="header-search-btn"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <Link
                to={"/contact"}
                className="btn btn-primary btn-skew appointment-btn"
              >
                <span>Konzultáció</span>
              </Link>
            </div>
          </div>

          <div className="dz-quik-search">
            <form action="#">
              <input
                name="search"
                defaultValue=""
                type="text"
                className="form-control"
                placeholder="Keresés ..."
              />
              <span id="quik-search-remove">
                <i className="fa-solid fa-xmark"></i>
              </span>
            </form>
          </div>

          <div
            id="navbarNavDropdown"
            className={`header-nav navbar-collapse collapse justify-content-end ${
              sidebarOpen ? "show" : ""
            }`}
          >
            <div className="logo-header logo-dark">
              <Link to={"/"}>
                <Logo variant="dark" />
              </Link>
            </div>
            <ul className="nav navbar-nav navbar navbar-left">
              {MenuList.map((item, index) => {
                const menuClass = item.classChange;
                if (menuClass !== "sub-menu-down") {
                  return (
                    <li className={`${menuClass ?? ""}`} key={index}>
                      <Link to={item.to}>{item.title}</Link>
                    </li>
                  );
                }
                return (
                  <li
                    className={`${menuClass} ${
                      active === item.title ? "open active" : ""
                    }`}
                    key={index}
                  >
                    {item.content && item.content.length > 0 ? (
                      <>
                        <Link
                          to={"#"}
                          onClick={() => handleMenuActive(item.title)}
                        >
                          {item.title}
                        </Link>
                        <Collapse in={active === item.title}>
                          <ul className="sub-menu">
                            {item.content.map((data, i) => (
                              <li key={i}>
                                <Link to={data.to}>{data.title}</Link>
                              </li>
                            ))}
                          </ul>
                        </Collapse>
                      </>
                    ) : (
                      <Link to={item.to}>{item.title}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="dz-social-icon">
              <ul>
                <li>
                  <Link target="_blank" to="https://www.facebook.com/" rel="noreferrer">
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                </li>{" "}
                <li>
                  <Link target="_blank" to="https://www.instagram.com/?hl=en" rel="noreferrer">
                    <i className="fab fa-instagram"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
