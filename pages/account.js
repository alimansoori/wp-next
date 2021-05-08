import React, { useEffect } from 'react'
import { withRouter } from 'next/router'
import UserNav from '../components/userNav/UserNav'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomer } from '../redux/actions/customer.actions'
import UserHeader from '../components/userHeader/UserHeader'
import LandingLoading from '../components/landingLoading/LandingLoading'


const Account = ({ router }) => {
    const dispatch = useDispatch()
    const { authenticate, authenticating } = useSelector(state => state.auth)

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
            ) : <div>Access Denied!</div>}
        </>
    )
}

export default withRouter(Account)