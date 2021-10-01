import {useRouter} from 'next/router';
import React, {useEffect} from 'react'
import Custom404 from './404';
import BasePage from '../components/BasePage'
import GET_PAGE from '../gql/queries/get-page';
import {initializeApollo} from "../components/Apollo";
import ProductHeader from "../components/productHeader/ProductHeader";
import PageHero from "../components/page/PageHero";
import PageSideBar from "../components/page/PageSideBar";
import Footer from "../components/footer/Footer";
import type {InferGetStaticPropsType} from 'next'

const apolloClient = initializeApollo()

export async function getStaticProps(context: any) {
    const {page} = context.params

    const pageData = await apolloClient.query({
        query: GET_PAGE,
        variables: {id: page},
    });


    return {
        props: {
            pageData,
            initialApolloState: apolloClient.cache.extract(),
        },
        revalidate: 1,
    };
}

export async function getStaticPaths() {
    return {
        paths: [
            {params: {page: "contact-us"}},
            {params: {page: "about-us"}},
            {params: {page: "buy-shipping"}},
            {params: {page: "faq"}},
            {params: {page: "terms-conditions"}},
            {params: {page: "privacy-policy"}}
        ],
        fallback: false // See the "fallback" section below
    };
}

export default function Page({pageData}: InferGetStaticPropsType<typeof getStaticProps>) {
    const {page} = pageData.data

    const router = useRouter()

    useEffect(() => {
        console.log(pageData)
    }, [])

    return (
        <>
            {pageData ? (
                <BasePage
                    className={pageData.slug}
                    seo={pageData.seo}
                >
                    <div className="product-wrap">
                        <ProductHeader fixed={true}/>
                        <div className="product__body">
                            <div className="product__body__main">
                                <PageHero page={page}/>
                            </div>
                            <div className="product__body__side">
                                <PageSideBar/>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </BasePage>
            ) : <Custom404/>}
        </>
    )
}