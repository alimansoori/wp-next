import React from 'react'
import {ApolloProvider} from '@apollo/client'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import client from '../ApolloClient'

export default function BaseLayout(props) {
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
