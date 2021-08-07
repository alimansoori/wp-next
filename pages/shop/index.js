import React, {Fragment} from 'react'
import {initializeApollo} from "../../components/Apollo";
import GET_PRODUCTS from "../../gql/queries/get-products";
import {useRouter} from "next/router";
import Link from 'next/link'

const apolloClient = initializeApollo()

export default function Shop({products}) {
    const router = useRouter()
    const {asPath, locale} = router
    const {q, sort} = router.query

    return (
        <>
            <div>{products?.edges?.map((product) => (
                <Fragment key={product.node.id}>
                    <Link href={`/product/${product.node.databaseId}/${product.node.slug}`}>
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

export async function getStaticProps(context) {

    const res = await apolloClient.query({
        query: GET_PRODUCTS,
        variables: {
            size: 5
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
}