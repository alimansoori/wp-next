import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {v4} from "uuid";
import {stringToNumber} from "../../functions";
import {addToCart} from "../../redux/actions";
import {addToFavorites} from "../../redux/actions/viewer.actions";
import PN from 'persian-number'
import ShowMore from "react-simple-show-more";
import parse from 'html-react-parser';

export default function ProductHero({product}) {
    const dispatch = useDispatch()
    const {authenticate} = useSelector(state => state.auth);
    const {loading} = useSelector(state => state.cart);

    const productQryInput = {
        clientMutationId: v4(), // Generate a unique id.
        productId: product?.databaseId,
    };

    const RenderProductAttrs = ({attrs}) => {
        if (!attrs) return '.....';

        const joinString = attrs?.map(e => {
            let name = e.name
            let split = name.split("|")

            let nameRes = split.length ? split[0] : e.name

            return nameRes
        }).join(',')

        return joinString
    }

    const handleAddToCart = (e) => {
        e.preventDefault();
        dispatch(addToCart(productQryInput));
    }
    const handleAddToFavorites = () => {
        dispatch(
            addToFavorites(product?.databaseId)
        )
    }

    return (
        <div className="p-hero-box-wrap">
            <div className="p-hero-box-wrap-fade"></div>
            <div className="p-hero-box p-hero-box--desktop">
                <div className="p-hero-box__r-col">
                    <div className="p-hero-box__r-col__pic">
                        <img
                            className="p-hero-box__r-col__pic__img"
                            src={product?.image ? product.image.sourceUrl : '/image/book picture.png'}
                            alt={product?.image ? product.image.altText : null}
                        />
                    </div>
                    <div className="p-hero-box__r-col__options">
                        <div className="container-fluid">
                            <div className="row p-hero-box__r-col__options-row">
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="p-hero-box__r-col__options__box">
                                        <img
                                            className="p-hero-box__r-col__options__box__icon"
                                            src={`/image/icon/edit.svg`}
                                            alt="edit"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    {authenticate && (
                                        <div onClick={handleAddToFavorites} className="p-hero-box__r-col__options__box">
                                            <img
                                                className="p-hero-box__r-col__options__box__icon"
                                                src={`/image/icon/save.svg`}
                                                alt="save"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="p-hero-box__r-col__options__box">
                                        <div className="p-hero-box__r-col__options__box__rate">
                                            3.5 / 5
                                        </div>
                                        <div className="p-hero-box__r-col__options__box__src">
                                            good reads
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="p-hero-box__r-col__options__box">
                                        <img
                                            className="p-hero-box__r-col__options__box__icon"
                                            src={`/image/icon/share.svg`}
                                            alt="share"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-hero-box__l-col">
                    <div className="p-hero-box__l-col__info" style={{direction: "rtl"}}>
                        <h1 className="p-hero-box__l-col__info_name">{product?.name ? product?.name : 'نام کتاب در حال بارگذاری ....'}</h1>
                        {product?.extraFields?.extraentitle && (
                            <span
                                className="p-hero-box__l-col__info_name--eng">{product?.extraFields?.extraentitle}
                            </span>
                        )}
                        <div className="p-hero-box__l-col__info__details">
                            <div className="p-hero-box__l-col__info__details-wrap">
                                <div className="p-hero-box__l-col__info__author">
                                    <strong>{`نویسنده: `}</strong>
                                    <RenderProductAttrs attrs={product?.paWriters?.nodes}/>
                                </div>
                                {product?.paTranslators?.nodes.length ? (
                                    <div className="p-hero-box__l-col__info__translator">
                                        <strong>{`مترجم: `}</strong>
                                        <RenderProductAttrs attrs={product?.paTranslators?.nodes}/>
                                    </div>
                                ) : null}
                                <div className="p-hero-box__l-col__info__publisher">
                                    <strong>{`ناشر: `}</strong>
                                    <RenderProductAttrs attrs={product?.paPublishers?.nodes}/>
                                </div>
                                <div className="p-hero-box__l-col__info__publisher">
                                    <strong>{`تعداد صفحه: `}</strong>
                                    <RenderProductAttrs attrs={product?.paNumberPages?.nodes}/>
                                </div>
                            </div>
                            <div className="p-hero-box__l-col__info__details-wrap">
                                <div className="p-hero-box__l-col__info__publisher">
                                    <strong>{`نوع جلد: `}</strong>
                                    <RenderProductAttrs attrs={product?.paCoverTypes?.nodes}/>
                                </div>
                                <div className="p-hero-box__l-col__info__author">
                                    <strong>{`اندازه کتاب: `}</strong>
                                    <RenderProductAttrs attrs={product?.paDimensions?.nodes}/>
                                </div>
                                <div className="p-hero-box__l-col__info__publisher">
                                    <strong>{`سال چاپ: `}</strong>
                                    <RenderProductAttrs attrs={product?.paSolarPublishDates?.nodes}/>
                                </div>
                                <div className="p-hero-box__l-col__info__translator">
                                    <strong>{`نوبت چاپ: `}</strong>
                                    <RenderProductAttrs attrs={product?.paBookSeriesPrints?.nodes}/>
                                </div>
                            </div>
                        </div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: product?.description,
                            }}
                            className="p-hero-box__l-col__info__about"
                        />
                    </div>
                    <div className="p-hero-box__l-col__purchase">
                        <div className="p-hero-box__l-col__purchase-wrap">
                            {product.regularPrice !== product?.price && (
                                <div
                                    className="p-hero-box__l-col__purchase__price p-hero-box__l-col__purchase__price--off">
                                    {PN.convertEnToPe(stringToNumber(product?.regularPrice))}
                                </div>
                            )}
                            {product.stockStatus === 'IN_STOCK' ? (
                                <div className="p-hero-box__l-col__purchase__price">
                                    {PN.convertEnToPe(stringToNumber(product?.price))}
                                </div>
                            ) : null}

                            <button disabled={product?.stockStatus !== 'IN_STOCK'} onClick={(e) => handleAddToCart(e)}
                                    className="p-hero-box__l-col__purchase__buy">
                                <div className="p-hero-box__l-col__purchase__buy__title">
                                    {product.stockStatus === 'IN_STOCK' ? (
                                        `افزودن به سبد خرید`
                                    ) : (
                                        `ناموجود`
                                    )}
                                </div>
                                <img
                                    className="p-hero-box__l-col__purchase__buy__icon"
                                    src={`/image/icon/${loading ? 'white-pinner.svg' : 'Group 119.svg'}`}
                                    alt="icon"
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <img className="p-hero-box__rect" src={`/image/Rectangle 53.png`} alt="rect"/>
            </div>
            <div className="p-hero-box p-hero-box--res">
                <div className="p-hero-box__r-col">
                    <div className="p-hero-box__r-col__pic">
                        <img
                            className="p-hero-box__r-col__pic__img"
                            src={product?.image ? product?.image.sourceUrl : '/image/book picture.png'}
                            alt={product?.image ? product?.image.altText : null}
                        />
                    </div>
                </div>
                <div className="p-hero-box__l-col">
                    <div className="p-hero-box__l-col__info" style={{direction: "rtl"}}>
                        <h1 className="p-hero-box__l-col__info_name">{product?.name}</h1>
                        <div className="p-hero-box__l-col__info__details">
                            <div className="p-hero-box__l-col__info__details-wrap">
                                <div className="p-hero-box__l-col__info__author">
                                    <strong>{`نویسنده: `}</strong>
                                    <RenderProductAttrs attrs={product?.paWriters?.nodes}/>
                                </div>
                                {product?.paTranslators?.nodes.length ? (
                                    <div className="p-hero-box__l-col__info__translator">
                                        <strong>{`مترجم: `}</strong>
                                        <RenderProductAttrs attrs={product?.paTranslators?.nodes}/>
                                    </div>
                                ) : null}
                                <div className="p-hero-box__l-col__info__publisher">
                                    <strong>{`ناشر: `}</strong>
                                    <RenderProductAttrs attrs={product?.paPublishers?.nodes}/>
                                </div>
                                <div className="p-hero-box__l-col__info__publisher">
                                    <strong>{`تعداد صفحه: `}</strong>
                                    <RenderProductAttrs attrs={product?.paNumberPages?.nodes}/>
                                </div>
                            </div>
                            <div className="p-hero-box__l-col__info__details-wrap">
                                <div className="p-hero-box__l-col__info__publisher">
                                    <strong>{`نوع جلد: `}</strong>
                                    <RenderProductAttrs attrs={product?.paCoverTypes?.nodes}/>
                                </div>
                                <div className="p-hero-box__l-col__info__author">
                                    <strong>{`اندازه کتاب: `}</strong>
                                    <RenderProductAttrs attrs={product?.paDimensions?.nodes}/>
                                </div>
                                <div className="p-hero-box__l-col__info__publisher">
                                    <strong>{`سال چاپ: `}</strong>
                                    <RenderProductAttrs attrs={product?.paSolarPublishDates?.nodes}/>
                                </div>
                                <div className="p-hero-box__l-col__info__translator">
                                    <strong>{`نوبت چاپ: `}</strong>
                                    <RenderProductAttrs attrs={product?.paBookSeriesPrints?.nodes}/>
                                </div>
                            </div>
                        </div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: product?.description,
                            }}
                            className="p-hero-box__l-col__info__about"
                        />
                    </div>
                    <div className="p-hero-box__l-col__purchase">
                        <div className="p-hero-box__l-col__purchase-wrap">
                            <div className="p-hero-box__l-col__purchase__price">
                                {PN.convertEnToPe(stringToNumber(product?.price))}
                            </div>
                            <button onClick={(e) => handleAddToCart(e)} className="p-hero-box__l-col__purchase__buy">
                                <div className="p-hero-box__l-col__purchase__buy__title">
                                    افزودن به سبد خرید
                                </div>
                                <img
                                    className="p-hero-box__l-col__purchase__buy__icon"
                                    src={`/image/icon/${loading ? 'white-pinner.svg' : 'Group 119.svg'}`}
                                    alt="icon"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="p-hero-box__r-col__options">
                        <div className="">
                            <div className="p-hero-box__r-col__options__box">
                                <img
                                    className="p-hero-box__r-col__options__box__icon"
                                    src={`/image/icon/edit.svg`}
                                    alt="edit"
                                />
                            </div>
                        </div>
                        <div className="">
                            <div onClick={handleAddToFavorites} className="p-hero-box__r-col__options__box">
                                <img
                                    className="p-hero-box__r-col__options__box__icon"
                                    src={`/image/icon/save.svg`}
                                    alt="save"
                                />
                            </div>
                        </div>
                        <div className="">
                            <div className="p-hero-box__r-col__options__box">
                                <div className="p-hero-box__r-col__options__box__rate">
                                    3.5 / 5
                                </div>
                                <div className="p-hero-box__r-col__options__box__src">
                                    good reads
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="p-hero-box__r-col__options__box">
                                <img
                                    className="p-hero-box__r-col__options__box__icon"
                                    src={`/image/icon/share.svg`}
                                    alt="share"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
