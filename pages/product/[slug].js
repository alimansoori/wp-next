import React, { useEffect } from 'react'
import { withRouter } from 'next/router'
import client from '../../components/ApolloClient'
import PRODUCT_BY_SLUG_QUERY from '../../gql/queries/product-by-slug';
import BasePage from '../../components/BasePage';
import ProductHeader from '../../components/productHeader/ProductHeader';
import ProductHero from '../../components/productHero/ProductHero';
import ProductInfo from '../../components/productInfo/ProductInfo';
import ProductSuggestion from '../../components/productSuggestion/ProductSuggestion';
import ProductSidebar from '../../components/productSidebar/ProductSidebar';

const Product = ({ productData, router }) => {

    useEffect(() => {
        console.log(productData)
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

export const getServerSideProps = async ({ query }) => {
    let productData = null;
    const { slug } = query
    const id = slug ? slug : query.id;

    try {
        const result = await client.query({
            query: PRODUCT_BY_SLUG_QUERY,
            variables: { id },
            partialRefetch: true,
            errorPolicy: 'all'
        });
        productData = result.data.product
    } catch (e) {
        console.error(e)
    }

    return {
        props: {
            productData
        }
    }
}

export default withRouter(Product)