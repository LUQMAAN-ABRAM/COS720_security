import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentuser: null,
    error: false
};

const userSlice = createSlice({
    name: 'user',
    initialState, 
    reducers: {
        signinstart: (state) => {
            state.error = false;
        },
        signinsuccess: (state, action) => {
            state.currentuser = action.payload;
            state.error = false;
        },
        signinfailure: (state, action) => {
            state.error = action.payload;
        },
        deleteUserStart: (state) => {
            state.loading = true;
          },
        deleteUserSuccess: (state) => {
            state.currentuser = null;
            state.loading = false;
            state.error = false;
          },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
          signOut: (state) => {
            state.currentuser = null;
            state.loading = false;
            state.error = false;
          },
    }
});

export const { signinstart, signinsuccess, signinfailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOut } = userSlice.actions;

export default userSlice.reducer;
