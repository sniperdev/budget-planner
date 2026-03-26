'use client';

import React from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "./store";
import { useAppDispatch, useAppSelector } from "./hooks";
import { authApi } from "./slices/auth/auth.api";


type Props = {
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

    return null;
}

export default function StoreProvider({ children }: Props) {
    const storeRef = React.useRef<AppStore | null>(null);

    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return (
        <Provider store={storeRef.current}>
            <RefreshTokenListener />
            {children}
        </Provider>
     );
}