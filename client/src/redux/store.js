import {configureStore} from '@reduxjs/toolkit';

import userreducer from './user/userSlice.js'


export const store = configureStore({
    reducer: {user: userreducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});