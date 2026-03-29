'use client';

import React from "react";
import { Provider } from "react-redux";

import { useAppDispatch, useAppSelector } from "./hooks";
import { authApi } from "./slices/auth/auth.api";
import { AppStore, makeStore } from "./store";


type Properties = {
    children: React.ReactNode;
}

function RefreshTokenListener() {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    React.useEffect(() => {
        if (!isAuthenticated) return;

        const refreshInterval = setInterval(() => {
            console.log('Refreshing token...');
            dispatch(authApi.endpoints.refresh.initiate());
        }, 14 * 60 * 1000); // Refresh every 14 minutes

        return () => clearInterval(refreshInterval);
    }, [dispatch, isAuthenticated]);

    return <></>;
}

export default function StoreProvider({ children }: Properties) {
    const storeReference = React.useRef<AppStore | null>(null);

    if (!storeReference.current) {
        storeReference.current = makeStore();
    }

    return (
        <Provider store={storeReference.current}>
            <RefreshTokenListener />
            {children}
        </Provider>
     );
}