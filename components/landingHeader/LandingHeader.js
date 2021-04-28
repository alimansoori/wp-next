import React from 'react'
import { useSelector } from 'react-redux'
import Cart from '../cart/Cart'
import Credit from '../credit/Credit'
import LightMode from '../lightMode/LightMode'
import Register from '../register/Register'
import SignOut from '../signOut/SignOut'

export default function Landingheader(props) {

    const { authenticate } = useSelector(state => state.auth);
    return (
        <div className={`landing-header`}>
            <div className={`landing-header-wrap`}>
                {authenticate ? <SignOut/> : <Register/>}
                <Cart />
                {/* <LightMode /> */}
                {/* <Credit /> */}
            </div>
        </div>
    )
}
