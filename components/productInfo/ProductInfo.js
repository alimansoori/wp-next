import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

export default function ProductInfo({ product }) {

  return (
    <div className="p-info-box-wrap">
      <div className="p-info-box p-info-box--desktop">
        <img className="p-info-box__rect" src={`/image/Rectangle 54.png`} alt="rect" />
        <div className="p-info-box__tab-content">
          <Tabs defaultActiveKey="پاراگرافی از کتاب" id="uncontrolled-tab-example">
            <Tab eventKey="خلاصه متن کتاب" title="خلاصه متن کتاب">
              <div className="p-info-box__tab-content__box">
                <h1 className="p-info-box__tab-content__box__title">
                  {`پاراگرافی از کتاب`}
                </h1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.shortDescription,
                  }}
                  className="p-info-box__tab-content__box__text"
                />
              </div>
            </Tab>
            <Tab eventKey="نظرات کاربران" title="نظرات کاربران">
              <div className="p-info-box__tab-content__box">
                <div className="p-info-box__tab-content__box__comment">
                  <h2 className="p-info-box__tab-content__box__comment__title">
                    نظر شما
                  </h2>
                  <div className="p-info-box__tab-content__box__comment__text">
                    <div className="p-info-box__tab-content__box__comment__text-wrap">
                      <textarea
                        rows="5"
                        className="p-info-box__tab-content__box__comment__text__box"
                      />
                    </div>
                  </div>
                  <div className="p-info-box__tab-content__box__comment__input-wrap">
                    <input
                      type="text"
                      className="p-info-box__tab-content__box__comment__input"
                      placeholder="نام شما"
                    />
                  </div>

                  <div className="p-info-box__tab-content__box__comment__submit-wrap">
                    <button
                      className="p-info-box__tab-content__box__comment__submit"
                      type="submit"
                    >
                      ارسال نظر
                    </button>
                  </div>
                </div>
                <ul className="p-info-box__tab-content__box__comment-list">
                  <li className="p-info-box__tab-content__box__comment-list__item">
                    <div className="p-info-box__tab-content__box__comment-list__item__box">
                      <div className="p-info-box__tab-content__box__comment-list__item__box__header">
                        <small className="p-info-box__tab-content__box__comment-list__item__box__header__date">
                          1399/09/09
                        </small>
                        <strong className="p-info-box__tab-content__box__comment-list__item__box__header__name">
                          Ali alizade
                        </strong>
                      </div>
                      <div className="p-info-box__tab-content__box__comment-list__item__box__body">
                        <p className="p-info-box__tab-content__box__comment-list__item__box__body__text">
                          ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                          چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون
                          بلکه روزنامه و مجله در ستون
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </Tab>
            <Tab eventKey="ویدئوی محصول" title="ویدئوی محصول">
              <div className="p-info-box__tab-content__box">
                <div className="p-info-box__tab-content__box__video-wrap">
                  <video className="p-info-box__tab-content__box__video" />
                </div>
              </div>
            </Tab>
            <Tab eventKey="مقایسه ترجمه" title="مقایسه ترجمه">
              <div className="p-info-box__tab-content__box p-info-box__tab-content__box--flex">
                <div className="p-info-box__tab-content__box-r">
                  <img
                    className="p-info-box__tab-content__box-r__img"
                    src={`/image/book picture.png`}
                    alt="book"
                  />
                </div>
                <div className="p-info-box__tab-content__box-l">
                  <h1 className="p-info-box__tab-content__box-l__title">
                    نام مترجم
                  </h1>
                  <p className="p-info-box__tab-content__box-l__text">
                    یپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                    استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                    مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                    تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                    کاربردی می باشد.
                  </p>
                </div>
              </div>
              <div className="p-info-box__tab-content__box p-info-box__tab-content__box--flex">
                <div className="p-info-box__tab-content__box-r">
                  <img
                    className="p-info-box__tab-content__box-r__img"
                    src={`/image/book picture.png`}
                    alt="book"
                  />
                </div>
                <div className="p-info-box__tab-content__box-l">
                  <h1 className="p-info-box__tab-content__box-l__title">
                    نام مترجم
                  </h1>
                  <p className="p-info-box__tab-content__box-l__text">
                    یپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                    استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                    مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                    تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                    کاربردی می باشد.
                  </p>
                </div>
              </div>
              <div className="p-info-box__tab-content__box p-info-box__tab-content__box--flex">
                <div className="p-info-box__tab-content__box-r">
                  <img
                    className="p-info-box__tab-content__box-r__img"
                    src={`/image/book picture.png`}
                    alt="book"
                  />
                </div>
                <div className="p-info-box__tab-content__box-l">
                  <h1 className="p-info-box__tab-content__box-l__title">
                    نام مترجم
                  </h1>
                  <p className="p-info-box__tab-content__box-l__text">
                    یپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                    استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                    مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                    تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                    کاربردی می باشد.
                  </p>
                </div>
              </div>
            </Tab>
            <Tab eventKey="درباره" title="درباره">
              <div
                dangerouslySetInnerHTML={{
                  __html: product.extraFields.extraAbout,
                }}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
      <div className="p-info-box p-info-box--res">
        <div className="p-info-box__tab-content">
          <div className="p-info-box__tab-content__box--res">
            <div className="p-info-box__tab-content__box--res__title">
              <img
                className="p-info-box__tab-content__box--res__title__img"
                src={`/image/Rectangle 54.png`}
                alt="rect"
              />
              <h1 className="p-info-box__tab-content__box--res__title__text">
                خلاصه متن کتاب
              </h1>
            </div>
            <div className="p-info-box__tab-content__box">
              <p className="p-info-box__tab-content__box__text">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
                جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد
                وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
            </div>
          </div>
          <div className="p-info-box__tab-content__box--res">
            <div className="p-info-box__tab-content__box--res__title">
              <img
                className="p-info-box__tab-content__box--res__title__img"
                src={`/image/Rectangle 54.png`}
                alt="rect"
              />
              <h1 className="p-info-box__tab-content__box--res__title__text">
                نظرات کاربران
              </h1>
            </div>
            <div className="p-info-box__tab-content__box">
              <div className="p-info-box__tab-content__box__comment">
                <h2 className="p-info-box__tab-content__box__comment__title">
                  نظر شما
                </h2>
                <div className="p-info-box__tab-content__box__comment__text">
                  <div className="p-info-box__tab-content__box__comment__text-wrap">
                    <textarea
                      rows="5"
                      className="p-info-box__tab-content__box__comment__text__box"
                    />
                  </div>
                </div>
                <div className="p-info-box__tab-content__box__comment__input-wrap">
                  <input
                    type="text"
                    className="p-info-box__tab-content__box__comment__input"
                    placeholder="نام شما"
                  />
                </div>

                <div className="p-info-box__tab-content__box__comment__submit-wrap">
                  <button
                    className="p-info-box__tab-content__box__comment__submit"
                    type="submit"
                  >
                    ارسال نظر
                  </button>
                </div>
              </div>
              <ul className="p-info-box__tab-content__box__comment-list">
                <li className="p-info-box__tab-content__box__comment-list__item">
                  <div className="p-info-box__tab-content__box__comment-list__item__box">
                    <div className="p-info-box__tab-content__box__comment-list__item__box__header">
                      <small className="p-info-box__tab-content__box__comment-list__item__box__header__date">
                        1399/09/09
                      </small>
                      <strong className="p-info-box__tab-content__box__comment-list__item__box__header__name">
                        Ali alizade
                      </strong>
                    </div>
                    <div className="p-info-box__tab-content__box__comment-list__item__box__body">
                      <p className="p-info-box__tab-content__box__comment-list__item__box__body__text">
                        ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                        و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه
                        روزنامه و مجله در ستون
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-info-box__tab-content__box--res">
            <div className="p-info-box__tab-content__box--res__title">
              <img
                className="p-info-box__tab-content__box--res__title__img"
                src={`/image/Rectangle 54.png`}
                alt="rect"
              />
              <h1 className="p-info-box__tab-content__box--res__title__text">
                ویدئوی محصول
              </h1>
            </div>
            <div className="p-info-box__tab-content__box">
              <div className="p-info-box__tab-content__box__video-wrap">
                <video className="p-info-box__tab-content__box__video" />
              </div>
            </div>
          </div>
          <div className="p-info-box__tab-content__box--res">
            <div className="p-info-box__tab-content__box--res__title">
              <img
                className="p-info-box__tab-content__box--res__title__img"
                src={`/image/Rectangle 54.png`}
                alt="rect"
              />
              <h1 className="p-info-box__tab-content__box--res__title__text">
                مقایسه ترجمه
              </h1>
            </div>
            <div className="p-info-box__tab-content__box p-info-box__tab-content__box--flex">
              <div className="p-info-box__tab-content__box-r">
                <img
                  className="p-info-box__tab-content__box-r__img"
                  src={`/image/book picture.png`}
                  alt="book"
                />
              </div>
              <div className="p-info-box__tab-content__box-l">
                <h1 className="p-info-box__tab-content__box-l__title">
                  نام مترجم
                </h1>
                <p className="p-info-box__tab-content__box-l__text">
                  یپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد.
                </p>
              </div>
            </div>
            <div className="p-info-box__tab-content__box p-info-box__tab-content__box--flex">
              <div className="p-info-box__tab-content__box-r">
                <img
                  className="p-info-box__tab-content__box-r__img"
                  src={`/image/book picture.png`}
                  alt="book"
                />
              </div>
              <div className="p-info-box__tab-content__box-l">
                <h1 className="p-info-box__tab-content__box-l__title">
                  نام مترجم
                </h1>
                <p className="p-info-box__tab-content__box-l__text">
                  یپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد.
                </p>
              </div>
            </div>
            <div className="p-info-box__tab-content__box p-info-box__tab-content__box--flex">
              <div className="p-info-box__tab-content__box-r">
                <img
                  className="p-info-box__tab-content__box-r__img"
                  src={`/image/book picture.png`}
                  alt="book"
                />
              </div>
              <div className="p-info-box__tab-content__box-l">
                <h1 className="p-info-box__tab-content__box-l__title">
                  نام مترجم
                </h1>
                <p className="p-info-box__tab-content__box-l__text">
                  یپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد.
                </p>
              </div>
            </div>
          </div>
          <div className="p-info-box__tab-content__box--res">
            <div className="p-info-box__tab-content__box--res__title">
              <img
                className="p-info-box__tab-content__box--res__title__img"
                src={`/image/Rectangle 54.png`}
                alt="rect"
              />
              <h1 className="p-info-box__tab-content__box--res__title__text">
                درباره
              </h1>
            </div>
            <div className="p-info-box__tab-content__box p-info-box__tab-content__box--flex">
              <div className="p-info-box__tab-content__box-r">
                <img
                  className="p-info-box__tab-content__box-r__img"
                  src={`/image/book picture.png`}
                  alt="book"
                />
              </div>
              <div className="p-info-box__tab-content__box-l">
                <h1 className="p-info-box__tab-content__box-l__title">
                  عنوان این بخش
                </h1>
                <p className="p-info-box__tab-content__box-l__text">
                  یپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد.
                </p>
              </div>
            </div>
            <div className="p-info-box__tab-content__box p-info-box__tab-content__box--flex">
              <div className="p-info-box__tab-content__box-r">
                <img
                  className="p-info-box__tab-content__box-r__img"
                  src={`/image/book picture.png`}
                  alt="book"
                />
              </div>
              <div className="p-info-box__tab-content__box-l">
                <h1 className="p-info-box__tab-content__box-l__title">
                  عنوان این بخش
                </h1>
                <p className="p-info-box__tab-content__box-l__text">
                  یپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد.
                </p>
              </div>
            </div>
            <div className="p-info-box__tab-content__box p-info-box__tab-content__box--flex">
              <div className="p-info-box__tab-content__box-r">
                <img
                  className="p-info-box__tab-content__box-r__img"
                  src={`/image/book picture.png`}
                  alt="book"
                />
              </div>
              <div className="p-info-box__tab-content__box-l">
                <h1 className="p-info-box__tab-content__box-l__title">
                  عنوان این بخش
                </h1>
                <p className="p-info-box__tab-content__box-l__text">
                  یپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
