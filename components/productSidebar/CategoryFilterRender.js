import React, {Fragment, useEffect} from 'react'
import {randomString, uriToUse} from '../../functions'
import Link from 'next/link'
import {useDispatch, useSelector} from 'react-redux'
import {useRouter} from 'next/router'
import {catFilters} from "../../redux/actions/category.actions";
import fetch from "node-fetch";

const CategoryFilterRender = ({cats, cat}) => {
    const dispatch = useDispatch()
    const {categoriesFilter} = useSelector(state => state.category);

    // console.log('categoriesFilter', categoriesFilter)
    useEffect(() => {
        dispatch(catFilters(cat, cats?.productCategories?.edges));
    }, [cats, cat])

    const RenderCatIsRoot = () => (
        <>
            <h2 className="p-side-box__list__title">
                {`دسته‌بندی‌ها`}
            </h2>
            <ul className="p-side-box__list">
                {
                    categoriesFilter.node.map((cat, index) => (
                        <RenderMenuLinkItem
                            active={(categoriesFilter.activeId === cat.node.databaseId) ? true : false}
                            index={0}
                            cat={cat}
                            key={cat.node.databaseId + randomString()}
                        />
                    ))
                }
            </ul>
        </>
    )

    const RenderCatNotRoot = () => (
        <>
            {
                categoriesFilter.node.map((cat, index) => {
                    if (categoriesFilter.node.length - 1 !== index) return null

                    return (
                        <React.Fragment key={cat.node.databaseId + randomString()}>
                            <h2 className="p-side-box__list__title">
                                {/*<img
                                    className={`p-side-box__list__title__icon`}
                                    src={`/image/cat-icon/${cat?.node?.slug}.svg`}
                                />*/}
                                <Link
                                    as={`/shop/category/${cat?.node?.slug}`}
                                    href={{
                                        pathname: `/shop/category/[category]`,
                                    }}
                                    shallow={true}
                                    scroll={false}
                                >
                                    <a className="p-side-box__list__title__link">
                                        {cat.node.name}
                                    </a>
                                </Link>
                            </h2>
                            <Link
                                href={{
                                    pathname: `/shop`,
                                }}
                                shallow={true}
                                scroll={false}
                            >
                                <a className="p-side-box__list__return">
                                    <div className="p-side-box__list__return__text">
                                        {`همه کتاب‌ها`}
                                    </div>
                                    <img
                                        className="p-side-box__list__return__icon"
                                        src={`/image/icon/Return icon.svg`}
                                        alt="ret"
                                    />
                                </a>
                            </Link>
                        </React.Fragment>
                    )
                })
            }

            <ul className="p-side-box__list">
                {
                    categoriesFilter.node.map((cat, index) => {
                        return (
                            <React.Fragment key={cat.node.databaseId + randomString()}>
                                {(categoriesFilter.node.length == index + 1 && cat.children.length) ? (
                                    cat.children.map((child, index2) => {
                                        return (
                                            <RenderMenuLinkItem
                                                active={(categoriesFilter.activeId === child.node.databaseId) ? true : false}
                                                index={index + 1}
                                                cat={child}
                                                key={child.node.databaseId + randomString()}
                                            />
                                        )
                                    })
                                ) : null}
                            </React.Fragment>
                        )
                    })
                }
            </ul>
        </>
    )

    const RenderMenuLinkItem = ({cat, index = 0, active = false}) => (
        <li
            key={cat.node.databaseId + randomString()}
            className={`p-side-box__list__item`}
        >
            {/*<img
                onError={(e)=>{e.target.onerror = null; e.target.src=null}}
                className={`p-side-box__list__item__icon`}
                src={`/image/cat-icon/${cat?.node?.slug}.svg`}
            />*/}
            <Link
                as={`/shop/category/${cat?.node?.slug}`}
                href={`/shop/category/[category]`}
                shallow={true}
                scroll={false}
            >
                <a className={`p-side-box__list__item__link ${active ? 'active' : ''}`}>
                    {cat.node.name}
                </a>
            </Link>
        </li>
    )

    return (
        <>
            {categoriesFilter.isRoot ? <RenderCatIsRoot/> : <RenderCatNotRoot/>}
        </>
    )
}

export default CategoryFilterRender;