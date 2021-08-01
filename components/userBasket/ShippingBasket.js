import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RadioGroup, RadioButton } from "react-radio-buttons"
import BeatLoader from 'react-spinners/BeatLoader'
import { updateShippingMethod } from "../../redux/actions/cart.actions"
import { updateCustomer } from "../../redux/actions/customer.actions"

export default function ShippingBasket(props) {
  const dispatch = useDispatch()
  const { cart, loadingUpdateShippingMethods } = useSelector(state => state.cart)

  useEffect(() => {
    if (cart.chosenShippingMethods.length) {

      if (cart?.availableShippingMethods && cart?.availableShippingMethods?.length && cart?.availableShippingMethods[0]?.rates?.length) {
        let findShippingMethod = cart.availableShippingMethods[0].rates.find((rate, i) => {
          if (rate.id == cart.chosenShippingMethods[0]) {
            return true
          }
        })

        if (!findShippingMethod) {
          dispatch(updateShippingMethod({
            shippingMethods: ["WC_Custom_Method:1"]
          }))
        }
      }
    }

  }, [cart.availableShippingMethods])

  const handleShippingMethodChange = (value) => {
    dispatch(
      updateShippingMethod({
        shippingMethods: [value]
      })
    )

    if (value !== 'WC_Courier_Method:4') {
      dispatch(updateCustomer({
        metaData: [
          {
            key: 'shippingDate',
            value: ''
          }, {
            key: 'shippingHour',
            value: ''
          }
        ]
      }))

    }
  }

  const shippingMethodValue = () => {
    var value = null
    cart.availableShippingMethods.map((shippingMethod) => {
      if (shippingMethod.rates && shippingMethod.rates !== null) {
        for (var i = 0; i < shippingMethod.rates.length; i++) {
          if (cart.chosenShippingMethods !== undefined && shippingMethod.rates[i].id === cart.chosenShippingMethods[0]) {
            value = shippingMethod.rates[i].id
            break;
          }
        }
      }
    })

    if (!value) {
      return null
    }

    return {
      value: value
    }
  }

  return (
    <div className="user-basket-box__transport">
      <h1 className="user-basket-box__title">روش ارسال</h1>
      {
        loadingUpdateShippingMethods ? (
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
                  <RadioGroup {...shippingMethodValue()} onChange={(val) => handleShippingMethodChange(val)} key={index} horizontal>
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
