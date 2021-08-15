import ScrollToTop from "react-scroll-to-top";
import {Accordion, Dropdown} from "react-bootstrap";
import ProductSidebar from "../productSidebar/ProductSidebar";
import FetchMore from "./FetchMore";
import ShopListLoader from "./ShopListLoader";
import React, {Fragment, useEffect} from "react";
import ProductItemBox from "../productItemBox/ProductItemBox";
import ShopFilterDropDown from "./ShopFilterDropDawn";
import {useDispatch, useSelector} from "react-redux";
import {alertMessage} from "../../functions";
import {NotificationContainer} from "react-notifications";
import {viewerConstants} from "../../redux/actions/constants";

export default function ShopBody({products, page_info, page_info2, loading, loadingfetchmore, onFetchMore, setSort, sort}) {
    const dispatch = useDispatch()
    const {currentCategory} = useSelector(state => state.category)

    return (
        <>
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
                            {currentCategory ? currentCategory.node.title : null}
                        </h1>
                    </div>
                    <ShopFilterDropDown sortby={sort} setSort={setSort} />
                </div>
                <div className="search__body__main__body">
                    <div className="container-fluid">
                        <div className="row">
                            {typeof products !== 'undefined' && products?.map((product, index) => (
                                <div key={index} className="col-md-4">
                                    <ProductItemBox product={product.node} />
                                </div>
                            ))}
                        </div>
                        {(loading || loadingfetchmore) ?
                            (<ShopListLoader/>) :
                            (
                                (page_info?.hasNextPage || page_info2?.hasNextPage) ? (
                                    <FetchMore onFetchMore={onFetchMore}/>
                                ) : null
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}