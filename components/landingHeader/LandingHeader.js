import React from 'react'
import { useSelector } from 'react-redux'
import Cart from '../cart/Cart'
import Credit from '../credit/Credit'
import LightMode from '../lightMode/LightMode'
import ProfileHeader from '../profileHeader/ProfileHeader'
import Register from '../register/Register'
import SignOut from '../signOut/SignOut'

export default function Landingheader(props) {

    const { authenticate } = useSelector(state => state.auth);
    const { cart } = useSelector(state => state.cart);
    return (
        <div className={`landing-header`}>
            <div className={`landing-header-wrap`}>
                {authenticate && <ProfileHeader />}
                {authenticate ? <SignOut /> : <Register />}
                {cart.contents.nodes.length ? <Cart /> : null}
                {/* <LightMode /> */}
                {/* <Credit /> */}
            </div>
        </div>
    )
}
