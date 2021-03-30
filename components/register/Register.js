import React, { useState } from 'react'
import SignUpModal from '../signUpModal/SignUpModal';

function Register() {
    const [modalShow, setModalShow] = useState(false);

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
            <SignUpModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    );
}

export default Register
