import React, { useEffect } from "react";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { useSelector } from "react-redux";
import { stringToNumber } from "../../functions";
import UserAddressAddModal from "../userAddressModal/UserAddressAddModal";
import ShippingBasket from "./ShippingBasket";

export default function UserBasket() {
  const { cart } = useSelector(state => state.cart)
  const [modalShow, setModalShow] = React.useState(false);
  const [address, setAddress] = React.useState('');
  const { customer } = useSelector(state => state.customer)
  const { region } = useSelector(state => state.local)

  useEffect(() => {
    if (!customer) return false;

    var state = customer.billing.state ? (region.states.find(x => x.value === customer.billing.state)).label : null;
    var city = customer.billing.city && customer.billing.state ?
      (region.states.find(x => x.value === customer.billing.state)).cities.find(
        x => x.value === customer.billing.city
      ).label
      : null;

    var address1 = customer ? customer.billing.address1 : '';
    var address2 = customer ? customer.billing.address2 : '';

    setAddress('ایران' + '-' + state + '-' + city + '-' + address1 + '-' + address2)

  }, [customer])

  // const getData=()=>{
  //   fetch('api/ir'
  //   ,{
  //     headers : { 
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //      }
  //   }
  //   )
  //     .then(function(response){
  //       console.log(response)
  //       return response.json();
  //     })
  //     .then(function(myJson) {
  //       console.log(myJson);
  //     });
  // }

  useEffect(() => {
  }, [])

  return (
    <div className="user-basket-box">
      <div className="user-basket-box__header">
        <h1 className="user-basket-box__title">:جمع سبد خرید</h1>
        <div className="user-basket-box__header__content">
          <div className="user-basket-box__header__content__price">
            <h2 className="user-basket-box__header__content__price__text">
              {stringToNumber(cart.total) + ' ت'}
            </h2>
          </div>
          <div className="user-basket-box__header__content__wallet">
            <div className="user-basket-box__header__content__wallet__discount">
              <div className="user-basket-box__header__content__wallet__discount__input-wrap">
                <input
                  className="user-basket-box__header__content__wallet__discount__input"
                  type="text"
                  placeholder="اعمال کد تخفیف"
                />
              </div>
              <button className="user-basket-box__header__content__wallet__discount__btn">
                <img
                  className="user-basket-box__header__content__wallet__discount__btn__icon"
                  src={`/image/icon/Tik.png`}
                  alt="tik"
                />
              </button>
            </div>
            <div className="user-basket-box__header__content__wallet__credit">
              <div className="user-basket-box__header__content__wallet__credit__input-wrap">
                <button className="user-basket-box__header__content__wallet__credit__plus">
                  <img
                    className="user-basket-box__header__content__wallet__credit__plus__icon"
                    src={`/image/icon/PLUS.png`}
                    alt="plus"
                  />
                </button>
                <input
                  className="user-basket-box__header__content__wallet__credit__input"
                  type="text"
                  placeholder=""
                />
                <button className="user-basket-box__header__content__wallet__credit__minus">
                  <img
                    className="user-basket-box__header__content__wallet__credit__minus__icon"
                    src={`/image/icon/Rectangle 132.png`}
                    alt="minus"
                  />
                </button>
              </div>
              <button className="user-basket-box__header__content__wallet__credit__btn">
                <img
                  className="user-basket-box__header__content__wallet__credit__btn__icon"
                  src={`/image/icon/Group 137.png`}
                  alt="wallet"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="user-basket-box__address">
        <h1 className="user-basket-box__title">:آدرس</h1>
        <p className="user-basket-box__address__text">
          {address}
        </p>
        <img
          className="user-info-box__bot__title__icon"
          onClick={() => setModalShow(true)}
          src={`/image/icon/edit (1).png`}
          alt="edit"
        />
      </div>
      <UserAddressAddModal show={modalShow} onHide={() => setModalShow(false)} />
      <ShippingBasket />
      <div className="user-basket-box__transport-time">
        <h1 className="user-basket-box__title">:انتخاب زمان ارسال</h1>
        <div className="user-basket-box__transport-time__day">
          <div className="user-basket-box__transport-time__day__label">
            <span>.1</span>
          </div>
          <div className="user-basket-box__transport-time__day__btn-wrap">
            <RadioGroup horizontal>
              <RadioButton pointColor="red" rootColor="#000" value="d1">
                <div className="user-basket-box__transport-time__day__box">
                  <div className="user-basket-box__transport-time__day__box__text">
                    شنبه
                  </div>
                  <div className="user-basket-box__transport-time__day__box__text">
                    1399/09/09
                  </div>
                </div>
              </RadioButton>
              <RadioButton pointColor="red" rootColor="#000" value="d2">
                <div className="user-basket-box__transport-time__day__box">
                  <div className="user-basket-box__transport-time__day__box__text">
                    شنبه
                  </div>
                  <div className="user-basket-box__transport-time__day__box__text">
                    1399/09/09
                  </div>
                </div>
              </RadioButton>
              <RadioButton pointColor="red" rootColor="#000" value="d3">
                <div className="user-basket-box__transport-time__day__box">
                  <div className="user-basket-box__transport-time__day__box__text">
                    شنبه
                  </div>
                  <div className="user-basket-box__transport-time__day__box__text">
                    1399/09/09
                  </div>
                </div>
              </RadioButton>
              <RadioButton pointColor="red" rootColor="#000" value="d4">
                <div className="user-basket-box__transport-time__day__box">
                  <div className="user-basket-box__transport-time__day__box__text">
                    شنبه
                  </div>
                  <div className="user-basket-box__transport-time__day__box__text">
                    1399/09/09
                  </div>
                </div>
              </RadioButton>
            </RadioGroup>
          </div>
        </div>
        <div className="user-basket-box__transport-time__hour">
          <div className="user-basket-box__transport-time__hour__label">
            <span>.2</span>
          </div>
          <div className="user-basket-box__transport-time__hour__btn-wrap">
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
      <div className="user-basket-box__purchase">
        <h1 className="user-basket-box__title">:درگاه پرداخت</h1>
        <div className="user-basket-box__purchase__btn-wrap">
          <button className="user-basket-box__purchase__btn" type="submit">
            پرداخت
          </button>
        </div>
      </div>
    </div>
  );
}
