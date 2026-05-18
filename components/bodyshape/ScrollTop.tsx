"use client";
import { useEffect, useRef } from "react";

export default function ScrollTop() {
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (btn.current)
        btn.current.style.display = window.scrollY > 650 ? "block" : "none";
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo(0, 0)}
      ref={btn}
      className="scroltop icon-up"
      type="button"
      style={{ display: "none" }}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
}
