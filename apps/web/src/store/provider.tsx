'use client';

import React from "react";
import { Provider } from "react-redux";

import { useAppDispatch, useAppSelector } from "./hooks";
import { authApi } from "./slices/auth/auth.api";
import { clearSession, setSession } from "./slices/auth/auth.slice";
import { AppStore, makeStore } from "./store";


type Properties = {
    children: React.ReactNode;
}

function RefreshTokenListener() {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const status = useAppSelector((state) => state.auth.status);

    React.useEffect(() => {
        let refreshInterval: ReturnType<typeof setInterval> | undefined;

        const refreshSession = async () => {
            try {
                const result = await dispatch(
                    authApi.endpoints.refresh.initiate(undefined)
                ).unwrap();
                dispatch(setSession(result));
            } catch {
                dispatch(clearSession());
            }
        };

        if (status === "unknown") {
            void refreshSession();
        }

        if (isAuthenticated) {
            refreshInterval = setInterval(() => {
                void refreshSession();
            }, 14 * 60 * 1000); // Refresh every 14 minutes
        }

        return () => {
            if (refreshInterval) {
                clearInterval(refreshInterval);
            }
        };
    }, [dispatch, isAuthenticated, status]);

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