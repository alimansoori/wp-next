import React, {useEffect, useState} from 'react'
import GET_HOME_PAGE from "../gql/queries/get-home-page";
import {initializeApollo} from "../components/Apollo";

const apolloClient = initializeApollo();

const Test = ({initData}) => {

    /*const {loading, error, data} = useQuery(GET_PRODUCTS_ID_SLUG, {
        variables: {
            size: 200
        }
    })*/

    // const {loading, error, data} = useQuery(GET_HOME_PAGE)
    // const {loading, error, data} = useQuery(GET_VIEWER)

    return (
        <div className="product-wrap">
            {JSON.stringify(initData)}
            {/*{ JSON.stringify(data) }*/}
        </div>
    )
}

Test.getInitialProps = async ({ req, res }) => {
    let initData = {}

    if (typeof window === "undefined") {
        const res = await apolloClient.query({
            query: GET_HOME_PAGE,
        });
        const homePage = await res.data
        initData['homePage'] = homePage
        initData['window'] = 'SSR'
    } else {
        initData['window'] = 'CSR'
    }

    return {
        initData,
        initialApolloState: apolloClient.cache.extract()
    }
}

/*export async function getServerSideProps(context) {
    // apolloClient = initializeApollo();
    // await commonQueries(apolloClient, context)

    let initData = {}
    // await apolloClient.query({
    //     query: GET_HOME_PAGE,
    // });

    if (typeof window === "undefined") {
        console.log('SSR')
        await apolloClient.query({
            query: GET_HOME_PAGE,
        });
        initData['window'] = 'SSR'
    } else {
        initData['window'] = 'CSR'
    }


    return {
        props: {
            initData,
            initialApolloState: apolloClient.cache.extract(),
        },
    }
}*/
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