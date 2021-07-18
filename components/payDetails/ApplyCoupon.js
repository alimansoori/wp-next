import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { applyCoupon } from '../../redux/actions/cart.actions'
import CircleLoader from 'react-spinners/CircleLoader'

function ApplyCoupon({ notifs, setNotifs }) {
    const [coupon, setCoupon] = useState('')
    const { loadingCoupon, errorCoupon } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const handleApplyCoupon = () => {
        dispatch(applyCoupon(coupon))
    }

    useEffect(() => {
        console.log(errorCoupon)
        if (errorCoupon) {
            setNotifs(notifs.concat([
                {
                    variant: 'danger',
                    title: errorCoupon
                }
            ]))
        }
    }, [errorCoupon])

    return (
        <div className="user-basket-box__header__content__wallet__discount">
            <div className="user-basket-box__header__content__wallet__discount__input-wrap">
                <input
                    onChange={(e) => setCoupon(e.target.value)}
                    className="user-basket-box__header__content__wallet__discount__input"
                    type="text"
                    value= {loadingCoupon ? 'Loading...' : coupon}
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
            {/* <div className="user-basket-box__header__content__wallet__discount__btn">
                <CircleLoader
                    loading={true}
                    size={20}
                    color="#000000"
                />
            </div> */}
        </div>
    )
}

export default ApplyCoupon
