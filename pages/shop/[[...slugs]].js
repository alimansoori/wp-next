import React, { useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import PropagateLoader from 'react-spinners/PropagateLoader'
import ProductHeader from '../../components/productHeader/ProductHeader'
import ProductItemBox from '../../components/productItemBox/ProductItemBox'
import ProductSidebar from '../../components/productSidebar/ProductSidebar'
import { Dropdown } from 'react-bootstrap'
import GET_PRODUCTS from '../../gql/queries/get-products'
import client from '../../components/ApolloClient'
import { productConstants } from '../../redux/actions/constants'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getProducts } from '../../redux/actions/product.actions'

const Shop = ({ productsData, router }) => {
    const dispatch = useDispatch()
    const { products, loading, pageInfo } = useSelector(state => state.product)
    const [size, setSize] = useState(20)
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        console.log(productsData)
        dispatch({
            type: productConstants.PRODUCTS_INIT,
            payload: {
                products: productsData.edges,
                pageInfo: productsData.pageInfo
            }
        });
    }, [])

    function fetchProductsMore()  {
        setOffset(offset+20)
        dispatch(getProducts(
            "",
            size,
            offset + 20
        ))
    }


    const Loader = () => {
        return (
            <div className="d-flex justify-content-center bd-highlight mb-3">
                <PropagateLoader
                    loading={true}
                    color="rgb(0, 114, 187)"
                />
            </div>
        )
    }

    return (
        <div className="search-wrap">
            <ProductHeader />
            <div className="search__body">
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
                                {`نام دسته بندی`}
                            </h1>
                        </div>
                        <div className="search__body__main__header__filter">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">فیلتر ها</Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">جدید ترین</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">قدیمی ترین</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">گران ترین</Dropdown.Item>
                                    <Dropdown.Item href="#/action-4">ارزان ترین</Dropdown.Item>
                                    <Dropdown.Item href="#/action-5">محبوب ترین</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="search__body__main__body" >
                        <InfiniteScroll
                            dataLength={products.length}
                            next={() => fetchProductsMore()}
                            hasMore={true}
                            loader={<Loader />}
                        >
                            <div className="container-fluid" >
                                <div className="row" >
                                    {
                                        products.length ? products.map(product => (
                                            <div key={product.node.id + Math.random()} className="col-md-3">
                                                <ProductItemBox product={product.node} />
                                            </div>
                                        )) : null
                                    }
                                </div>
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
                <div className="search__body__side">
                    {/* <ProductSidebar /> */}
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ query }) => {
    let productsData = [];
    const { slugs, q } = query
    const cats = slugs ? slugs : query.id;

    console.log(cats)

    try {
        const result = await client.query({
            query: GET_PRODUCTS,
            variables: {
                search: q,
                size: 20,
                offset: null
            },
            notifyOnNetworkStatusChange: true
        });
        productsData = result.data.products
    } catch (e) {
        console.error(e)
    }

    return {
        props: {
            productsData
        }
    }
}

export default withRouter(Shop)