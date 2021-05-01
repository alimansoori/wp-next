import React, { useEffect } from 'react'
import { withRouter } from 'next/router'
import ProductHeader from '../components/productHeader/ProductHeader'
import UserNav from '../components/userNav/UserNav'


const Account = ({ router }) => {

    useEffect(() => {
    }, [])

    return (
        <>
            <ProductHeader />
            <UserNav />
        </>
    )
}

export default withRouter(Account)