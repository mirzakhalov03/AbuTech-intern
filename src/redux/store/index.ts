import { configureStore } from '@reduxjs/toolkit'
import { api } from '../api';
import authSlice from "../slice/auth-slice"



export const store = configureStore({
    reducer: {
        auth: authSlice,
      
      [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
  })

export type RootState = ReturnType<typeof store.getState>;