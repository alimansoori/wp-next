import React, {useEffect} from 'react'
import {getCart, isUserLoggedIn} from "../../redux/actions";
import {useDispatch} from 'react-redux';
import {getCustomer} from '../../redux/actions/customer.actions';

export default function BaseLayout(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(isUserLoggedIn())
        dispatch(getCart());
        dispatch(getCustomer());
    }, []);

    return (
        <div className='base-layout'>
            {props.children}
        </div>
    )
}
