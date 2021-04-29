import React, { useState } from 'react'
import SignInModal from '../signInModal/SignInModal';
import SignUpModal from '../signUpModal/SignUpModal';

function Register() {
    const [modalShow, setModalShow] = useState(false);
    const [whomodal, setWhomodal] = useState('login')

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
            {/* <SignUpModal show={modalShow} onHide={() => setModalShow(false)} /> */}
            {whomodal === 'register' ?
                <SignUpModal setwhomodal={setWhomodal} show={modalShow} onHide={() => setModalShow(false)} /> :
                null
            }
            {whomodal === 'login' ?
                <SignInModal setwhomodal={setWhomodal} show={modalShow} onHide={() => setModalShow(false)} /> :
                null
            }
        </div>
    );
}

export default Register
