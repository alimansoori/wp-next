import React from "react";
import { RadioGroup, RadioButton } from "react-radio-buttons";

import UserAddressModal from "../userAddressModal/UserAddressModal";

export default function UserIfo() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="user-info-box">
      <div className="user-info-box__top">
        <div className="user-info-box__top__row">
          <div className="user-info-box__top__row__box">
            <div className="user-info-box__top__row__box__title">
              <h3 className="user-info-box__top__row__box__title__text">
                نام و نام خانوادگی
              </h3>
              <img
                className="user-info-box__top__row__box__title__icon"
                src={`/image/icon/edit (1).png`}
                alt="edit"
              />
            </div>
            <div className="user-info-box__top__row__box__body">
              علی علیزاده
            </div>
          </div>
          <div className="user-info-box__top__row__box">
            <div className="user-info-box__top__row__box__title">
              <h3 className="user-info-box__top__row__box__title__text">
                پست الکترونیک
              </h3>
              <img
                className="user-info-box__top__row__box__title__icon"
                src={`/image/icon/edit (1).png`}
                alt="edit"
              />
            </div>
            <div className="user-info-box__top__row__box__body">
              ali.alizade@yahoo.com
            </div>
          </div>
        </div>
        <div className="user-info-box__top__row">
          <div className="user-info-box__top__row__box">
            <div className="user-info-box__top__row__box__title">
              <h3 className="user-info-box__top__row__box__title__text">
                شماره تلفن
              </h3>
              <img
                className="user-info-box__top__row__box__title__icon"
                src={`/image/icon/edit (1).png`}
                alt="edit"
              />
            </div>
            <div className="user-info-box__top__row__box__body">
              09212345678
            </div>
          </div>
          <div className="user-info-box__top__row__box">
            <div className="user-info-box__top__row__box__title">
              <h3 className="user-info-box__top__row__box__title__text">
                کد ملی
              </h3>
              <img
                className="user-info-box__top__row__box__title__icon"
                src={`/image/icon/edit (1).png`}
                alt="edit"
              />
            </div>
            <div className="user-info-box__top__row__box__body">1234567</div>
          </div>
        </div>
      </div>
      <div className="user-info-box__bot">
        <div className="user-info-box__bot__title">
          <h3 className="user-info-box__bot__title__text">آدرس ها</h3>
          <img
            className="user-info-box__bot__title__icon"
            onClick={() => setModalShow(true)}
            src={`/image/icon/edit (1).png`}
            alt="edit"
          />
        </div>
        <div className="user-info-box__bot__body">
          <div className="user-info-box__bot__body-wrap">
            <RadioGroup>
              <RadioButton pointColor="#26c7bf" rootColor="#000" value="ad1">
                ایران- تهران- خیابان- کوچه-پلاک
              </RadioButton>
              <RadioButton pointColor="#26c7bf" rootColor="#000" value="ad2">
                ایران- تهران- خیابان- کوچه-پلاک
              </RadioButton>
              <RadioButton pointColor="#26c7bf" rootColor="#000" value="ad3">
                ایران- تهران- خیابان- کوچه-پلاک
              </RadioButton>
            </RadioGroup>
          </div>
        </div>
      </div>
      <UserAddressModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}
