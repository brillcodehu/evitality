"use client";
import React from "react";

/**
 * eVitality brand logo — dumbbell mark + wordmark.
 * variant: "dark" = dark text (light backgrounds, header)
 *          "light" = white text (dark backgrounds, footer)
 * The dumbbell + "e" use the theme primary (red) via var(--primary).
 */
export default function Logo({
  variant = "dark",
  width = 186,
  className = "",
}: {
  variant?: "dark" | "light";
  width?: number;
  className?: string;
}) {
  const textColor = variant === "light" ? "#ffffff" : "#1c1c1c";
  return (
    <svg
      className={className}
      width={width}
      height={(width * 54) / 220}
      viewBox="0 0 220 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="eVitality"
    >
      {/* Dumbbell mark */}
      <g fill="var(--primary)">
        {/* left outer plate */}
        <rect x="0" y="11" width="9" height="32" rx="4.5" />
        {/* left inner plate */}
        <rect x="12" y="16.5" width="7" height="21" rx="3.5" />
        {/* bar */}
        <rect x="19" y="23.5" width="16" height="7" rx="3.5" />
        {/* right inner plate */}
        <rect x="35" y="16.5" width="7" height="21" rx="3.5" />
        {/* right outer plate */}
        <rect x="45" y="11" width="9" height="32" rx="4.5" />
      </g>
      {/* Wordmark */}
      <text
        x="68"
        y="37.5"
        fontFamily="Oswald, 'Arial Narrow', Arial, sans-serif"
        fontSize="33"
        fontWeight="700"
        letterSpacing="-0.3"
      >
        <tspan fill="var(--primary)">e</tspan>
        <tspan fill={textColor}>Vitality</tspan>
      </text>
    </svg>
  );
}
