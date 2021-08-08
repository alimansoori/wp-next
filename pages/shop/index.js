import React, {Fragment, useEffect, useState} from 'react'
import {initializeApollo} from "../../components/Apollo";
import GET_PRODUCTS from "../../gql/queries/get-products";
import {useRouter} from "next/router";
import Link from 'next/link'
import GET_HOME_PAGE from "../../gql/queries/get-home-page";
import {useQuery} from "@apollo/client";
import LandingLoading from "../../components/landingLoading/LandingLoading";

const apolloClient = initializeApollo()

export default function Shop() {
    const router = useRouter()
    const {asPath, locale} = router
    const {q, sort} = router.query

    const {loading, error, data} = useQuery(GET_PRODUCTS, {
        variables: {
            size: 10
        },
        fetchPolicy: "cache-and-network"
    })

    if (loading) return <LandingLoading />
    if (error) return <h1>Errors: {error}</h1>
    const {products} = data

    return (
        <>
            <Link
                href={`/test`}
            >
                <a>
                    Test
                </a>
            </Link>
            <div>{products?.edges?.map((product) => (
                <Fragment key={product.node.id}>
                    <Link
                        prefetch={true}
                        shallow={true}
                        href={`/product/[id]/[slug]`}
                        as={`/product/${product.node.databaseId}/${product.node.slug}`}
                    >
                        <a>
                            {product.node.name}
                        </a>
                    </Link>
                    <br/>
                </Fragment>
            ))}
            </div>
        </>
    )
}

Shop.getInitialProps = async ({req, res}) => {

    if (typeof window === 'undefined') {
        await apolloClient.query({
            query: GET_PRODUCTS,
            variables: {
                size: 10
            }
        })
    }

    return {
        initialApolloState: apolloClient.cache.extract()
    }
}

/*
export async function getStaticProps(context) {

    const res = await apolloClient.query({
        query: GET_PRODUCTS,
        variables: {
            size: 10
        }
    })

    const {products} = await res.data

    return {
        props: {
            products,
            initialApolloState: apolloClient.cache.extract()
        },
        revalidate: 200
    }
}*/
