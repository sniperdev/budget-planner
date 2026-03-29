import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from './api/base-api';
import authReducer from './slices/auth/auth.slice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            [baseApi.reducerPath]: baseApi.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
        devTools: process.env.NODE_ENV !== 'production',
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']