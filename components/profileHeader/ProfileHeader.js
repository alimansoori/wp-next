import { useRouter } from 'next/router';
import React, { useState } from 'react'
import SignInModal from '../signInModal/SignInModal';
import SignUpModal from '../signUpModal/SignUpModal';

function ProfileHeader() {
    const router = useRouter()

    return (
        <div>
            <div>
                <button className="register__btn" onClick={() => router.push('/account')} >
                    <img
                        className="register__btn__icon"
                        src={`/image/icon/Group 2.svg`}
                        alt="profile"
                    />
                    <div className="register__btn__title">پروفایل کاربری</div>
                </button>
            </div>
        </div>
    );
}

export default ProfileHeader
