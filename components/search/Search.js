import React, {useEffect, useRef, useState} from 'react'
import {useRouter} from 'next/router'
import {Dropdown, Spinner, Tab, Tabs} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {DelayInput} from 'react-delay-input'
import {getProductsBySearchInput} from '../../redux/actions/search.actions'
import {searchConstants} from '../../redux/actions/constants'
import {stringToNumber} from '../../functions'
import Link from 'next/link'
import PN from 'persian-number'

export default function Search() {
    const dispatch = useDispatch()
    const router = useRouter()
    const searchValue = router.query.q
    const {products, loading} = useSelector(state => state.search)
    const [value, setValue] = useState('')
    const [activeKey, setActiveKey] = useState('a')
    const [dropDownShow, setDropDownShow] = useState(false);

    // focus Search Input
    let searchInput = null

    const didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) {
            dispatch({type: searchConstants.SEARCH_BOX_CLEAR})

            dispatch(getProductsBySearchInput(value, 10, activeKey))
        } else didMount.current = true;

    }, [value, activeKey])

    useEffect(() => {
        if (loading) setDropDownShow(true)
    }, [loading])

    const SearchResultBox = () => {
        return (
            <Dropdown.Menu>
                <div className={`search-bar__suggestion`}>
                    <Tabs
                        defaultActiveKey={activeKey} id="uncontrolled-tab-example"
                        onSelect={(selectedKey) => setActiveKey(selectedKey)}
                    >
                        <Tab eventKey="a" title="همه">
                            {products.length ? <RenderResultItems/> : null}
                        </Tab>
                        <Tab eventKey="t" title="عنوان">
                            {products.length ? <RenderResultItems/> : null}
                        </Tab>
                        <Tab eventKey="wr" title="نویسنده">
                            {products.length ? <RenderResultItems/> : null}
                        </Tab>
                        <Tab eventKey="tr" title="مترجم">
                            {products.length ? <RenderResultItems/> : null}
                        </Tab>
                        <Tab eventKey="pu" title="ناشر">
                            {products.length ? <RenderResultItems/> : null}
                        </Tab>
                    </Tabs>
                    {products.length ? (
                        <Link
                            href={
                                {
                                    pathname: "/shop",
                                    query: {
                                        q: value,
                                        t: activeKey
                                    },
                                }
                            }
                            // shallow={true}
                        >
                            <a>
                                <button onClick={() => setDropDownShow(false)}
                                        className={`search-bar__suggestion__show-result`}>{`نمایش همه نتایج`}</button>
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
                {products.map((product, index) => {
                    return (
                        <SearchResultItem key={index} product={product.node}/>
                    )
                })}
            </div>
        )
    }

    const RenderSearchResultItemImage = ({img}) => {
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

    const SearchResultItem = ({product}) => {
        return (

            <Link as={`/product/${product.databaseId}/${product.slug}`}
                  href={`/product/[id]/[slug]`}>
                <a className={`search-bar__suggestion__tab-content-wrap`}>
                    <div className={`search-bar__suggestion__tab-content__pic`}>
                        <RenderSearchResultItemImage img={product.image}/>
                    </div>
                    <div className={`search-bar__suggestion__tab-content__box-wrap`}>
                        <h2 className="search-bar__suggestion__tab-content__box-wrap__book">
                            {product.name}
                        </h2>
                        <div className="search-bar__suggestion__tab-content__box-wrap__info">
                            <div className="search-bar__suggestion__tab-content__box-wrap__info__text">
                                <SearchResultItemAttrs attrs={product.paPublishers.nodes}/>
                            </div>
                            {product?.paTranslators?.nodes.length ? (
                                <div className="search-bar__suggestion__tab-content__box-wrap__info__separator">
                                    |
                                </div>
                            ) : null}
                            <div className="search-bar__suggestion__tab-content__box-wrap__info__text">
                                <SearchResultItemAttrs attrs={product?.paTranslators?.nodes}/>
                            </div>
                            {product?.paPublishers?.nodes.length ? (
                                <div className="search-bar__suggestion__tab-content__box-wrap__info__separator">
                                    |
                                </div>
                            ) : null}
                            <div className="search-bar__suggestion__tab-content__box-wrap__info__text">
                                <SearchResultItemAttrs attrs={product?.paWriters?.nodes}/>
                            </div>
                        </div>
                        <div className="search-bar__suggestion__tab-content__box-wrap__price">
                            <div className="search-bar__suggestion__tab-content__box-wrap__price__num--discount">
                                {(product.regularPrice && product.regularPrice !== product.price) ? PN.convertEnToPe(stringToNumber(product.regularPrice)) : null}
                            </div>
                            <div className="search-bar__suggestion__tab-content__box-wrap__price__num">
                                {PN.convertEnToPe(stringToNumber(product.price))}
                            </div>
                        </div>
                    </div>
                </a>
            </Link>

        )
    }

    const SearchResultItemAttrs = ({attrs}) => {
        let joinString = []
        attrs.map((e, i) => {
            let name = e.name
            let split = name.split("|")

            let nameRes = split.length ? split[0] : e.name

            joinString.push(<React.Fragment key={i}>
                <small>{nameRes}</small>
                {attrs.length - 1 !== i ? (<small>،</small>) : null}
            </React.Fragment>)
        })
        return joinString
    }

    const handleSubmitSearch = (e) => {
        e.preventDefault()
        router.push({
            pathname: "/shop",
            query: {
                q: value,
                t: activeKey
            }
        })
    }

    const handleOnToggle = (isOpen) => {
        setDropDownShow(isOpen)
    }

    return (
        <div className={`search-bar-wrap`}>
            <Dropdown show={dropDownShow} onToggle={handleOnToggle}>
                <Dropdown.Toggle as="div" id="dropdown-basic">
                    <form onSubmit={(e) => handleSubmitSearch(e)}>
                        <div className={`search-bar`}>
                            <div className={`search-bar__box`}>
                                {loading ? (
                                    <div className="search-data-loading">
                                        <Spinner animation="border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                    </div>
                                ) : null}
                                {/* <form onSubmit={() => alert('jjj')}> */}
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
                                    inputRef={(input) => {
                                        searchInput = input
                                    }}
                                    className={`search-bar__box__input`}
                                    placeholder="جست‌وجو"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                {/* </form> */}

                                <button className={`search-bar__box__icon`}>
                                    <img
                                        className={`search-bar__box__icon__img`}
                                        src={`/image/icon/Magnifying glass.svg`}
                                        alt="search"
                                    />
                                </button>
                            </div>
                        </div>
                    </form>
                </Dropdown.Toggle>
                <SearchResultBox/>
            </Dropdown>
        </div>
    )
}
