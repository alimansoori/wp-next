import useShippingMethodsTime from "../../hooks/useShippingMethodsTime"
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer } from "../../redux/actions/customer.actions";

export default function ShippingDateTime() {
    const dispatch = useDispatch()
    const { customer } = useSelector(state => state.customer)
    const { getShippingMethodsTime } = useShippingMethodsTime()
    const [shippingTimes, setShippingTimes] = useState({})

    useEffect(() => {
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
    }, [])

    const handleChangeShippingDay = (value) => {
        setShippingTimes(JSON.parse(value).hours)
        dispatch(updateCustomer({
            metaData: [{
                key: 'shippingDate',
                value: value
            }]
        }))
    }

    const handleChangeShippingHour = (value) => {
        dispatch(updateCustomer({
            metaData: [{
                key: 'shippingHour',
                value: value
            }]
        }))
    }

    const handleDateVal = () => {
        const {metaData} = customer

        const shippingDateTime = metaData.find((meta, i) => {
            if (meta.key == 'shippingDate') {
                return true
            }
        })
        if (!shippingDateTime || !shippingDateTime.value) {
            return null
        }

        return {
            value: shippingDateTime.value
        }
    }

    const handleHourVal = () => {
        const {metaData} = customer

        const shippingDateTime = metaData.find((meta, i) => {
            if (meta.key == 'shippingHour') {
                return true
            }
        })
        if (!shippingDateTime || !shippingDateTime.value) {
            return null
        }

        return {
            value: shippingDateTime.value
        }
    }

    return (
        <div className="user-basket-box__transport-time">
            <h1 className="user-basket-box__title">:انتخاب زمان ارسال</h1>
            <div className="user-basket-box__transport-time__day">
                {
                    getShippingMethodsTime('WC_Courier_Method').length ?
                        (<div className="user-basket-box__transport-time__day__label">
                            <span>.1</span>
                        </div>)
                        : null
                }

                <div className="user-basket-box__transport-time__day__btn-wrap">
                    <RadioGroup onChange={(value) => handleChangeShippingDay(value)} horizontal>
                        {
                            getShippingMethodsTime('WC_Courier_Method').map((node, index) => (
                                <RadioButton key={index} pointColor="red" rootColor="#000" value={JSON.stringify(node)}>
                                    <div className="user-basket-box__transport-time__day__box">
                                        <div className="user-basket-box__transport-time__day__box__text">
                                            {node.shippingDate.day}
                                        </div>
                                        <div className="user-basket-box__transport-time__day__box__text">
                                            {node.shippingDate.date}
                                        </div>
                                    </div>
                                </RadioButton>
                            ))
                        }
                    </RadioGroup>
                </div>
            </div>
            <div className="user-basket-box__transport-time__hour">
                {Object.keys(shippingTimes).length ? (
                    <div className="user-basket-box__transport-time__hour__label">
                        <span>.2</span>
                    </div>
                ) : null}

                <div className="user-basket-box__transport-time__hour__btn-wrap">

                    <RadioGroup onChange={(value) => handleChangeShippingHour(value)} horizontal>
                        {
                            Object.keys(shippingTimes).map(function (keyName, keyIndex) {
                                return (
                                    <RadioButton key={keyIndex} pointColor="red" rootColor="#000" value={shippingTimes[keyName]}>
                                        {shippingTimes[keyName]}
                                    </RadioButton>
                                )
                            })
                        }
                    </RadioGroup>
                </div>
            </div>
        </div>
    )
}