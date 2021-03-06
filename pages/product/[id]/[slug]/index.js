import React, {useEffect} from 'react'
import GET_PRODUCTS from "../../../../gql/queries/get-products";
import PRODUCT_QUERY from "../../../../gql/queries/product-by-id";
import {initializeApollo} from "../../../../components/Apollo";
import {useRouter} from "next/router";
import GET_PRODUCTS_ID_SLUG from "../../../../gql/queries/get-products-id-slug";
import GET_HOME_PAGE from "../../../../gql/queries/get-home-page";
import {useQuery} from "@apollo/client";
import BasePage from "../../../../components/BasePage";
import ProductHeader from "../../../../components/productHeader/ProductHeader";
import ProductHero from "../../../../components/productHero/ProductHero";
import ProductInfo from "../../../../components/productInfo/ProductInfo";
import ProductSuggestion from "../../../../components/productSuggestion/ProductSuggestion";
import ProductSidebar from "../../../../components/productSidebar/ProductSidebar";
import LandingLoading from "../../../../components/landingLoading/LandingLoading";
import GET_CATS from "../../../../gql/queries/get-categories";
import {useDispatch, useSelector} from "react-redux";
import {alertMessage} from "../../../../functions";
import {cartConstants, viewerConstants} from "../../../../redux/actions/constants";

const Product = (props) => {

    const router = useRouter();
    const dispatch = useDispatch()
    const {id, slug} = router.query
    const {message: messageCart} = useSelector(state => state.cart)
    const {message: messageFavorite} = useSelector(state => state.viewer.favorite)

    useEffect(() => {
        if (messageFavorite) {
            alertMessage(messageFavorite, 'success')
            dispatch({
                type: viewerConstants.CLEAR_FAVORITE_MESSAGE
            })
        }
        if (messageCart) {
            alertMessage(messageCart, 'success')
            dispatch({
                type: cartConstants.CLEAR_MESSAGE
            })
        }
    }, [messageFavorite, messageCart])

    let product = {}

    const {loading: loadingProduct, error, data} = useQuery(PRODUCT_QUERY, {
        variables: {
            id,
            idType: 'DATABASE_ID'
        },
    })

    // Fetch Categories
    const {loading: loadingCats, error: errorCats, data: dataCats} = useQuery(GET_CATS, {
        variables: {
            first: 200,
        },
    })


    // if (loading) return <h1>Loading ..</h1>
    if (error) return <h1>Errors: {error}</h1>
    product = data?.product ? data.product : product

    return (
        <BasePage
            product
            className={`product-page`}
            seo={product?.seo}
        >
            <div className="product-wrap">
                <LandingLoading/>
                <ProductHeader fixed={true}/>
                <div className="product__body">
                    <div className="product__body__main">
                        <ProductHero product={product}/>
                        <ProductInfo product={product}/>
                        <ProductSuggestion products={product?.related?.nodes ? product?.related?.nodes : []}/>
                    </div>
                    <div className="product__body__side">
                        <ProductSidebar loading={loadingCats} cats={dataCats} cat={data?.product?.productCategories?.nodes.length ? ((data?.product?.productCategories?.nodes[data?.product?.productCategories?.nodes.length - 1]).slug)  : undefined}/>
                    </div>
                </div>
            </div>
        </BasePage>
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

Product.getInitialProps = async (ctx) => {
    const apolloClient = initializeApollo(null, ctx)
    const {req, res, query} = ctx
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
                },
            })

            product = await res.data.product

            await apolloClient.query({
                query: GET_CATS,
                variables: {
                    first: 200,
                }
            })

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