import React from 'react'
import Cart from '../cart/Cart'
import Credit from '../credit/Credit'
import LightMode from '../lightMode/LightMode'
import Register from '../register/Register'

export default function Landingheader(props) {


    return (
        <div className={`landing-header`}>
            <div className={`landing-header-wrap`}>
                <Register />
                <Cart />
                <LightMode />
                <Credit />
            </div>
        </div>
    )
}
