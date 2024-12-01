import { createSlice } from "@reduxjs/toolkit";

type User = {
    login: string,
    password: string,
    fcmToken: string
}

type AuthSliceInitialState = {
    token: string | null,
    user: User | null
}


const initialState: AuthSliceInitialState = {
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user") as string)
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.data.accessToken
            state.user = action.payload.data.staffInfo
            localStorage.setItem("token", action.payload.data.accessToken)
            localStorage.setItem("user", JSON.stringify(action.payload.data.staffInfo))
        },
        
    }
})


export const { login, } = authSlice.actions;
export default authSlice.reducer