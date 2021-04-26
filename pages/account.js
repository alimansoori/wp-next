import React from 'react'
import { withRouter } from 'next/router'
import ProductHeader from '../components/productHeader/ProductHeader'
import UserNav from '../components/userNav/UserNav'


const Account = ({ router, viewer }) => {

    return (
        <>
            <ProductHeader />
            <UserNav />
        </>
    )
}

export const getServerSideProps = async ({ res, query }) => {
    let viewer = null;
    const { slug } = query

    if (!viewer) {
        // res.redirect('/404')
    }

    try {
        // const result = await client.query({
        //     query: GET_PRODUCTS,
        //     variables: {
        //         search: q,
        //         taxonomyFilter,
        //         orderby,
        //         size: 20,
        //         offset: null
        //     },
        //     notifyOnNetworkStatusChange: true
        // });
        // productsData = result.data.products


    } catch (e) {
        console.error(e)
    }

    return {
        props: {
            viewer
        }
    }
}

export default withRouter(Account)