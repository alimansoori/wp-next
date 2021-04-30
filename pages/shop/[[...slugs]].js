import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { withRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import PropagateLoader from 'react-spinners/PropagateLoader'
import ProductHeader from '../../components/productHeader/ProductHeader'
import ProductItemBox from '../../components/productItemBox/ProductItemBox'
import ProductSidebar from '../../components/productSidebar/ProductSidebar'
import { Dropdown } from 'react-bootstrap'
import GET_PRODUCTS from '../../gql/queries/get-products'
import GET_CATS from '../../gql/queries/get-categories'
import client from '../../components/ApolloClient'
import { categoryConstants, productConstants } from '../../redux/actions/constants'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getProducts } from '../../redux/actions/product.actions'

const Shop = ({ productsData, catsData, catsData2, router }) => {
    const dispatch = useDispatch()
    const { slugs, q, sortby } = router.query
    const { products, loading, pageInfo } = useSelector(state => state.product)
    const [size, setSize] = useState(20)
    const [offset, setOffset] = useState(null)
    const [selectedKeySortBy, setSelectedKeySortBy] = useState(sortby)

    useEffect(() => {
        // console.log(productsData)
        // console.log('catsData', catsData)
        // console.log('catsData2', catsData2)
        dispatch({
            type: productConstants.PRODUCTS_INIT,
            payload: {
                products: productsData.edges,
                pageInfo: productsData.pageInfo
            }
        });
        dispatch({
            type: categoryConstants.CATEGORIES_INIT,
            payload: {
                categories: catsData.edges.concat(catsData2.edges),
            }
        });
    }, [])

    const didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) {
            if (selectedKeySortBy !== undefined) {
                router.push({
                    pathname: "/shop/[[...slugs]]",
                    query: {
                        ...router.query,
                        sortby: selectedKeySortBy,
                    }
                }, undefined, { shallow: true });
            }

            dispatch(getProducts(
                q,
                slugs,
                sortby,
                size,
                offset,
            ))
        } else didMount.current = true;;
    }, [selectedKeySortBy, slugs, q, offset, sortby]);


    // function fetchProductsMore()  {
    //     setOffset(offset+20)
    //     dispatch(getProducts(
    //         q,
    //         slugs,
    //         sortby,
    //         size,
    //         offset + 20,
    //     ))
    // }


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

    const RenderInfiniteScroll = () => {
        return (
            <InfiniteScroll
                dataLength={products.length}
                next={() => setOffset(offset + 20)}
                hasMore={pageInfo ? pageInfo.offsetPagination.hasMore : true}
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
                            <Dropdown onSelect={(selectedKey) => setSelectedKeySortBy(selectedKey)}>
                                <Dropdown.Toggle id="dropdown-basic">فیلتر ها</Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="1">جدید ترین</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">قدیمی ترین</Dropdown.Item>
                                    <Dropdown.Item eventKey="3">گران ترین</Dropdown.Item>
                                    <Dropdown.Item eventKey="4">ارزان ترین</Dropdown.Item>
                                    <Dropdown.Item eventKey="5">محبوب ترین</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="search__body__main__body" >
                        {loading ? (<Loader />) : <RenderInfiniteScroll />}
                    </div>
                </div>
                <div className="search__body__side">
                    <ProductSidebar slugs={slugs} />
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ query }) => {
    let productsData = [];
    let catsData = [];
    let catsData2 = [];
    const { slugs, q, sortby } = query
    const cats = slugs ? slugs : query.id;
    const sortNum = sortby ? sortby : "1";

    var orderby = [];

    let taxonomyFilter = [];

    if (Array.isArray(cats) && cats.length) {
        taxonomyFilter = [
            {
                and: [
                    {
                        operator: "IN",
                        taxonomy: "PRODUCTCATEGORY",
                        terms: [cats[cats.length - 1]]
                    }
                ]
            }
        ]
    }

    switch (sortNum) {
        case "1":
            orderby.push({
                'field': 'DATE',
                'order': 'DESC'
            })
            break;
        case "2":
            orderby.push({
                'field': 'DATE',
                'order': 'ASC'
            })
            break;
        case "3":
            orderby.push({
                'field': 'PRICE',
                'order': 'DESC'
            })
            break;
        case "4":
            orderby.push({
                'field': 'PRICE',
                'order': 'ASC'
            })
            break;
        case "5":
            orderby.push({
                'field': 'RATING',
                'order': 'DESC'
            })
            break;

        default:
            orderby.push({
                'field': 'DATE',
                'order': 'DESC'
            })
            break;
    }

    try {
        const result = await client.query({
            query: GET_PRODUCTS,
            variables: {
                search: q,
                taxonomyFilter,
                orderby,
                size: 20,
                offset: null
            },
            notifyOnNetworkStatusChange: true
        });
        productsData = result.data.products

        const catsResult = await client.query({
            query: GET_CATS,
            variables: {
                first: 100
            },
            notifyOnNetworkStatusChange: true
        });

        catsData = catsResult.data.productCategories

        const catsResult2 = await client.query({
            query: GET_CATS,
            variables: {
                first: 100,
                after: "YXJyYXljb25uZWN0aW9uOjkw"
            },
            notifyOnNetworkStatusChange: true
        });

        catsData2 = catsResult2.data.productCategories


    } catch (e) {
        console.error(e)
    }

    return {
        props: {
            productsData,
            catsData,
            catsData2
        }
    }
}

export default withRouter(Shop)