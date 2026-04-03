import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthResponse, AuthUser } from "@repo/api";

type AuthState = {
    user: AuthUser | undefined;
    accessToken: string | undefined;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: undefined,
    accessToken: undefined,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSession: (
            state,
            action: PayloadAction<AuthResponse>
        ) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
        },
        clearSession: (state) => {
            state.user = undefined;
            state.accessToken = undefined;
            state.isAuthenticated = false;
        }
    }
})

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;