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
import PN from 'persian-number'
import {getCart} from "../../redux/actions";

export default function UserBasket(props) {
  const dispatch = useDispatch()
  const router = useRouter()
  const { cart, loadingUpdateShippingCourierMethod } = useSelector(state => state.cart)
  const [modalShow, setModalShow] = React.useState(false);
  const [notifs, setNotifs] = React.useState([]);
  const [address, setAddress] = React.useState('');
  const { addresses, active } = useSelector(state => state.customer.address)
  const { region } = useSelector(state => state.local)
  const { customer, loading: loadingCustomer } = useSelector(state => state.customer)
  const { loading: loadingCart, loadingUpdateShippingMethod } = useSelector(state => state.cart)

  useEffect(() => {
    dispatch(getCart())
  }, [])

  useEffect(() => {
    if (!active) {
      setAddress(null)
      return false
    }

    const billingAddress = getValueByKey(addresses, active)

    let state = billingAddress.state ? (region.states.find(x => x.value === billingAddress.state)).label : null;
    let city = billingAddress.city && billingAddress.state ?
      (region.states.find(x => x.value === billingAddress.state)).cities.find(
        x => x.value === billingAddress.city
      ).label
      : null;

    let address1 = billingAddress ? billingAddress.address1 : '';
    let address2 = billingAddress ? billingAddress.address2 : '';

    setAddress('ایران' + '-' + state + '-' + city + '-' + address1 + '-' + address2)

  }, [active])


  useEffect(() => {
    if (!active) return false
    dispatch(setBillingInput())
  }, [active])

  const handlePayment = () => {
    if (cart.chosenShippingMethods.includes('WC_Courier_Method:4')) {
      const shippingDate = customer?.metaData.find((m) => {
        if (m.key === 'shippingDate' && m.value) {
          return true
        }
      })
      const shippingHour = customer?.metaData.find((m) => {
        if (m.key === 'shippingHour' && m.value) {
          return true
        }
      })
      if (!shippingDate || !shippingHour) {
        setNotifs(
          notifs.concat([{
            variant: 'danger',
            title: 'لطفا زمان و ساعت ارسال خود را ثبت کنید!'
          }])
        )
        return false
      }
      if (!active) {
        setNotifs(
            notifs.concat([{
              variant: 'danger',
              title: 'لطفا آدرس خود را از طریق بخش مشخصات وارد کرده و با کلیک بر روی آن، آن را فعال کنید.'
            }])
        )
        return false
      }
    }
    router.push('/checkout')
  }

  return (

    <div className="user-basket-box">
      <AlertNotifs notifs={notifs} setNotifs={setNotifs} />
      <div className="user-basket-box__header">
        <h1 className="user-basket-box__title">جمع سبد خرید</h1>
        <div className="user-basket-box__header__content">
          <div className="user-basket-box__header__content__price">
            <h2 className="user-basket-box__header__content__price__text">
              {PN.convertEnToPe(stringToNumber(cart.total))}
            </h2>
          </div>
          <div className="user-basket-box__header__content__wallet">
            {
              !cart.isEmpty ? <ApplyCoupon notifs={notifs} setNotifs={setNotifs} /> : null
            }
            {
              !cart.isEmpty ? <WalletCredit /> : null
            }
          </div>
        </div>
      </div>
      <div className="user-basket-box__address">
        <h1 className="user-basket-box__title">آدرس</h1>
        <p className="user-basket-box__address__text">
          {address ? address : 'لطفا از بخش مشخصات آدرس های خود را ثبت کنید و سپس با کلیک روی هر کدام آن را فعال کنید.'}
        </p>
      </div>
      <UserAddressAddModal show={modalShow} onHide={() => setModalShow(false)} />
      <ShippingBasket />
      {
        loadingUpdateShippingCourierMethod ? (
          <div style={{ textAlign: "center", marginBottom: "20px" }} className="user-basket-box__transport__radio-btn-wrap">
            <BeatLoader
              loading={true}
              size={15}
              color="#0072bb"
            />
          </div>
        ) : (
          (cart.chosenShippingMethods.length && cart.chosenShippingMethods[0] == 'WC_Courier_Method:4') ?
            <ShippingDateTime /> :
            null
        )
      }
      <div className="user-basket-box__purchase">
        <h1 className="user-basket-box__title">پرداخت امن زرین پال</h1>
        <div className="user-basket-box__purchase__btn-wrap">
          <button style={{direction:'rtl'}} onClick={handlePayment} disabled={(cart.isEmpty || loadingCart || loadingUpdateShippingMethod || loadingCustomer) ? true : false} className="user-basket-box__purchase__btn" type="submit">
            {cart.isEmpty ? 'سبد خرید شما خالی است' : (
              (loadingCart || loadingUpdateShippingMethod || loadingCustomer) ? 'لطفا صبر کنید...' : 'پرداخت'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
