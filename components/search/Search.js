import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Dropdown, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsBySearchInput } from '../../redux/actions/search.actions'
import { searchConstants } from '../../redux/actions/constants'
import { stringToNumber } from '../../functions'

function Search() {
    const dispatch = useDispatch()
    const router = useRouter()
    const searchValue = router.query.search
    const { products, loading } = useSelector(state => state.search)
    const [value, setValue] = useState('')

    const handleSearchChange = (e) => {
        e.preventDefault();
        setValue(e.target.value);
        console.log(e.target.value);
        (e.target.value.length > 2) ?
            dispatch(getProductsBySearchInput(value, 10)) :
            dispatch({ type: searchConstants.SEARCH_BOX_CLEAR })
    }

    const SearchResultBox = () => {
        return (
            <Dropdown.Menu>
                <div className={`search-bar__suggestion`}>
                    <Tabs defaultActiveKey="موضوع" id="uncontrolled-tab-example">
                        <Tab eventKey="موضوع" title="موضوع">
                            <div className={`search-bar__suggestion__tab-content`}>
                                {products.map((product) => {
                                    return (
                                        <SearchResultItem product={product.node} />
                                    )
                                })}
                            </div>
                        </Tab>
                        <Tab eventKey="نویسنده" title="نویسنده">
                            <div className={`search-bar__suggestion__tab-content`}>tab2</div>
                        </Tab>
                        <Tab eventKey="مترجم" title="مترجم">
                            <div className={`search-bar__suggestion__tab-content`}>tab3</div>
                        </Tab>
                        <Tab eventKey="ناشر" title="ناشر">
                            <div className={`search-bar__suggestion__tab-content`}>tab4</div>
                        </Tab>
                        <Tab eventKey="همه" title="همه">
                            <div className={`search-bar__suggestion__tab-content`}>all</div>
                        </Tab>
                    </Tabs>
                    <button className={`search-bar__suggestion__show-result`}>{`نمایش همه نتایج`}</button>
                </div>
            </Dropdown.Menu>
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
            <>
                <div className={`search-bar__suggestion__tab-content-wrap`}>
                    <div className={`search-bar__suggestion__tab-content__pic`}>
                        <RenderSearchResultItemImage img={product.image} />
                    </div>
                    <div className={`search-bar__suggestion__tab-content__box-wrap`}>
                        <div className={`search-bar__suggestion__tab-content__box`}>
                            <strong>نام کتاب: </strong>
                            <small>{product.name}</small>
                        </div>
                        <div className={`search-bar__suggestion__tab-content__box`}>
                            <strong>نویسنده: </strong>
                            <SearchResultItemAttrs attrs={product.paWriters.nodes} />
                        </div>
                    </div>
                    <div className={`search-bar__suggestion__tab-content__box-wrap`}>
                        <div className={`search-bar__suggestion__tab-content__box`}>
                            <strong>مترجم: </strong>
                            <SearchResultItemAttrs attrs={product.paTranslators.nodes} />
                        </div>
                        <div className={`search-bar__suggestion__tab-content__box`}>
                            <strong>قیمت: </strong>
                            <small>{stringToNumber(product.price)}</small>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const SearchResultItemAttrs = ({ attrs }) => {
        const joinString = attrs.map(e => e.name).join(',')
        return (
            <small>{joinString}</small>
        )
    }

    return (
        <div className={`search-bar-wrap`}>
            <Dropdown>
                <Dropdown.Toggle as="div" id="dropdown-basic">
                    <div className={`search-bar`}>
                        <div className={`search-bar__box`}>
                            <input
                                type="text"
                                className={`search-bar__box__input`}
                                placeholder="جست و جو"
                                value={searchValue ? searchValue : value}
                                onChange={(e) => handleSearchChange(e)}
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
                {products.length && <SearchResultBox />}
            </Dropdown>
        </div>
    )
}

export default Search
