import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stringToNumber } from "../../functions";
import UserAddressAddModal from "../userAddressModal/UserAddressAddModal";
import ShippingBasket from "./ShippingBasket";
import { getValueByKey } from "../../functions";
import { setBillingInput } from "../../redux/actions/checout.actions";
import ShippingDateTime from "./ShippingDateTime";
import ApplyCoupon from "./ApplyCoupon";
import WalletCredit from "./WalletCredit";
import BeatLoader from 'react-spinners/BeatLoader'
import { AlertNotifs } from "../alertNotifs/AlertNotifs";
import { useRouter } from "next/router";
import { RadioButton, RadioGroup } from "react-radio-buttons";

export default function PayDetails(props) {

  return (

    <div className="pay-details-box">
      <div className="pay-details-box__header">

        <div className="pay-details-box__header__content">
          <h1 className="pay-details-box__title">:جمع سبد خرید</h1>
          <div className="pay-details-box__header__content__price">
            <h2 className="pay-details-box__header__content__price__text">
              150/000 ت
            </h2>
          </div>

        </div>
      </div>
      <div className="pay-details-box__address">
        <h1 className="pay-details-box__title">:ارسال به</h1>
        <p className="pay-details-box__address__text">
          ایران- تهران- خیابان- کوچه-پلاک
        </p>
      </div>
      <div className="pay-details-box__transport">
        <h1 className="pay-details-box__title">:روش ارسال</h1>
        <div className="pay-details-box__transport__radio-btn-wrap">
          <RadioGroup horizontal>
            <RadioButton pointColor="white" rootColor="#000" value="سفارشی">
              فوری
            </RadioButton>
            <RadioButton pointColor="red" rootColor="#000" value="پیشتاز">
              پیشتاز
            </RadioButton>
            <RadioButton pointColor="red" rootColor="#000" value="فوری">
              سفارشی
            </RadioButton>
            <RadioButton pointColor="red" rootColor="#000" value="پیک">
              پیک
            </RadioButton>
          </RadioGroup>
        </div>
      </div>
      <div className="pay-details-box__transport-time">
        <h1 className="pay-details-box__title">:انتخاب زمان ارسال</h1>
        <div className="pay-details-box__transport-time__day">
          <div className="pay-details-box__transport-time__day__label">
            <span>.1</span>
          </div>
          <div className="pay-details-box__transport-time__day__btn-wrap">
            <RadioGroup horizontal>
              <RadioButton pointColor="red" rootColor="#000" value="d1">
                <div className="pay-details-box__transport-time__day__box">
                  <div className="pay-details-box__transport-time__day__box__text">
                    شنبه
                  </div>
                  <div className="pay-details-box__transport-time__day__box__text">
                    1399/09/09
                  </div>
                </div>
              </RadioButton>
              <RadioButton pointColor="red" rootColor="#000" value="d2">
                <div className="pay-details-box__transport-time__day__box">
                  <div className="pay-details-box__transport-time__day__box__text">
                    شنبه
                  </div>
                  <div className="pay-details-box__transport-time__day__box__text">
                    1399/09/09
                  </div>
                </div>
              </RadioButton>
              <RadioButton pointColor="red" rootColor="#000" value="d3">
                <div className="pay-details-box__transport-time__day__box">
                  <div className="pay-details-box__transport-time__day__box__text">
                    شنبه
                  </div>
                  <div className="pay-details-box__transport-time__day__box__text">
                    1399/09/09
                  </div>
                </div>
              </RadioButton>
              <RadioButton pointColor="red" rootColor="#000" value="d4">
                <div className="pay-details-box__transport-time__day__box">
                  <div className="pay-details-box__transport-time__day__box__text">
                    شنبه
                  </div>
                  <div className="pay-details-box__transport-time__day__box__text">
                    1399/09/09
                  </div>
                </div>
              </RadioButton>
            </RadioGroup>
          </div>
        </div>
        <div className="pay-details-box__transport-time__hour">
          <div className="pay-details-box__transport-time__hour__label">
            <span>.2</span>
          </div>
          <div className="pay-details-box__transport-time__hour__btn-wrap">
            <RadioGroup horizontal>
              <RadioButton pointColor="red" rootColor="#000" value="h1">
                تایم
              </RadioButton>
              <RadioButton pointColor="red" rootColor="#000" value="h2">
                تایم
              </RadioButton>
              <RadioButton pointColor="red" rootColor="#000" value="h3">
                تایم
              </RadioButton>
              <RadioButton pointColor="red" rootColor="#000" value="h4">
                تایم
              </RadioButton>
            </RadioGroup>
          </div>
        </div>
      </div>
      <div className="pay-details-box__purchase">
        <h1 className="pay-details-box__title">:درگاه پرداخت</h1>
        <div className="pay-details-box__purchase__btn-wrap">
          <button className="pay-details-box__purchase__btn" type="submit">
            پرداخت
          </button>
        </div>
      </div>
    </div>
  );
}
