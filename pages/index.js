import React, {useRef, useEffect, useState} from 'react'
import Link from 'next/link'
import BasePage from '../components/BasePage'
import GET_HOME_PAGE from '../gql/queries/get-home-page';
import Search from '../components/search/Search'
import Landingheader from '../components/landingHeader/LandingHeader';
import {initializeApollo} from "../components/Apollo";
import Footer from "../components/footer/Footer";
import LandingLoading from "../components/landingLoading/LandingLoading";

const client = initializeApollo()

const Home = (props) => {

    const {homePageData} = props
    const divRef = useRef(null);

    const functionToBotHandler = () => {
        divRef.current.scrollIntoView({behavior: "smooth"});
    };
    const functionToTopHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        functionToBotHandler();
        functionToTopHandler();
    }, []);

    return (
        <BasePage
            homePage
            className={`home-page`}
            seo={homePageData?.seo}
        >

            <div className={`landing`}>
                <LandingLoading/>
                <div className={`landing-hero`}>
                    <Landingheader/>
                    <div className={`landing-hero__logo`}>
                        <img
                            className={`landing-hero__logo__img`}
                            src={`/image/logo-type2.svg`}
                            alt="landing"
                        />
                    </div>
                    <div className={`landing-hero__search`}>
                        <Search/>
                    </div>
                    <div className={`landing-hero__to-bot`}>
                        <img
                            className={`landing-hero__to-bot__icon`}
                            onClick={functionToBotHandler}
                            src={`/image/icon/Scroll.svg`}
                            alt="toBot"
                        />
                    </div>
                </div>
                <div style={{marginTop: "-160px", height: "150px", overflow: "hidden"}}>
                    <svg
                        viewBox="0 0 500 150"
                        preserveAspectRatio="none"
                        style={{height: "100%", width: "100%"}}
                    >
                        <path
                            d="M-4.79,174.17 C0.28,-21.20 468.68,168.25 501.97,-13.31 L500.00,150.00 L-51.06,183.05 Z"
                            style={{stroke: "none", fill: "#1a91dc"}}
                        ></path>
                    </svg>
                </div>
                <div className={`landing-bottom-wrap`}>
                    <div className={`landing-bottom__left`}>
                        <div className={`landing-bottom__left__first`}>
                            <Link
                                href={`/shop/category/[category]`}
                                as={`/shop/category/english-language`}
                                shallow={true}
                            >
                                <a className='landing-bottom__left__box'>
                                    زبان
                                </a>
                            </Link>
                            <a target='_blank' href="http://dastanablog.ir/" className={`landing-bottom__left__box`}>
                                {`بلاگ`}
                            </a>
                            <div className={`landing-bottom__left__box landing-bottom__left__box--disable`}>
                                {`هدیه`}
                            </div>
                        </div>
                        <div className={`landing-bottom__left__second`}>
                            <Link
                                href='/shop'
                                shallow={true}
                            >
                                <a className='landing-bottom__left__box'>
                                    خرید کتاب
                                </a>
                            </Link>

                            {/* <div className={`landing-bottom__left__box`}>خرید کتاب</div> */}
                            {/* <div className={`landing-bottom__left__box`}></div> */}
                            <Link
                                href={`/shop/category/[category]`}
                                as={`/shop/category/kids-teenagers`}
                                shallow={true}
                            >
                                <a className='landing-bottom__left__box'>
                                    {`کودک`} <br/>{`و نوجـوان`}
                                </a>
                            </Link>
                            <div
                                className={`landing-bottom__left__box landing-bottom__left__box--disable`}>{`مشاوره`}</div>
                        </div>
                    </div>
                    <div className={`landing-bottom__right`}>
                        <div className={`landing-bottom__right__box`}></div>
                    </div>
                </div>
                <div ref={divRef} className={`return-to-top-wrap`}>
                    <button onClick={functionToTopHandler} className={`return-to-top`}>
                        <img src={`/image/icon/Polygon 1.svg`} alt="arrow"/>
                    </button>
                </div>

            </div>
            <Footer/>
        </BasePage>
    )
}

export const getStaticProps = async (context) => {
    let homePageData = null;

    try {
        const result = await client.query({
            query: GET_HOME_PAGE,
        });
        homePageData = result.data.homepage
    } catch (e) {
        console.error('HomePage Error', e)
    }

    return {
        props: {
            homePageData,
            initialApolloState: client.cache.extract(),
        },
        revalidate: 100
    }
}

export default Home