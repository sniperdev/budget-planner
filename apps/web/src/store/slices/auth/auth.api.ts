import { LoginInput, RegisterInput } from "@repo/api";

import { baseApi } from "../../api/base-api";


type User = {
  id: string;
  name: string;
  email: string;
};

type AuthResponse = {
  accessToken: string;
  user: User;
};

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginInput>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            })
        }),
        register: builder.mutation<AuthResponse, RegisterInput>({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body,
            })
        }),
        refresh: builder.mutation<AuthResponse, void>({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST',
            })
        }),
        logout: builder.mutation<{ ok: boolean }, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
    })
})

export const { useLoginMutation, useRegisterMutation, useRefreshMutation, useLogoutMutation } = authApi;