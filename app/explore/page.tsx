import React from "react";
import Trolly from "@/public/trolly.png";
import Heart from "@/public/heart-2.png";

const page = () => {
  return (
    <div>
      <section className="explore--section__1">
        <div className="explore--section__container">
          <p className="explore--section--text__1">
            온라인 사업을 인수하세요
            <br />
            <span className="explore--section--text__2">
              비즈토스 매니저가 직접 검수한 비즈니스 매물
            </span>
          </p>

          <img
            src="https://cdn.imweb.me/thumbnail/20240829/6f26b8591ec46.png"
            className="explore--section__1__img"
          />
        </div>
      </section>

      <section className="explore--section__2">
        <ul className="explore--section__grid">
          <div className="item--card--container">
            <img
              className="item-card"
              src="https://cdn-optimized.imweb.me/upload/S2024081216df9632f5986/e1dd2bc2538af.png"
            />

            <div className="item--card--footer">
              <div className="item--card__like">
                <img src={Heart.src} className="item--card--heart" />1
              </div>
              <img src={Trolly.src} className="item--card--trolly" />
            </div>
          </div>

          <div className="item--card--container">
            <img
              className="item-card"
              src=" https://cdn-optimized.imweb.me/upload/S2024081216df9632f5986/2abaab5c1741e.png"
            />
            <div className="item--card--footer">
              <div className="item--card__like">
                <img src={Heart.src} className="item--card--heart" />1
              </div>
              <img src={Trolly.src} className="item--card--trolly" />
            </div>
          </div>
          <div className="item--card--container">
            <img
              className="item-card"
              src="https://cdn-optimized.imweb.me/upload/S2024081216df9632f5986/7c03857be9f76.png"
            />
            <div className="item--card--footer">
              <div className="item--card__like">
                <img src={Heart.src} className="item--card--heart" />1
              </div>
              <img src={Trolly.src} className="item--card--trolly" />
            </div>
          </div>

          <div className="item--card--container">
            <img
              className="item-card"
              src="https://cdn-optimized.imweb.me/upload/S2024081216df9632f5986/e339ed1938f13.png"
            />
            <div className="item--card--footer">
              <div className="item--card__like">
                <img src={Heart.src} className="item--card--heart" />1
              </div>
              <img src={Trolly.src} className="item--card--trolly" />
            </div>
          </div>
        </ul>
      </section>
    </div>
  );
};

export default page;
