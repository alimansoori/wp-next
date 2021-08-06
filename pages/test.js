import React, {useState} from 'react'
import GET_HOME_PAGE from "../gql/queries/get-home-page";
// import {initializeApollo} from "../components/Apollo";
import {useQuery} from "@apollo/client";
import GET_CART from "../gql/queries/get-cart";
import {commonQueries} from "../components/apollo/ApolloCommonQueries";
import GET_VIEWER from "../gql/queries/get-viewer";
import {getSession} from "next-auth/client";
import {initializeApollo} from "../components/Apollo";

const apolloClient = initializeApollo();

const Test = (props) => {

    // const {loading, error, data} = useQuery(GET_HOME_PAGE)
    // const {loading, error, data} = useQuery(GET_VIEWER)

    return (
        <div className="product-wrap">
            RTTTS
            {/*{ JSON.stringify(data) }*/}
        </div>
    )
}

export async function getServerSideProps(context) {
    // apolloClient = initializeApollo();
    await commonQueries(apolloClient, context)

    await apolloClient.query({
        query: GET_HOME_PAGE,
    });

    if (typeof window === "undefined") {
        console.log('SSR')
    } else {
        console.log('CCR')
    }


    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
    }
}
/*export async function getStaticProps(context) {
    if (typeof window === "undefined") {
        console.log('SSR')
    } else {
        console.log('CCR')
    }

    await commonQueries(apolloClient)

    await apolloClient.query({
        query: GET_HOME_PAGE,
    });


    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
        revalidate: 1000,
    };
}*/

export default Test