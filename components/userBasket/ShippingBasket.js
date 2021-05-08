import React, { Fragment, useEffect } from "react"
import { useSelector } from "react-redux"
import { RadioGroup, RadioButton } from "react-radio-buttons"

export default function ShippingBasket() {
  const { cart } = useSelector(state => state.cart)

  useEffect(()=>{
    console.log(cart)
  })
  return (
    <div className="user-basket-box__transport">
      <h1 className="user-basket-box__title">:روش ارسال</h1>
      <div className="user-basket-box__transport__radio-btn-wrap">
          {
            cart.availableShippingMethods.map((shippingMethod) => (
              (shippingMethod.rates && shippingMethod.rates !== null) ? (
                <RadioGroup horizontal>
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
