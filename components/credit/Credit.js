import React from "react";

export default function Credit() {
  return (
    <div>
      <button className="landing-header__credit">
        <div className="landing-header__credit__number">1500</div>
        <img
          className="landing-header__credit__icon"
          src={`/image/icon/Subtraction 12.svg`}
          alt="credit"
        />
      </button>
    </div>
  );
}
