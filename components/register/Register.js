import React, { useState } from 'react'
import SignInModal from '../signInModal/SignInModal';
import SignUpModal from '../signUpModal/SignUpModal';

function Register() {
    const [modalShow, setModalShow] = useState(false);
    const [whoModal, setWhoModal] = useState('login')

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
            {whoModal === 'register' ?
                <SignUpModal whoModal={() => setWhoModal('login')} show={modalShow} onHide={() => setModalShow(false)} /> :
                null
            }
            {whoModal === 'login' ?
                <SignInModal whoModal={() => setWhoModal('register')} show={modalShow} onHide={() => setModalShow(false)} /> :
                null
            }
        </div>
    );
}

export default Register
