import React, {useEffect} from 'react'
import GET_PRODUCTS from "../../../../gql/queries/get-products";
import PRODUCT_QUERY from "../../../../gql/queries/product-by-id";
import {initializeApollo} from "../../../../components/Apollo";
import {useRouter} from "next/router";

const apolloClient = initializeApollo()

const Product = ({product}) => {

    const router = useRouter();

    useEffect(() => {
        console.log('product', product)
    }, [product])

    if (router.isFallback) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            <div>Product = {product.name}</div>
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

export const getStaticProps = async (context) => {
    const {id, slug} = context.params

    console.log('Slug', slug)
    let product = null
    if (!id) throw new Error("Parameter is invalid")

    // console.log(parseInt(id))
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
            revalidate: 1
        }

    } catch (err) {
        console.log(err)
        return {
            notFound: true
        }
    }
}

export const getStaticPaths = async () => {
    const res = await apolloClient.query({
        query: GET_PRODUCTS,
        variables: {
            size: 10
        }
    })

    const {edges: products} = await res.data.products

    const paths = products?.map((product) => ({
        params: {
            id: product?.node?.databaseId.toString(),
            slug: decodeURI(product?.node?.slug),
        }
    }))

    console.log(paths)
    return {
        paths,
        fallback: true
    }
}

export default Product