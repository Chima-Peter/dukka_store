"use client"

import React from 'react'
import { Provider } from 'react-redux'
import store from './store'

// we wrap all the children with redux here as redux is only accessible from client components
const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>   
    )
}

export default ReduxProvider