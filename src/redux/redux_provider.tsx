"use client"

import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import MarketBootstrap from '@/components/providers/market_bootstrap'

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <MarketBootstrap>
                {children}
            </MarketBootstrap>
        </Provider>
    )
}

export default ReduxProvider
