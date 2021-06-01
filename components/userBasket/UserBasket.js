import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stringToNumber } from "../../functions";
import UserAddressAddModal from "../userAddressModal/UserAddressAddModal";
import ShippingBasket from "./ShippingBasket";
import {getValueByKey} from "../../functions";
import { setBillingInput } from "../../redux/actions/checout.actions";
import ShippingDateTime from "./ShippingDateTime";

export default function UserBasket(props) {
  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.cart)
  const [modalShow, setModalShow] = React.useState(false);
  const [address, setAddress] = React.useState('');
  const { customer } = useSelector(state => state.customer)
  const { addresses, active } = useSelector(state => state.customer.address)
  const { region } = useSelector(state => state.local)

  useEffect(() => {
    if (!active) return false

    const billingAddress = getValueByKey(addresses, active)

    var state = billingAddress.state ? (region.states.find(x => x.value === billingAddress.state)).label : null;
    var city = billingAddress.city && billingAddress.state ?
      (region.states.find(x => x.value === billingAddress.state)).cities.find(
        x => x.value === billingAddress.city
      ).label
      : null;

    var address1 = billingAddress ? billingAddress.address1 : '';
    var address2 = billingAddress ? billingAddress.address2 : '';

    setAddress('ایران' + '-' + state + '-' + city + '-' + address1 + '-' + address2)

  }, [active])

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
    if (!active) return false
    dispatch(setBillingInput())
  }, [active])

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
      <ShippingBasket {...props} />
      <ShippingDateTime />
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
