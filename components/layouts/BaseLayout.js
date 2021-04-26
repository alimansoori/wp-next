import React, { useEffect } from 'react'
import {ApolloProvider} from '@apollo/client'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import client from '../ApolloClient'
import { getCart } from "../../redux/actions";
import { useDispatch } from 'react-redux';

export default function BaseLayout(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCart());
    }, []);

    return (
        <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
                <div className='base-layout'>
                    {props.children}
                </div>
            </ApolloHooksProvider>
        </ApolloProvider>
    )
}
