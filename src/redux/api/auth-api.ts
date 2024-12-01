import { api } from "./index";

const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation<{ token: string; user: any }, { login: string ; password: string }>({
            query: (data) => ({
                url: "/auth/sign-in",
                method: "POST",
                body: data,
            }),
        }),
        

    })
})

export const { useLoginUserMutation } = authApi
