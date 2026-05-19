"use client";
import React, { useState } from "react";

function category(b: number) {
  if (b < 18.5) return "Soványság";
  if (b < 25) return "Normál tartomány";
  if (b < 30) return "Túlsúly";
  return "Elhízás";
}

const Bmi = () => {
  const [w, setW] = useState("");
  const [h, setH] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calc = (e: React.FormEvent) => {
    e.preventDefault();
    const wv = parseFloat(w);
    const hv = parseFloat(h) / 100;
    if (wv > 0 && hv > 0) setBmi(Math.round((wv / (hv * hv)) * 10) / 10);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-9 col-xl-8">
          <div className="ev-bmi">
            <h2>
              Számold ki a <span>BMI-d</span>
            </h2>
            <p className="ev-bmi-sub">
              Egy gyors kiindulópont. A pontos terv mindig személyes, ezért az
              eredmény után beszéljük át együtt.
            </p>
            <form onSubmit={calc}>
              <div className="ev-bmi-grid">
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="Testsúly (kg)"
                  value={w}
                  onChange={(e) => setW(e.target.value)}
                  required
                />
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="Magasság (cm)"
                  value={h}
                  onChange={(e) => setH(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Kiszámolom</button>
            </form>
            {bmi !== null && (
              <div className="ev-bmi-result">
                <strong>{bmi}</strong>
                {category(bmi)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bmi;
