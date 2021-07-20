import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Dropdown, Spinner, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { DelayInput } from 'react-delay-input'
import { getProductsBySearchInput } from '../../redux/actions/search.actions'
import { searchConstants } from '../../redux/actions/constants'
import { stringToNumber } from '../../functions'
import Link from 'next/link'

export default function Search() {
    const dispatch = useDispatch()
    const router = useRouter()
    const searchValue = router.query.q
    const { products, loading } = useSelector(state => state.search)
    const [value, setValue] = useState('')
    const [activeKey, setActiveKey] = useState('topic')

    // focus Search Input
    let searchInput = null

    useEffect(() => {
        // searchInput.click()
        // searchInput.focus()
    }, [searchInput])

    const didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) {
            dispatch({ type: searchConstants.SEARCH_BOX_CLEAR })

            // if (value.length > 0 && router.pathname == "/shop/[[...slugs]]") {
            //     router.push({
            //         pathname: "/shop/[[...slugs]]",
            //         query: {
            //             ...router.query,
            //             q: value,
            //         },
            //     });
            // }

            dispatch(getProductsBySearchInput(value, 10, activeKey))
        } else didMount.current = true;

    }, [value, activeKey])

    const SearchResultBox = () => {
        return (
            <Dropdown.Menu>
                <div className={`search-bar__suggestion`}>
                    <Tabs
                        defaultActiveKey={activeKey} id="uncontrolled-tab-example"
                        onSelect={(selectedKey) => setActiveKey(selectedKey)}
                    >
                        <Tab eventKey="topic" title="موضوع">
                            {products.length ? <RenderResultItems /> : null}
                        </Tab>
                        <Tab eventKey="writer" title="نویسنده">
                            {products.length ? <RenderResultItems /> : null}
                        </Tab>
                        <Tab eventKey="translator" title="مترجم">
                            {products.length ? <RenderResultItems /> : null}
                        </Tab>
                        <Tab eventKey="publisher" title="ناشر">
                            {products.length ? <RenderResultItems /> : null}
                        </Tab>
                        <Tab eventKey="all" title="همه">
                            {products.length ? <RenderResultItems /> : null}
                        </Tab>
                    </Tabs>
                    {products.length ? (
                        <Link
                            href={
                                {
                                    pathname: "/shop/[[...slugs]]",
                                    query: {
                                        ...router.query,
                                        q: value,
                                    },
                                }
                            }
                            shallow={true}
                        >
                            <a>
                                <button className={`search-bar__suggestion__show-result`}>{`نمایش همه نتایج`}</button>
                            </a>
                        </Link>
                    ) : null}
                </div>
            </Dropdown.Menu>
        )
    }

    const RenderResultItems = () => {

        return (
            <div className={`search-bar__suggestion__tab-content`}>
                {products.map((product) => {
                    return (
                        <SearchResultItem key={product.node.id} product={product.node} />
                    )
                })}
            </div>
        )
    }

    const RenderSearchResultItemImage = ({ img }) => {
        return (
            <>
                {img ? (
                    <img
                        className={`search-bar__suggestion__tab-content__pic__img`}
                        src={img.sourceUrl}
                        alt={img.altText}
                    />
                ) : (
                    <img
                        className={`search-bar__suggestion__tab-content__pic__img`}
                        src={`/image/book picture.png`}
                        alt="book"
                    />
                )}
            </>
        )
    }

    const SearchResultItem = ({ product }) => {
        return (

            <Link as={`/product/${product.slug}`}
                href={`/product/[slug]`} >
                <a className={`search-bar__suggestion__tab-content-wrap`}>
                    <div className={`search-bar__suggestion__tab-content__pic`}>
                        <RenderSearchResultItemImage img={product.image} />
                    </div>
                    <div className={`search-bar__suggestion__tab-content__box-wrap`}>
                        <h2 className="search-bar__suggestion__tab-content__box-wrap__book">
                            {product.name}
                        </h2>
                        <div className="search-bar__suggestion__tab-content__box-wrap__info">
                            <div className="search-bar__suggestion__tab-content__box-wrap__info__text">
                                <SearchResultItemAttrs attrs={product.paWriters.nodes} />
                            </div>
                            <div className="search-bar__suggestion__tab-content__box-wrap__info__separator">
                                |
                            </div>
                            <div className="search-bar__suggestion__tab-content__box-wrap__info__text">
                                <SearchResultItemAttrs attrs={product.paTranslators.nodes} />
                            </div>
                            <div className="search-bar__suggestion__tab-content__box-wrap__info__separator">
                                |
                            </div>
                            <div className="search-bar__suggestion__tab-content__box-wrap__info__text">
                                <SearchResultItemAttrs attrs={product.paPublishers.nodes} />
                            </div>
                        </div>
                        <div className="search-bar__suggestion__tab-content__box-wrap__price">
                            <div className="search-bar__suggestion__tab-content__box-wrap__price__num--discount">
                                {(product.regularPrice !== product.price) ? stringToNumber(product.regularPrice) : null}
                            </div>
                            <div className="search-bar__suggestion__tab-content__box-wrap__price__num">
                                {stringToNumber(product.price)} ت
                            </div>
                        </div>
                    </div>
                </a>
            </Link>

        )
    }

    const SearchResultItemAttrs = ({ attrs }) => {
        const joinString = attrs.map(e => {
            var name = e.name
            var split = name.split("|")

            var nameRes = split.length ? split[0] : e.name

            return nameRes
        }).join(',')
        return (
            <small>{joinString ? joinString : '......'}</small>
        )
    }

    return (
        <div className={`search-bar-wrap`}>
            <Dropdown>
                <Dropdown.Toggle as="div" id="dropdown-basic">
                    <div className={`search-bar`}>
                        <div className={`search-bar__box`}>
                            {loading ? (
                                <div className="search-data-loading">
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                </div>
                            ) : null}
                            {/* <input
                                type="text"
                                ref={(input) => { searchInput = input }}
                                className={`search-bar__box__input`}
                                placeholder="جست و جو"
                                value={searchValue ? searchValue : value}
                                onChange={(e) => setValue(e.target.value)}
                            /> */}
                            <DelayInput
                                minLength={2}
                                delayTimeout={500}
                                type="text"
                                inputRef={(input) => { searchInput = input }}
                                className={`search-bar__box__input`}
                                placeholder="جست و جو"
                                value={searchValue ? searchValue : value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                            <button className={`search-bar__box__icon`}>
                                <img
                                    className={`search-bar__box__icon__img`}
                                    src={`/image/icon/Magnifying glass.svg`}
                                    alt="search"
                                />
                            </button>
                        </div>
                    </div>
                </Dropdown.Toggle>
                <SearchResultBox />
            </Dropdown>
        </div>
    )
}
