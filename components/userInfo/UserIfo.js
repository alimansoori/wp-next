import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import UserAddresses from "./UserAddresses";
import UserAddressAddModal from "../userAddressModal/UserAddressAddModal";
import UserProfileModal from "../userProfileModal/UserProfileModal";

export default function UserIfo() {
    const {customer} = useSelector(state => state.customer)
    const dispatch = useDispatch()

    return (
        <div className="user-info-box">
            <UserAddresses/>
        </div>
    );
}
