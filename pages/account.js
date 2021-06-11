import React, { useEffect, useRef, useState } from 'react'
import { withRouter } from 'next/router'
import UserNav from '../components/userNav/UserNav'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomer } from '../redux/actions/customer.actions'
import UserHeader from '../components/userHeader/UserHeader'
import LandingLoading from '../components/landingLoading/LandingLoading'
import { checkout } from '../redux/actions/checout.actions'


const Account = ({ router }) => {
    const dispatch = useDispatch()
    const { authenticate, authenticating } = useSelector(state => state.auth)
    const { cart } = useSelector(state => state.cart)
    const { input } = useSelector(state => state.checkout)

    const didMount = useRef(false);
    useEffect(() => {
        if (didMount.current && !cart.isEmpty) {
            console.log('CheckOUT')
            dispatch(checkout(input))
        } else didMount.current = true;
    }, [input, cart])

    useEffect(() => {
        // !authenticate ? router.push('/404') : null
        dispatch(getCustomer())
    }, [])

    return (
        <>
            <LandingLoading />
            <UserHeader />
            {authenticate ? (
                <>
                    <UserNav />
                </>
            ) : <div>Access Denied! ... Please Log in</div>}
        </>
    )
}

export default withRouter(Account)