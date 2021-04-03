import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Dropdown, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { DelayInput } from 'react-delay-input'
import { getProductsBySearchInput } from '../../redux/actions/search.actions'
import { searchConstants } from '../../redux/actions/constants'
import { stringToNumber } from '../../functions'

function Search() {
    const dispatch = useDispatch()
    const router = useRouter()
    const searchValue = router.query.search
    const { products, loading } = useSelector(state => state.search)
    const [value, setValue] = useState('')
    const [activeKey, setActiveKey] = useState('translator')

    // focus Search Input
    let searchInput = null

    useEffect(() => {
        searchInput.focus()
    })

    useEffect(() => {
        dispatch({ type: searchConstants.SEARCH_BOX_CLEAR })

        if (value.length > 2) {
            dispatch(getProductsBySearchInput(value, 10, activeKey))
        }
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
                            {products.length && <RenderResultItems />}
                        </Tab>
                        <Tab eventKey="writer" title="نویسنده">
                            {products.length && <RenderResultItems />}
                        </Tab>
                        <Tab eventKey="translator" title="مترجم">
                            {products.length && <RenderResultItems />}
                        </Tab>
                        <Tab eventKey="publisher" title="ناشر">
                            {products.length && <RenderResultItems />}
                        </Tab>
                        <Tab eventKey="all" title="همه">
                            {products.length && <RenderResultItems />}
                        </Tab>
                    </Tabs>
                    {products.length && <button className={`search-bar__suggestion__show-result`}>{`نمایش همه نتایج`}</button>}
                </div>
            </Dropdown.Menu>
        )
    }

    const SearchResultBoxLoading = () => {
        return (
            <Dropdown.Menu>
                <div className={`search-bar__suggestion`}>
                    Loading
                </div>
            </Dropdown.Menu>
        )
    }

    const RenderResultItems = () => {
        return (
            <div className={`search-bar__suggestion__tab-content`}>
                {products.map((product) => {
                    console.log(product)
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
            <div className={`search-bar__suggestion__tab-content-wrap`}>
                <div className={`search-bar__suggestion__tab-content__pic`}>
                    <RenderSearchResultItemImage img={product.image} />
                </div>
                <div className={`search-bar__suggestion__tab-content__box-wrap`}>
                    <div className={`search-bar__suggestion__tab-content__box`}>
                        <strong>{product.name}</strong>
                    </div>
                    <div className={`search-bar__suggestion__tab-content__box`}>
                        <SearchResultItemAttrs attrs={product.paWriters.nodes} />
                    </div>
                </div>
                <div className={`search-bar__suggestion__tab-content__box-wrap`}>
                    <div className={`search-bar__suggestion__tab-content__box`}>
                        <SearchResultItemAttrs attrs={product.paTranslators.nodes} />
                    </div>
                    <div className={`search-bar__suggestion__tab-content__box`}>
                        <strong>{stringToNumber(product.price)}</strong>
                    </div>
                </div>
            </div>
        )
    }

    const SearchResultItemAttrs = ({ attrs }) => {
        const joinString = attrs.map(e => e.name).join(',')
        return (
            <strong>{joinString}</strong>
        )
    }

    return (
        <div className={`search-bar-wrap`}>
            <Dropdown show>
                <Dropdown.Toggle as="div" id="dropdown-basic">
                    <div className={`search-bar`}>
                        <div className={`search-bar__box`}>
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

export default Search
