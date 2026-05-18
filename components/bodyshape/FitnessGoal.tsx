"use client";
import React from "react";
import { Tab, Nav } from "react-bootstrap";
import { IMAGES } from "./theme";

const FitnessGoal = () => {
  return (
    <>
      <div className="col-lg-6 about-content m-b30">
        <div className="section-head m-0">
          <span className="sub-title">RÓLAM</span>
          <h2 className="title">
            Segítek elérni a <span>fitnesz</span> célod
          </h2>
          <p className="m-0">
            Független edzőként arra fókuszálok, hogy veled együtt érjük el az
            eredményt, amit szeretnél. Akár a fogyás a cél, akár az alakformálás.
          </p>
        </div>
        <div className="" data-wow-delay="0.8s">
          <Tab.Container defaultActiveKey={"Mission"}>
            <Nav as="ul" className="nav nav-tabs style-1 m-b20 m-t30">
              <Nav.Item as="li" className="nav-item">
                <Nav.Link className="nav-link" eventKey={"Mission"}>
                  <span>A küldetésem</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="nav-item">
                <Nav.Link className="nav-link" eventKey={"Vision"}>
                  <span>A jövőképem</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content
              className="tab-content m-sm-b30 m-b40 p-r30"
              id="myTabContent"
            >
              <Tab.Pane eventKey={"Mission"}>
                <div className="content">
                  <p>
                    Hogy mindenki megtalálja a mozgás örömét, és fenntartható
                    módon érjen el tartós eredményt. Személyre szabott terv,
                    valódi figyelem, kifogások nélkül.
                  </p>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey={"Vision"}>
                <div className="content">
                  <p>
                    Olyan közösséget építeni Debrecenben, ahol az egészséges
                    életmód nem kényszer, hanem életstílus, amelyhez bárki
                    csatlakozhat, bármilyen szintről indul.
                  </p>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
        <div className="contact-us">
          <span className="icon">
            <i className="fa-solid fa-phone"></i>
          </span>
          <div className="content">
            <span>Hívj bizalommal</span>
            <h4 className="number">+36 30 365 1000</h4>
          </div>
        </div>
      </div>
      <div className="col-lg-6 m-b30">
        <div className="dz-media">
          <div className="image-box" style={{ marginBottom: 20 }}>
            <img
              src={IMAGES.boxpic1}
              alt=""
              style={{
                width: "100%",
                height: 280,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          </div>
          <div className="image-box">
            <img
              src={IMAGES.boxpic2}
              alt=""
              style={{
                width: "100%",
                height: 280,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FitnessGoal;
