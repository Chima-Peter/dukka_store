import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthenticationType } from "../../types/authentication_type";


const initialState: AuthenticationType = {
    isAuthenticated: false,
    email: '',
    first_name: '',
}
// reducer to update user authentication status
const authSlice = createSlice({
    name: 'auth', // name of slice
    initialState: initialState,
    reducers: {
        signup: (state, payload: PayloadAction<AuthenticationType>) => {
            state.isAuthenticated = true // set state to true on login  
            state.email = payload.payload.email 
            state.first_name = payload.payload.full_name?.split(' ')[0] || ''
            state.full_name = payload.payload.full_name
        },
        login: (state, payload: PayloadAction<AuthenticationType>) => {
            state.isAuthenticated = true // set state to true on login  
            state.email = payload.payload.email 
            state.first_name = payload.payload.email?.split('@')[0]
        },
        logout: (state) => {
            state.isAuthenticated = false // set state to false on logout
        }
    }
})


export const { signup, login, logout } = authSlice.actions // export actions

export default authSlice.reducer // export reducer