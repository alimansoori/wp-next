import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RadioGroup, RadioButton } from "react-radio-buttons"
import BeatLoader from 'react-spinners/BeatLoader'
import { changeInputCheckout } from "../../redux/actions/checout.actions"
import { v4 } from "uuid"

export default function ShippingBasket({ setInputCheckout, inputCheckout }) {
  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.cart)
  const { customer, loading } = useSelector(state => state.customer)
  const { loadingCheckout } = useSelector(state => state.checkout)
  const { input } = useSelector(state => state.checkout)

  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      if (customer && !loading) {
        // dispatch({
        //   type: checkoutConstants.CHECKOUT_UPDATE_BILLING,
        //   payload: {
        //     billing: {
        //       country: customer.billing.country,
        //       state: customer.billing.state,
        //       city: customer.billing.city,
        //     }
        //   }
        // })
      }
    } else didMount.current = true;
  }, [customer])

  const handleShippingMethodChange = (value) => {
    console.log(value)
    dispatch(
      changeInputCheckout({
        shippingMethod: value
      })
    )
  }

  const shippingMethodValue = () => {
    var t = null
    cart.availableShippingMethods.map((shippingMethod) => {
      if (shippingMethod.rates && shippingMethod.rates !== null) {
        for (var i = 0; i < shippingMethod.rates.length; i++) {
          if (cart.chosenShippingMethods !== undefined && shippingMethod.rates[i].id === cart.chosenShippingMethods[0]) {
            t = shippingMethod.rates[i].id
            break;
          }
        }
      }
    })
    return t
  }

  return (
    <div className="user-basket-box__transport">
      <h1 className="user-basket-box__title">:روش ارسال</h1>
      {
        loadingCheckout ? (
          <div style={{ textAlign: "center", marginBottom: "20px" }} className="user-basket-box__transport__radio-btn-wrap">
            <BeatLoader
              loading={true}
              size={15}
              color="#0072bb"
            />
          </div>
        ) : (
          <div className="user-basket-box__transport__radio-btn-wrap">
            {
              cart.availableShippingMethods.map((shippingMethod, index) => (
                (shippingMethod.rates && shippingMethod.rates !== null) ? (
                  <RadioGroup value={shippingMethodValue()} onChange={(val) => handleShippingMethodChange(val)} key={index} horizontal>
                    {
                      shippingMethod.rates.map((rate, index2) => (
                        <RadioButton key={index2} pointColor="red" rootColor="#000" value={rate.id}>
                          {rate.label}
                        </RadioButton>
                      ))
                    }
                  </RadioGroup>
                ) : null
              ))
            }
          </div>
        )
      }
    </div>
  );
}
