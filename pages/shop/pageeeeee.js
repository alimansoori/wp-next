import React, {useEffect, useState, useRef, useLayoutEffect} from 'react'
import {useRouter, withRouter} from 'next/router'
import {useDispatch, useSelector} from 'react-redux'
import PropagateLoader from 'react-spinners/PropagateLoader'
import ProductHeader from '../../components/productHeader/ProductHeader'
import ProductItemBox from '../../components/productItemBox/ProductItemBox'
import ProductSidebar from '../../components/productSidebar/ProductSidebar'
import {Dropdown} from 'react-bootstrap'
import GET_PRODUCTS from '../../gql/queries/get-products'
import GET_CATS from '../../gql/queries/get-categories'
import client, {ssrClient} from '../../components/ApolloClient'
import {categoryConstants, productConstants} from '../../redux/actions/constants'
import InfiniteScroll from 'react-infinite-scroll-component'
import {getProducts} from '../../redux/actions/product.actions'
import ScrollToTop from "react-scroll-to-top"
import PRODUCT_QUERY from "../../gql/queries/product-by-id";

const Shop = ({productsData, catsData, catsData2}) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const {slugs, q, sortby} = router.query
    const {products, loading, pageInfo} = useSelector(state => state.product)
    const {currentCategory} = useSelector(state => state.category)
    const [size, setSize] = useState(20)
    const [offset, setOffset] = useState(null)
    const [selectedKeySortBy, setSelectedKeySortBy] = useState(sortby)
    const sortData = [
        {
            key: 1,
            value: 'جدیدترین'
        }, {
            key: 2,
            value: 'قدیمی ترین'
        }, {
            key: 3,
            value: 'گران ترین'
        }, {
            key: 4,
            value: 'ارزان ترین'
        }, {
            key: 5,
            value: 'محبوب ترین'
        }
    ]

    useEffect(() => {
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

    // const didMount = useRef(false);
    useEffect(() => {
        // if (didMount.current) {
        if (selectedKeySortBy !== undefined) {
            router.push({
                pathname: "/shop/[[...slugs]]",
                query: {
                    ...router.query,
                    sortby: selectedKeySortBy,
                }
            }, undefined, {shallow: true});
        }
        // } else didMount.current = true;
    }, [selectedKeySortBy]);

    const didMount2 = useRef(false);
    useEffect(() => {
        if (didMount2.current) {
            dispatch(getProducts(
                q,
                slugs,
                sortby,
                size,
                offset,
            ))
        } else didMount2.current = true;
    }, [slugs, q, offset, sortby]);


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
    }

    return (
        <div className="search-wrap">
            <ProductHeader/>
            <div className="search__body">
                <ScrollToTop smooth />
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
                        <div className="search__body__main__header__filter">
                            <Dropdown onSelect={(selectedKey) => setSelectedKeySortBy(selectedKey)}>
                                <Dropdown.Toggle id="dropdown-basic">
                                    {sortby ? (sortData.find(sort => sort.key == sortby)).value : 'فیلترها'}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        sortData.map((sort, index) => (
                                            <Dropdown.Item key={index} eventKey={sort.key}>{sort.value}</Dropdown.Item>
                                        ))
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="search__body__main__body">
                        {loading ? (<Loader/>) : <RenderInfiniteScroll/>}
                    </div>
                </div>
                <div className="search__body__side">
                    <ProductSidebar slugs={slugs}/>
                </div>
            </div>
        </div>
    )
}

Shop.getInitialProps = async (ctx) => {
    let productsData = [];
    let catsData = [];
    let catsData2 = [];
    const {slugs, q, sortby} = ctx.query
    const cats = slugs ? slugs : ctx.query.id;
    const sortNum = sortby ? sortby : "1";

    var newClient = client;
    if (typeof window === "undefined") {
        newClient = ssrClient(ctx)
        console.log('ssr')
    } else {
        console.log('ccr')
    }

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
        const result = await newClient.query({
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

        const catsResult = await newClient.query({
            query: GET_CATS,
            variables: {
                first: 100
            },
            notifyOnNetworkStatusChange: true
        });

        catsData = catsResult.data.productCategories

        const catsResult2 = await newClient.query({
            query: GET_CATS,
            variables: {
                first: 100,
                after: "YXJyYXljb25uZWN0aW9uOjY4"
            },
            notifyOnNetworkStatusChange: true
        });

        catsData2 = catsResult2.data.productCategories


    } catch (e) {
        console.error(e)
    }

    return {
        productsData,
        catsData,
        catsData2
    }
}

export default Shop