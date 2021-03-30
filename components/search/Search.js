import React from 'react'
import { Dropdown, Tab, Tabs } from 'react-bootstrap'

function Search() {
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

                <Dropdown.Menu>
                    <div className={`search-bar__suggestion`}>
                        <Tabs defaultActiveKey="موضوع" id="uncontrolled-tab-example">
                            <Tab eventKey="موضوع" title="موضوع">
                                <div className={`search-bar__suggestion__tab-content`}>
                                    <div className={`search-bar__suggestion__tab-content-wrap`}>
                                        <div className={`search-bar__suggestion__tab-content__pic`}>
                                            <img
                                                className={`search-bar__suggestion__tab-content__pic__img`}
                                                src={`/image/book picture.png`}
                                                alt="book"
                                            />
                                        </div>
                                        <div className={`search-bar__suggestion__tab-content__box-wrap`}>
                                            <div className={`search-bar__suggestion__tab-content__box`}>
                                                <strong>نام کتاب: </strong>
                                                <small>نام کتاب</small>
                                            </div>
                                            <div className={`search-bar__suggestion__tab-content__box`}>
                                                <strong>نویسنده: </strong>
                                                <small>نویسنده</small>
                                            </div>
                                        </div>
                                        <div className={`search-bar__suggestion__tab-content__box-wrap`}>
                                            <div className={`search-bar__suggestion__tab-content__box`}>
                                                <strong>مترجم: </strong>
                                                <small>مترجم</small>
                                            </div>
                                            <div className={`search-bar__suggestion__tab-content__box`}>
                                                <strong>قیمت: </strong>
                                                <small>قیمت</small>
                                            </div>
                                        </div>
                                    </div>
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
            </Dropdown>
        </div>
    )
}

export default Search
