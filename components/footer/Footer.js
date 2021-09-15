import {MDBCol, MDBContainer, MDBRow, MDBFooter} from "mdbreact";
import Link from 'next/link'

export default function Footer() {
    return (
        <MDBFooter style={{direction: "rtl", backgroundColor: "antiquewhite"}} color="blue" className="font-small pt-4">
            <MDBContainer fluid className="text-center text-md-right">
                <MDBRow>
                    <MDBCol md="6">
                        <h5 className="title">
                            {`کتاب‌فروشی آنلاین داستانا`}
                        </h5>
                        <p>
                            {`تیم داستانا با تجربۀ چندین سال کتابخوانی و کتابفروشی و فعالیت در حوزۀ نشر و تالیف و ترجمه، کار خود را از اواخر تابستان ۹۹ آغاز کرد. هدف تیم ما نخست ارائۀ محتواهای مفید و جذاب، مشاورۀ تخصصی در حوزۀ کتاب به کاربران برای انتخاب کتاب خوب و مناسب و سپس تسهیل فرآیند سفارش و خرید است.`}
                        </p>
                    </MDBCol>
                    <MDBCol md="2">
                        <h5 className="title">{`خدمات مشتریان`}</h5>
                        <ul>
                            <li className="list-unstyled">
                                <Link href={`/faq`}>
                                    <a style={{color: "#0072bb"}}>{`پاسخ به پرسش‌های متداول`}</a>
                                </Link>
                            </li>
                            <li className="list-unstyled">
                                <Link href={`/buy-shipping`}>
                                    <a style={{color: "#0072bb"}}>{`راهنمای خرید و ارسال`}</a>
                                </Link>
                            </li>
                            <li className="list-unstyled">
                                <Link href={`/privacy-policy`}>
                                    <a style={{color: "#0072bb"}}>{`حریم خصوصی`}</a>
                                </Link>
                            </li>
                        </ul>
                    </MDBCol>
                    <MDBCol md="2">
                        <h5 className="title">{`اطلاعات داستانا`}</h5>
                        <ul>
                            <li className="list-unstyled">
                                <Link href={`/about-us`}>
                                    <a style={{color: "#0072bb"}}>{`درباره داستانا`}</a>
                                </Link>
                            </li>
                            <li className="list-unstyled">
                                <Link href={`/contact-us`}>
                                    <a style={{color: "#0072bb"}}>{`تماس با داستانا`}</a>
                                </Link>
                            </li>
                            <li className="list-unstyled">
                                <Link href={`/terms-conditions`}>
                                    <a style={{color: "#0072bb"}}>{`قوانین و مقررات`}</a>
                                </Link>
                            </li>
                        </ul>
                    </MDBCol>
                    <MDBCol md="2" style={{textAlign: "center"}}>
                        <a referrerPolicy="origin" target="_blank"
                           href="https://trustseal.enamad.ir/?id=230991&amp;Code=E8Sfoi6CstYu00ZHWKKW"><img
                            referrerPolicy="origin"
                            src="https://Trustseal.eNamad.ir/logo.aspx?id=230991&amp;Code=E8Sfoi6CstYu00ZHWKKW" alt=""
                            style={{cursor:"pointer"}} id="E8Sfoi6CstYu00ZHWKKW"/></a>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div style={{backgroundColor: "#c5c5c5"}} className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: <a style={{color: "#0072bb"}}
                                                                    href="https://dastanaa.com"> Dastanaa.com </a>
                </MDBContainer>
            </div>
        </MDBFooter>
)
}
