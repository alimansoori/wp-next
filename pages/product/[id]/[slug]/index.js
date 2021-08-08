import React, {useEffect} from 'react'
import GET_PRODUCTS from "../../../../gql/queries/get-products";
import PRODUCT_QUERY from "../../../../gql/queries/product-by-id";
import {initializeApollo} from "../../../../components/Apollo";
import {useRouter} from "next/router";
import GET_PRODUCTS_ID_SLUG from "../../../../gql/queries/get-products-id-slug";
import GET_HOME_PAGE from "../../../../gql/queries/get-home-page";
import {useQuery} from "@apollo/client";

const apolloClient = initializeApollo()

const Product = (props) => {

    const router = useRouter();
    const {id, slug} = router.query

    const {loading, error, data} = useQuery(PRODUCT_QUERY, {
        variables: {
            id,
            idType: 'DATABASE_ID'
        }
    })

    if (loading) return <h1>Loading ...</h1>
    if (error) return <h1>Errors: {error}</h1>
    const {product} = data

    return (
        <>
            <h1>{JSON.stringify(product.name)}</h1>
            {/*<BasePage
                product
                className={`product-page`}
                seo={productData.seo}
            >
                <div className="product-wrap">
                    <ProductHeader />
                    <div className="product__body">
                        <div className="product__body__main">
                            <ProductHero product={productData} />
                            <ProductInfo product={productData} />
                            <ProductSuggestion products={productData.related.nodes} />
                        </div>
                        <div className="product__body__side">
                            <ProductSidebar />
                        </div>
                    </div>
                </div>
            </BasePage>*/}
        </>

    )
}

/*Product.getInitialProps = async (ctx) => {
    let productData = null;
    const { slug } = ctx.query
    const id = slug ? slug : ctx.query.id;

    if(typeof window === 'undefined') {
        try {
            const result = await ssrClient(ctx).query({
                query: PRODUCT_BY_SLUG_QUERY,
                variables: { id },
                // partialRefetch: true,
                // errorPolicy: 'all',
                fetchPolicy: 'cache-first'
            });
            productData = result.data.product
        } catch (e) {
            console.error(e)
        }
    } else {
        try {
            const result = await client.query({
                query: PRODUCT_BY_SLUG_QUERY,
                variables: { id },
                // partialRefetch: true,
                // errorPolicy: 'all',
                fetchPolicy: 'cache-first'
            });
            productData = result.data.product
        } catch (e) {
            console.error(e)
        }
    }

    return {
        productData
    }
}*/

/*export const getStaticProps = async (context) => {
    const {id, slug} = context.params

    let product = null
    if (!id) throw new Error("Parameter is invalid")

    try {
        const res = await apolloClient.query({
            query: PRODUCT_QUERY,
            variables: {
                id,
                idType: 'DATABASE_ID'
            }
        })

        product = await res.data.product

        return {
            props: {
                product: product,
                initialApolloState: apolloClient.cache.extract()
            },
            revalidate: 60
        }

    } catch (err) {
        console.log(err)
        return {
            notFound: true
        }
    }
}*/

Product.getInitialProps = async ({req, res, query}) => {
    let product = null
    const {id, slug} = query

    if (!id) throw new Error("Parameter is invalid")

    if (typeof window === 'undefined') {
        try {
            const res = await apolloClient.query({
                query: PRODUCT_QUERY,
                variables: {
                    id,
                    idType: 'DATABASE_ID'
                }
            })

            product = await res.data.product

        } catch (err) {
            return {
                notFound: true
            }
        }
    } else {

    }

    return {
        product,
        initialApolloState: apolloClient.cache.extract(),
        notFound: false
    }
}

/*export const getStaticPaths = async () => {
    const res = await apolloClient.query({
        variables: {
            size: 1000
        }
    })

    const {edges: products} = await res.data.products

    const paths = products?.map((product) => ({
        params: {
            id: product?.node?.databaseId.toString(),
            slug: decodeURI(product?.node?.slug),
        }
    }))

    return {
        paths,
        fallback: true
    }
}*/

export default Product