import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react'
import Custom404 from './404';
import BasePage from '../components/BasePage'
import GET_PAGE from '../gql/queries/get-page';
import {initializeApollo} from "../components/Apollo";
import ProductHeader from "../components/productHeader/ProductHeader";
import {Dropdown} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import PageHero from "../components/page/PageHero";
import PageSideBar from "../components/page/PageSideBar";

const apolloClient = initializeApollo()

function Page(props) {
    const {pageData} = props
    const {page} = pageData.data

    const router = useRouter()

    // const { data, error, loading } = useSWR('tttt', getPageData(router.query) , pageData)

    useEffect(() => {
        console.log(props)
    }, [])

    return (
        <>
            {pageData ? (
                <BasePage
                    className={pageData.slug}
                    seo={pageData.seo}
                >
                    <div className="product-wrap">
                        <ProductHeader/>
                        <div className="product__body">
                            <div className="product__body__main">
                                <PageHero page={page}/>
                            </div>
                            <div className="product__body__side">
                                <PageSideBar/>
                            </div>
                        </div>
                    </div>
                </BasePage>
            ) : <Custom404/>}
        </>
    )
}

export async function getStaticProps(context) {
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
        revalidate: 1000,
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

export default Page