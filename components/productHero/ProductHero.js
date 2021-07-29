import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { stringToNumber } from "../../functions";
import { addToCart } from "../../redux/actions";
import { addToFavorites } from "../../redux/actions/viewer.actions";
import PN from 'persian-number'

export default function ProductHero({ product }) {
  const dispatch = useDispatch()
  const { authenticate } = useSelector(state => state.auth);

  const productQryInput = {
    clientMutationId: v4(), // Generate a unique id.
    productId: product.databaseId,
  };

  const RenderProductAttrs = ({ attrs }) => {
    const joinString = attrs.map(e => {
      var name = e.name
      var split = name.split("|")

      var nameRes = split.length ? split[0] : e.name

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
      addToFavorites(product.databaseId)
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
              src={product.image ? product.image.sourceUrl : '/image/book picture.png'}
              alt={product.image ? product.image.altText : null}
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
          <div className="p-hero-box__l-col__info">
            <h1 className="p-hero-box__l-col__info_name">{product.name}</h1>
            <div className="p-hero-box__l-col__info__author">
              <RenderProductAttrs attrs={product.paWriters.nodes} />
            </div>
            <div className="p-hero-box__l-col__info__translator">
              <RenderProductAttrs attrs={product.paTranslators.nodes} />
            </div>
            <div className="p-hero-box__l-col__info__publisher">
              <RenderProductAttrs attrs={product.paPublishers.nodes} />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
              className="p-hero-box__l-col__info__about"
            />
          </div>
          <div className="p-hero-box__l-col__purchase">
            <div className="p-hero-box__l-col__purchase-wrap">
              <div className="p-hero-box__l-col__purchase__price">
                {PN.convertEnToPe(stringToNumber(product.price))}
              </div>
              <button onClick={(e) => handleAddToCart(e)} className="p-hero-box__l-col__purchase__buy">
                <div className="p-hero-box__l-col__purchase__buy__title">
                  افزودن به سبد خرید
                </div>
                <img
                  className="p-hero-box__l-col__purchase__buy__icon"
                  src={`/image/icon/Group 119.svg`}
                  alt="icon"
                />
              </button>
            </div>
          </div>
        </div>
        <img className="p-hero-box__rect" src={`/image/Rectangle 53.png`} alt="rect" />
      </div>
      <div className="p-hero-box p-hero-box--res">
        <div className="p-hero-box__r-col">
          <div className="p-hero-box__r-col__pic">
            <img
              className="p-hero-box__r-col__pic__img"
              src={product.image ? product.image.sourceUrl : '/image/book picture.png'}
              alt={product.image ? product.image.altText : null}
            />
          </div>
        </div>
        <div className="p-hero-box__l-col">
          <div className="p-hero-box__l-col__info">
            <h1 className="p-hero-box__l-col__info_name">{product.name}</h1>
            <div className="p-hero-box__l-col__info__author">
              <RenderProductAttrs attrs={product.paWriters.nodes} />
            </div>
            <div className="p-hero-box__l-col__info__translator">
              <RenderProductAttrs attrs={product.paTranslators.nodes} />
            </div>
            <div className="p-hero-box__l-col__info__publisher">
              <RenderProductAttrs attrs={product.paPublishers.nodes} />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
              className="p-hero-box__l-col__info__about"
            />
          </div>
          <div className="p-hero-box__l-col__purchase">
            <div className="p-hero-box__l-col__purchase-wrap">
              <div className="p-hero-box__l-col__purchase__price">29900 ت</div>
              <button onClick={(e) => handleAddToCart(e)} className="p-hero-box__l-col__purchase__buy">
                <div className="p-hero-box__l-col__purchase__buy__title">
                  افزودن به سبد خرید
                </div>
                <img
                  className="p-hero-box__l-col__purchase__buy__icon"
                  src={`/image/icon/Group 119.svg`}
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
