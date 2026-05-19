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

          <form className="ev-lead" onSubmit={onSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="ev-field">
                  <label htmlFor="lf-name">Neved</label>
                  <input
                    id="lf-name"
                    name="name"
                    required
                    type="text"
                    placeholder="Pl. Kovács Anna"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="ev-field">
                  <label htmlFor="lf-phone">Telefonszámod</label>
                  <input
                    id="lf-phone"
                    name="phone"
                    required
                    type="tel"
                    placeholder="+36 ..."
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="ev-field">
                  <label htmlFor="lf-email">E-mail (opcionális)</label>
                  <input
                    id="lf-email"
                    name="email"
                    type="email"
                    placeholder="email@pelda.hu"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="ev-field">
                  <label htmlFor="lf-goal">Mi a célod?</label>
                  <select id="lf-goal" name="goal" required defaultValue="">
                    <option value="" disabled>
                      Válassz célt…
                    </option>
                    {goals.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="ev-submit">
                  Kérem a konzultációt
                </button>
                {sent && (
                  <p className="ev-ok text-center">
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
