import React from "react";
import { useDispatch, useSelector } from "react-redux";

import UserAddresses from "./UserAddresses";

export default function UserIfo() {
  const { customer } = useSelector(state => state.customer)
  const dispatch = useDispatch()

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
              {customer ? customer.displayName : null}
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
              {customer ? customer.email : null}
            </div>
          </div>
        </div>
        <div className="user-info-box__top__row">
          <div className="user-info-box__top__row__box">
            <div className="user-info-box__top__row__box__title">
              <h3 className="user-info-box__top__row__box__title__text">
                شماره موبایل
              </h3>
              <img
                className="user-info-box__top__row__box__title__icon"
                src={`/image/icon/edit (1).png`}
                alt="edit"
              />
            </div>
            <div className="user-info-box__top__row__box__body">
              {customer ? customer.billing.phone : null}
            </div>
          </div>
          <div className="user-info-box__top__row__box">
            <div className="user-info-box__top__row__box__title">
              <h3 className="user-info-box__top__row__box__title__text">
                کد پستی
              </h3>
              <img
                className="user-info-box__top__row__box__title__icon"
                src={`/image/icon/edit (1).png`}
                alt="edit"
              />
            </div>
            <div className="user-info-box__top__row__box__body">
              {customer ? customer.billing.postcode : null}
            </div>
          </div>
        </div>
      </div>
      <UserAddresses/>
      
    </div>
  );
}
