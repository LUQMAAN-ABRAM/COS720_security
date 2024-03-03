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
        }
    }
});

export const { signinstart, signinsuccess, signinfailure } = userSlice.actions;

export default userSlice.reducer;
