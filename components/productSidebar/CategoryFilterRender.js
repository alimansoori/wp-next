import React, { Fragment } from 'react'
import { randomString, uriToUse } from '../../functions'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const CategoryFilterRender = (props) => {
    const router = useRouter();
    const { categoriesFilter } = useSelector(state => state.category);

    // console.log('categoriesFilter', categoriesFilter)

    const RenderCatIsRoot = () => (
        <>
            <h2 className="p-side-box__list__title">
                {`دسته بندی ها`}
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
                    if (categoriesFilter.node.length-1 !== index) return null

                    return (
                        <React.Fragment key={cat.node.databaseId + randomString()}>
                            <h2 className="p-side-box__list__title">
                                <Link
                                    href={{
                                        pathname: "/shop/[[...slugs]]",
                                        query: {
                                            // ...router.query,
                                            slugs: cat.node.parent ? uriToUse(cat.node.parent.node.uri) : [],
                                        }
                                    }}
                                    shallow={true}
                                    scroll= {false}
                                >
                                    <a className="p-side-box__list__title__link">
                                        {cat.node.name}
                                    </a>
                                </Link>
                            </h2>
                            <Link
                                href={{
                                    pathname: "/shop/[[...slugs]]",
                                    query: {
                                        // ...router.query,
                                        slugs: [],
                                    }
                                }}
                                shallow={true}
                                scroll= {false}
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

    const RenderMenuLinkItem = ({ cat, index = 0, active = false }) => (
        <li
            key={cat.node.databaseId + randomString()}
            className={`p-side-box__list__item`}
        >
            <Link
                key={cat.node.id}
                href={{
                    pathname: "/shop/[[...slugs]]",
                    query: {
                        // ...router.query,
                        slugs: uriToUse(cat.node.uri),
                    }
                }}
                shallow={true}
                scroll= {false}
            >
                <a className={`p-side-box__list__item__link ${active ? 'active' : ''}`}>
                    {cat.node.name}
                </a>
            </Link>
        </li>
    )

    return (
        <>
            {categoriesFilter.isRoot ? <RenderCatIsRoot /> : <RenderCatNotRoot />}
        </>
    )
}

export default CategoryFilterRender;