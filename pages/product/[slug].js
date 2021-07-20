import React, { useEffect } from 'react'
import { withRouter } from 'next/router'
import client, { ssrClient } from '../../components/ApolloClient'
import PRODUCT_BY_SLUG_QUERY from '../../gql/queries/product-by-slug';
import BasePage from '../../components/BasePage';
import ProductHeader from '../../components/productHeader/ProductHeader';
import ProductHero from '../../components/productHero/ProductHero';
import ProductInfo from '../../components/productInfo/ProductInfo';
import ProductSuggestion from '../../components/productSuggestion/ProductSuggestion';
import ProductSidebar from '../../components/productSidebar/ProductSidebar';

const Product = ({ productData, router }) => {

    useEffect(() => {
        console.log('productData', productData)
    })

    return (
        <>
            <BasePage
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
            </BasePage>
        </>

    )
}

Product.getInitialProps = async (ctx) => {
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
}

export default withRouter(Product)