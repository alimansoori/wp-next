import useShippingMethodsTime from "../../hooks/useShippingMethodsTime"
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { useEffect, useState } from "react";

export default function ShippingDateTime() {
    const { getShippingMethodsTime } = useShippingMethodsTime()
    const [shippingTimes, setShippingTimes] = useState({})

    const handleChangeShippingDay = (value) => {
        setShippingTimes(JSON.parse(value).hours)
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

                    <RadioGroup horizontal>
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