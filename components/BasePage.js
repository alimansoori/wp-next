import React from 'react'
import Head from 'next/head'
import useCanonical from '../hooks/useCanonical'

export default function BasePage(props) {
    const { className, children, seo, homePage } = props

    const pageType = homePage ? 'home-page' : 'base-page'
    const canonical = seo && seo.canonical ? useCanonical(seo.canonical) : null
    const opengraphUrl = seo && seo.opengraphUrl ? useCanonical(seo.opengraphUrl) : null
    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <title>{seo.title}</title>
                
                {seo.canonical && <link rel="canonical" href={canonical} />}
                {seo.metaDesc && <meta name="description" content={seo.metaDesc} />}
                {seo.metaKeywords && <meta name="keywords" content={seo.metaKeywords} />}
                {seo.title && <meta name="title" content={seo.title} />}
                {seo.opengraphTitle && <meta property="og:title" key="og:title" content={seo.opengraphTitle} />}
                {seo.opengraphUrl && <meta property="og:url" key="og:url" content={opengraphUrl} />}
                {seo.opengraphType && <meta property="og:type" key="og:type" content={seo.opengraphType} />}
                {seo.opengraphSiteName && <meta property="og:site_name" key="og:site_name" content={seo.opengraphSiteName} />}
                {seo.opengraphDescription && <meta property="og:description" key="og:description" content={seo.opengraphDescription} />}
                {seo.opengraphImage && <meta property="og:image" key="og:image" content={seo.opengraphImage.sourceUrl} />}
                {seo.opengraphAuthor && <meta property="article:author" content={seo.opengraphAuthor} />}
                {seo.opengraphModifiedTime && <meta property="article:modified_time" content={seo.opengraphModifiedTime} />}
                {seo.opengraphPublishedTime && <meta property="article:published_time" content={seo.opengraphPublishedTime} />}
                {seo.opengraphPublisher && <meta property="article:publisher" content={seo.opengraphPublisher} />}
                {seo.twitterDescription && <meta property="twitter:description" content={seo.twitterDescription} />}
                {seo.twitterTitle && <meta property="twitter:title" content={seo.twitterTitle} />}
                {seo.twitterImage && <meta property="twitter:image" content={seo.twitterImage.sourceUrl} />}
            </Head>
            <div className={`${pageType} ${className}`}>
                {children}
            </div>
        </>
    )
}
