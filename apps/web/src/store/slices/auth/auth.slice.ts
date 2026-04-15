import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthResponse, AuthUser } from "@repo/api";

type AuthStatus = "unknown" | "authenticated" | "guest";

type AuthState = {
    user: AuthUser | undefined;
    accessToken: string | undefined;
    isAuthenticated: boolean;
    status: AuthStatus;
}

const initialState: AuthState = {
    user: undefined,
    accessToken: undefined,
    isAuthenticated: false,
    status: "unknown",
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
            state.status = "authenticated";
        },
        clearSession: (state) => {
            state.user = undefined;
            state.accessToken = undefined;
            state.isAuthenticated = false;
            state.status = "guest";
        }
    }
})

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;