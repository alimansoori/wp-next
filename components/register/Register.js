import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react'
import SignInModal from '../signInModal/SignInModal';
import SignUpModal from '../signUpModal/SignUpModal';

function Register() {
    const router = useRouter()
    const [modalShow, setModalShow] = useState(false);
    const [redirectTo, setRedirectTo] = useState(null);
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        if (modalShow) setRedirectTo(router.asPath)
    }, [modalShow])

    const handleOnHideSignInModal = () => {
        setRedirectTo(router.asPath)
        setModalShow(false)
    }

    return (
        <div>
            <div>
                <button className="register__btn" onClick={() => setModalShow(true)}>
                    <img
                        className="register__btn__icon"
                        src={`/image/icon/Group 2.svg`}
                        alt="profile"
                    />
                    <div className="register__btn__title">ورود / ثبت نام</div>
                </button>
            </div>

            {!isLogin ?
                <SignUpModal show={modalShow} onHide={() => setModalShow(false)} setislogin={setIsLogin} /> :
                <SignInModal show={modalShow} onHide={handleOnHideSignInModal} redirectto={redirectTo} setislogin={setIsLogin} />
            }
        </div>
    );
}

export default Register
