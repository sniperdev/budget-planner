import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
    id: string;
    name: string;
    email: string;
}

type AuthState = {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSession: (
            state,
            action: PayloadAction<{ user: User, accessToken: string }>
        ) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
        },
        clearSession: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
        }
    }
})

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;