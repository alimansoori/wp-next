import React, { useRef, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import BasePage from '../components/BasePage'
import GET_HOME_PAGE from '../gql/queries/get-home-page';
import client from '../components/ApolloClient'
import Search from '../components/search/Search'
import Landingheader from '../components/landingHeader/LandingHeader';

const Home = (props) => {

  const { homePageData } = props
  const divRef = useRef(null);

  const functionToBotHandler = () => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
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
      seo={homePageData.seo}
    >
      <div className={`landing`}>
        {/* <LandingLoading /> */}
        <div className={`landing-hero`}>
          <Landingheader />
          <div className={`landing-hero__logo`}>
            <img
              className={`landing-hero__logo__img`}
              src={`/image/LOGO TYPE 2.png`}
              alt="landing"
            />
          </div>
          <div className={`landing-hero__search`}>
            <Search />
          </div>
          <div className={`landing-hero__to-bot`}>
            <img
              className={`landing-hero__to-bot__icon`}
              onClick={functionToBotHandler}
              src={`/image/icon/Group 2.png`}
              alt="toBot"
            />
          </div>
        </div>
        <div style={{ marginTop: "-160px", height: "150px", overflow: "hidden" }}>
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            style={{ height: "100%", width: "100%" }}
          >
            <path
              d="M-4.79,174.17 C0.28,-21.20 468.68,168.25 501.97,-13.31 L500.00,150.00 L-51.06,183.05 Z"
              style={{ stroke: "none", fill: "#1a91dc" }}
            ></path>
          </svg>
        </div>
        <div className={`landing-bottom-wrap`}>
          <div className={`landing-bottom__left`}>
            <div className={`landing-bottom__left__first`}>
              <div className={`landing-bottom__left__box`}>{`مشاوره`}</div>
              <div className={`landing-bottom__left__box`}>
                {`کودک`} <br />{`و نوجـوان`}
              </div>
              <div className={`landing-bottom__left__box landing-bottom__left__box--disable`} >
                {`هدیه`}
              </div>
            </div>
            <div className={`landing-bottom__left__second`}>
              <div className={`landing-bottom__left__box`}>خرید کتاب</div>
              <div className={`landing-bottom__left__box`}>زبان</div>
              <div className={`landing-bottom__left__box landing-bottom__left__box--disable`}>
                {`بلاگ`}
              </div>
            </div>
          </div>
          <div className={`landing-bottom__right`}>
            <div className={`landing-bottom__right__box`}></div>
          </div>
        </div>
        <div ref={divRef} className={`return-to-top-wrap`}>
          <button onClick={functionToTopHandler} className={`return-to-top`}>
            <img src={`/image/icon/Polygon 1.svg`} alt="arrow" />
          </button>
        </div>
      </div>
      {/* <Link as={`/shop/slllluuuug`} href={`/shop/[[...slugs]]`}>
          <a>
            {`Shop`}
          </a>
        </Link>
        <hr />
        <Link as={`/sample-page`} href={`/[page]`} refetch={true} >
          <a>
            {`Sample Page`}
          </a>
        </Link> */}
    </BasePage>
  )
}

export const getServerSideProps = async (context) => {
  let homePageData = null;

  try {
    const result = await client.query({
      query: GET_HOME_PAGE,
      partialRefetch: true
    });
    homePageData = result.data.homepage
  } catch (e) {
    console.error(e)
  }

  return {
    props: {
      homePageData
    }
  }
}

export default Home