"use client";

import { useEffect, useState } from "react";
import {
    useSearchMarketQuery,
    useGetProductsQuery,
} from "@/redux/services/catalog_api";
import {
    useGetCustomerCartQuery,
    useGetGuestCartQuery,
} from "@/redux/services/cart_api";
import { useGetMeQuery } from "@/redux/services/customer_api";
import { setCartFromServer } from "@/redux/features/cart_slice";
import { setAuth } from "@/redux/features/authentication_slice";
import { useAppDispatch } from "@/redux/store";
import {
    getAccessToken,
    getActiveMarketId,
    getGuestCartId,
    setActiveMarketId,
} from "@/lib/cookies";

const MarketBootstrap = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const [accessToken, setAccessToken] = useState<string | undefined>();
    const [guestCartId, setGuestCartIdState] = useState<string | undefined>();
    const [marketId, setMarketId] = useState<string | undefined>();

    useEffect(() => {
        setAccessToken(getAccessToken());
        setGuestCartIdState(getGuestCartId());
        setMarketId(getActiveMarketId());
    }, []);

    const { data: market } = useSearchMarketQuery(undefined, {
        skip: !!marketId,
    });
    const { data: me } = useGetMeQuery(undefined, { skip: !accessToken });
    const { data: customerCart } = useGetCustomerCartQuery(undefined, {
        skip: !accessToken,
    });
    const { data: guestCart } = useGetGuestCartQuery(guestCartId ?? "", {
        skip: !!accessToken || !guestCartId,
    });

    useGetProductsQuery(
        { market_id: marketId, limit: 12 },
        { skip: !marketId },
    );

    useEffect(() => {
        if (market?.id) {
            setActiveMarketId(market.id);
            setMarketId(market.id);
        }
    }, [market?.id]);

    useEffect(() => {
        if (me) {
            dispatch(
                setAuth({
                    email: me.email,
                    full_name: me.name,
                    first_name: me.name.split(" ")[0],
                    customer_id: me.id,
                    cart_id: null,
                    isAuthenticated: true,
                }),
            );
            if (me.active_market_id) {
                setActiveMarketId(me.active_market_id);
                setMarketId(me.active_market_id);
            }
        }
    }, [dispatch, me]);

    useEffect(() => {
        if (customerCart) {
            dispatch(setCartFromServer(customerCart));
        } else if (guestCart) {
            dispatch(setCartFromServer(guestCart));
        }
    }, [customerCart, dispatch, guestCart]);

    return <>{children}</>;
};

export default MarketBootstrap;
