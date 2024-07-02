import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TAuthState } from "./authTypes";



const initialState : TAuthState = {
    user: null,
    token: null
}

const authSlice  = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        registerUser : (state, action) => {
            const {user} = action.payload;
            state.user = user;
        },
        setUser : (state, action) => {
            const {user, token} = action.payload;
            state.user = user;
            state.token = token;
        },
        logout : (state) => {
            state.user = null;
            state.token = null
        }
    }
})

export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer;
export const useCurrentToken  = (state: RootState) => state.auth.token;
export const selectCurrentUser  = (state: RootState) => state.auth.user;
export const registerNewUser  = (state: RootState) => state.auth.user;