import React, { useEffect, useRef } from 'react'
import UserNav from '../components/userNav/UserNav'
import { useDispatch, useSelector } from 'react-redux'
import LandingLoading from '../components/landingLoading/LandingLoading'
import ProductHeader from "../components/productHeader/ProductHeader";
import {alertMessage} from "../functions";
import {cartConstants, viewerConstants} from "../redux/actions/constants";
import AccessDenied from "../components/accessDenied/AccessDenied";

function Account(props) {
    const dispatch = useDispatch()
    const { authenticate, authenticating } = useSelector(state => state.auth)
    const { cart } = useSelector(state => state.cart)
    const { input } = useSelector(state => state.checkout)
    const {message: messageCart, error: errorCart} = useSelector(state => state.cart)
    const {message: messageFavorite} = useSelector(state => state.viewer.favorite)

    useEffect(() => {
        if (messageFavorite) {
            alertMessage(messageFavorite, 'success')
            dispatch({
                type: viewerConstants.CLEAR_FAVORITE_MESSAGE
            })
        }
        if (messageCart) {
            alertMessage(messageCart, 'success')
            dispatch({
                type: cartConstants.CLEAR_MESSAGE
            })
        }
        if (errorCart) {
            alertMessage(errorCart, 'error')
            dispatch({
                type: cartConstants.CLEAR_MESSAGE
            })
        }
    }, [messageFavorite, messageCart, errorCart])

    const didMount = useRef(false);
    useEffect(() => {
        if (didMount.current && !cart.isEmpty) {
            // dispatch(checkout(input))
        } else didMount.current = true;
    }, [input, cart])

    useEffect(() => {
        // !authenticate ? router.push('/404') : null
        // dispatch(getCustomer())
    }, [])

    return (
        <>
            <LandingLoading />
            <ProductHeader fixed={false} />
            {authenticate ? (
                <>
                    <UserNav />
                </>
            ) : <AccessDenied/>}
        </>
    )
}

export default Account