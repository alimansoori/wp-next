import React, { useEffect } from 'react'
import { withRouter } from 'next/router'
import UserNav from '../components/userNav/UserNav'
import { useDispatch } from 'react-redux'
import { getCustomer } from '../redux/actions/customer.actions'
import UserHeader from '../components/userHeader/UserHeader'


const Account = ({ router }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCustomer())
    }, [])

    return (
        <>
            <UserHeader />
            <UserNav />
        </>
    )
}

export default withRouter(Account)