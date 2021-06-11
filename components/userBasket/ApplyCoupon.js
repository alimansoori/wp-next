import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { applyCoupon } from '../../redux/actions/cart.actions'

function ApplyCoupon() {
    const [coupon, setCoupon] = useState('')
    const dispatch = useDispatch()

    const handleApplyCoupon = () => {
        dispatch(applyCoupon(coupon))
    }

    useEffect(() => {
        console.log(coupon)
    }, [coupon])

    return (
        <div className="user-basket-box__header__content__wallet__discount">
            <div className="user-basket-box__header__content__wallet__discount__input-wrap">
                <input
                    onChange={(e) => setCoupon(e.target.value)}
                    className="user-basket-box__header__content__wallet__discount__input"
                    type="text"
                    placeholder="اعمال کد تخفیف"
                />
            </div>
            <button onClick={handleApplyCoupon} className="user-basket-box__header__content__wallet__discount__btn">
                <img
                    className="user-basket-box__header__content__wallet__discount__btn__icon"
                    src={`/image/icon/Tik.png`}
                    alt="tik"
                />
            </button>
        </div>
    )
}

export default ApplyCoupon
