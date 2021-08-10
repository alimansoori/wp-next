import ScrollToTop from "react-scroll-to-top";
import {Accordion, Dropdown} from "react-bootstrap";
import ProductSidebar from "../productSidebar/ProductSidebar";
import FetchMore from "./FetchMore";
import ShopListLoader from "./ShopListLoader";
import React, {Fragment} from "react";
import Link from "next/link";
import ProductItemBox from "../productItemBox/ProductItemBox";
import ShopFilterDropDown from "./ShopFilterDropDawn";

export default function ShopBody({products, loading, loadingfetchmore, onFetchMore, setSort, sort}) {

    /*const RenderInfiniteScroll = () => {
        return (
            <InfiniteScroll
                dataLength={products.length}
                next={() => setOffset(offset + 20)}
                hasMore={pageInfo ? pageInfo.offsetPagination.hasMore : true}
                loader={<Loader/>}
            >
                <div className="container-fluid">
                    <div className="row">
                        {
                            products.length ? products.map(product => (
                                <div key={product.node.id + Math.random()} className="col-md-4">
                                    <ProductItemBox product={product.node}/>
                                </div>
                            )) : null
                        }
                    </div>
                </div>
            </InfiniteScroll>
        )
    }*/

    return (
        <div className="search__body">
            <ScrollToTop smooth/>
            <div className="search__body__main">
                <div className="p-hero-box-wrap-fade"></div>

                <div className="search__body__main__header">
                    <img
                        className="search__body__main__header__rect"
                        src={`/image/Rectangle 70.png`}
                        alt="rect"
                    />
                    <div className="search__body__main__header__title">
                        <h1 className="search__body__main__header__title__text">
                            {/*{currentCategory ? currentCategory.node.title : null}*/}
                        </h1>
                    </div>
                    <ShopFilterDropDown sortby={sort} setSort={setSort} />
                </div>
                <div className="search__body__main__body">
                    <div className="container-fluid">
                        <div className="row">
                            {typeof products !== 'undefined' && products?.map((product) => (
                                <div key={product.node.id} className="col-md-4">
                                    <ProductItemBox product={product.node} />
                                </div>
                                /*<Fragment key={product.node.id}>
                                    <Link
                                        prefetch={true}
                                        shallow={true}
                                        href={`/product/[id]/[slug]`}
                                        as={`/product/${product.node.databaseId}/${product.node.slug}`}
                                    >
                                        <a>
                                            {product.node.name}
                                        </a>
                                    </Link>
                                    <br/>
                                </Fragment>*/
                            ))}
                        </div>
                        {(loading || loadingfetchmore) ? (<ShopListLoader/>) : <FetchMore onFetchMore={onFetchMore}/>}
                    </div>
                </div>
            </div>
            <div className="search__body__side">
                {/*<ProductSidebar slugs={slugs}/>*/}
            </div>
        </div>
    )
}