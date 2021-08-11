import ScrollToTop from "react-scroll-to-top";
import {Accordion, Dropdown} from "react-bootstrap";
import ProductSidebar from "../productSidebar/ProductSidebar";
import FetchMore from "./FetchMore";
import ShopListLoader from "./ShopListLoader";
import React, {Fragment} from "react";
import Link from "next/link";
import ProductItemBox from "../productItemBox/ProductItemBox";
import ShopFilterDropDown from "./ShopFilterDropDawn";

export default function ShopBody({products, page_info, loading, loadingfetchmore, onFetchMore, setSort, sort}) {

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
                            ))}
                        </div>
                        {(loading || loadingfetchmore) ?
                            (<ShopListLoader/>) :
                            (
                                page_info?.offsetPagination?.hasMore ? (
                                    <FetchMore onFetchMore={onFetchMore}/>
                                ) : null
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="search__body__side">
                {/*<ProductSidebar slugs={slugs}/>*/}
            </div>
        </div>
    )
}