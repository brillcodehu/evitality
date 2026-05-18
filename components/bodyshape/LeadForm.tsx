"use client";
import React, { useState } from "react";

const goals = [
  "Fogyás / zsírégetés",
  "Alakformálás",
  "Izomépítés",
  "Általános fittség",
  "Felkészülés eseményre",
];

const LeadForm = () => {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
    window.setTimeout(() => setSent(false), 6000);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-9 col-xl-8">
          <div className="section-head text-center">
            <h5 className="sub-title">INGYENES KONZULTÁCIÓ</h5>
            <h2 className="title">
              Kezdjük el <span>együtt</span>
            </h2>
            <p>
              Hagyd itt az elérhetőséged és a célod, 24 órán belül felveszem
              veled a kapcsolatot egy díjmentes, kötelezettség nélküli
              beszélgetésre.
            </p>
          </div>

          <form onSubmit={onSubmit} className="dezPidol-form">
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="input-skew">
                  <input
                    name="name"
                    required
                    type="text"
                    className="form-control"
                    placeholder="Neved"
                  />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="input-skew">
                  <input
                    name="phone"
                    required
                    type="tel"
                    className="form-control"
                    placeholder="Telefonszámod"
                  />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="input-skew">
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="E-mail (opcionális)"
                  />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="input-skew">
                  <select
                    name="goal"
                    required
                    className="form-control"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Mi a célod?
                    </option>
                    {goals.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-12 text-center mt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-skew"
                >
                  <span>Kérem a konzultációt</span>
                </button>
                {sent && (
                  <p className="m-t20 m-b0 text-primary">
                    Köszönöm! Hamarosan kereslek a megadott elérhetőségen.
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;
