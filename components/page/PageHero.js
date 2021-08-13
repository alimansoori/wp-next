import React from "react";

export default function PageHero({page}) {
    return (
        <div className="p-hero-box-wrap">
            <div className="p-hero-box-wrap-fade"></div>
            <div className="p-hero-box p-hero-box--desktop">
                <div className="p-hero-box__l-col" style={{width: "100%"}}>
                    <div className="p-hero-box__l-col__info">
                        <h1 className="p-hero-box__l-col__info_name">{page?.title}</h1>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: page.content,
                            }}
                            className="p-hero-box__l-col__info__about"
                        />
                    </div>
                </div>
            </div>
            <div className="p-hero-box p-hero-box--res">
                <div className="p-hero-box__l-col">
                    <div className="p-hero-box__l-col__info">
                        <h1 className="p-hero-box__l-col__info_name">{page?.title}</h1>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: page.content,
                            }}
                            className="p-hero-box__l-col__info__about"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}