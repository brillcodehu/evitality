"use client";
import React from "react";

/**
 * Replaces the metrics counter — a two-line motivational quote with a couple
 * of words highlighted in yellow, set in Oswald, with a handwritten
 * signature (Caveat) bottom-right.
 */
const QuoteBlock = () => {
  return (
    <div className="col-12">
      <div
        style={{
          position: "relative",
          padding: "20px 10px 56px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "Oswald, sans-serif",
            fontWeight: 600,
            textTransform: "uppercase",
            color: "#fff",
            lineHeight: 1.25,
            letterSpacing: "0.5px",
            margin: 0,
            fontSize: "clamp(24px, 3.4vw, 46px)",
          }}
        >
          A <span style={{ color: "#ffdd39" }}>változás</span> ott kezdődik,
          <br />
          ahol a <span style={{ color: "#ffdd39" }}>kifogások</span> véget érnek.
        </p>
        <span
          style={{
            position: "absolute",
            right: "6%",
            bottom: 0,
            fontFamily: "'Caveat', cursive",
            fontSize: "clamp(26px, 3vw, 40px)",
            color: "#ffdd39",
            transform: "rotate(-4deg)",
          }}
        >
          Fogarasi Éva
        </span>
      </div>
    </div>
  );
};

export default QuoteBlock;
