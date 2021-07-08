import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import ClipLoader from "react-spinners/ClipLoader";
import { initFavoritesProducts } from "../../redux/actions/viewer.actions";

export default function UserFavourites() {
  const { favorite } = useSelector(state => state.viewer)
  const { favorites, favoritesProducts, loading } = favorite
  const dispatch = useDispatch()

  useEffect(() => {
    if (favorites.length) {
      dispatch(initFavoritesProducts())
    }
  }, [favorites])

  return (
    <div className="user-fav-box">
      <div className="user-fav-box__header">
        <h1 className="user-fav-box__header__title">:علاقه مندی ها</h1>
        <div className="fade-border-bot"></div>
      </div>
      <div className="user-fav-box__list-wrap">
        {
          loading ? (
            <div style={{ textAlign: 'center' }}>
              <ClipLoader color='#26c7bf' loading={true} size={70} />
            </div>
          ) : (
            <ul className="user-fav-box__list">
              {
                favoritesProducts.map((favorite, index) => (
                  <React.Fragment key={index}>
                    <li className="user-fav-box__list__item">
                      <div className="user-fav-box__list__item__box">
                        <div className="user-fav-box__list__item__box__items">
                          <div className="user-fav-box__list__item__box__items__pics">
                            <img
                              className="user-fav-box__list__item__box__items__pics__img"
                              src={`/image/book picture.png`}
                              alt="book"
                            />
                          </div>
                        </div>
                        <div className="user-fav-box__list__item__box__desc">
                          <h2 className="user-fav-box__list__item__box__desc__title">
                            {favorite.node.name}
                          </h2>
                          <p className="user-fav-box__list__item__box__desc__text">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                            مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                            تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                            کاربردی می باشد.
                          </p>
                        </div>
                      </div>
                      <div className="user-fav-box__list__item__box__icon">
                        <img
                          className="user-fav-box__list__item__box__icon__img"
                          src={`/image/icon/Path 82.png`}
                          alt="dlt"
                        />
                        <img
                          className="user-fav-box__list__item__box__icon__img"
                          src={`/image/icon/Send.png`}
                          alt="send"
                        />
                      </div>
                    </li>
                    <div className="fade-border-bot"></div>
                  </React.Fragment>
                ))
              }
            </ul>
          )
        }
      </div>
    </div>
  );
}
