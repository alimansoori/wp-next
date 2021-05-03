import React from "react";

export default function Notification() {
  return (
    <div>
      <div>
        <button className="notification__btn">
          <img
            className="notification__btn__icon"
            src={`/image/icon/bell.svg`}
            alt="notification"
          />
          <div className="notification__btn__title">اعلانات</div>
        </button>
      </div>
    </div>
  );
}
