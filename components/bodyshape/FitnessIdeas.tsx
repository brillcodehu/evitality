"use client";
import React, { useState, useEffect } from "react";
import { Link } from "./Link";
import { IMAGES } from "./theme";

type Topic = {
  image: string;
  title: string;
  short: string;
  detail: string[];
};

const topics: Topic[] = [
  {
    image: IMAGES.boxlog1,
    title: "Helyes táplálkozás",
    short: "Fenntartható étkezés, nem nélkülözés — a céljaidhoz igazítva.",
    detail: [
      "Nem kúra és nem tiltólista. Átnézzük az étkezési szokásaidat, és olyan rendszert építünk, ami belefér a hétköznapjaidba és tartósan tartható.",
      "Gyakorlati tippek bevásárlástól a tányérig: mennyiségek, fehérje, hidratálás és a kedvenc ételeid okos beépítése — kompromisszumok nélkül.",
    ],
  },
  {
    image: IMAGES.boxlog2,
    title: "Egészség & fitnesz",
    short: "Több energia, jobb közérzet, erősebb test a hétköznapokra.",
    detail: [
      "A cél nem csak a tükörkép: jobb alvás, stabil energiaszint és fájdalommentes mozgás a mindennapokban.",
      "Felmérjük a kiindulási állapotod, és reális, lépésről lépésre haladó tervet kapsz, amit végig együtt követünk.",
    ],
  },
  {
    image: IMAGES.boxlog3,
    title: "Edzés & gyakorlatok",
    short: "Személyre szabott edzésterv a te szintedhez igazítva.",
    detail: [
      "Minden gyakorlatot a te adottságaidhoz és céljaidhoz választunk meg, a helyes technikára építve, sérülésmentesen.",
      "Folyamatos, fokozatos terhelés és visszajelzés, hogy mérhetően haladj — kezdőként is magabiztosan.",
    ],
  },
  {
    image: IMAGES.boxlog4,
    title: "Motiváció",
    short: "Végig melletted — hogy ne csak elkezdd, hanem ki is tarts.",
    detail: [
      "A nehéz heteken is ott vagyok: rendszeres visszajelzés, elszámoltathatóság és valódi támogatás.",
      "Közös mérföldkövek és kis sikerek, amelyek fenntartják a lendületet, amíg szokássá nem válik.",
    ],
  },
];

const FitnessIdeas = () => {
  const [hoverBox, setHoverBox] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    if (open !== null) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const active = open !== null ? topics[open] : null;

  return (
    <>
      <div className="row">
        {topics.map((item, index) => (
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
                  <button
                    type="button"
                    onClick={() => setOpen(index)}
                    style={{
                      background: "none",
                      border: 0,
                      padding: 0,
                      font: "inherit",
                      color: "inherit",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {item.title}
                  </button>
                </h5>
                <p className="m-b25">{item.short}</p>
                <button
                  type="button"
                  onClick={() => setOpen(index)}
                  className="btn btn-primary shadow-primary btn-skew"
                >
                  <span>Tovább</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {active && (
        <div
          className="ev-modal-overlay"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="ev-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="ev-modal-close"
              aria-label="Bezárás"
              onClick={() => setOpen(null)}
            >
              ×
            </button>
            <div className="ev-modal-icon">
              <img src={active.image} alt="" />
            </div>
            <h3>{active.title}</h3>
            {active.detail.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <Link
              to={"/contact"}
              className="ev-modal-cta"
              onClick={() => setOpen(null)}
            >
              Kérek ingyenes konzultációt
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default FitnessIdeas;
