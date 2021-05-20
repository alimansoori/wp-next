import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RadioGroup, RadioButton } from "react-radio-buttons"
import { checkoutConstants } from "../../redux/actions/constants"

export default function ShippingBasket({ setInputCheckout, inputCheckout }) {
  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.cart)
  const { customer, loading } = useSelector(state => state.customer)
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

  return (
    <div className="user-basket-box__transport">
      <h1 className="user-basket-box__title">:روش ارسال</h1>
      <div className="user-basket-box__transport__radio-btn-wrap">
        {
          cart.availableShippingMethods.map((shippingMethod, index) => (
            (shippingMethod.rates && shippingMethod.rates !== null) ? (
              <RadioGroup key={index} horizontal>
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
    </div>
  );
}
