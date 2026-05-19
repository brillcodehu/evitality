"use client";
import React, { useState, useEffect } from "react";
import { Link } from "./Link";
import Logo from "./Logo";

/**
 * Minimal header: transparent with just the logo at the top of the page;
 * on scroll it turns into a solid sticky bar with the logo (left) and a
 * single CTA button (right).
 */
const Header = () => {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`ev-header${stuck ? " is-stuck" : ""}`}>
      <div className="container ev-header-inner">
        <Link to={"/"} className="ev-logo" aria-label="eVitality">
          <Logo variant="dark" />
        </Link>
        <Link to={"/contact"} className="ev-cta">
          Ingyenes konzultáció
        </Link>
      </div>
    </header>
  );
};

export default Header;
