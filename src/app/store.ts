import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { rootApi } from "../features/rootApi";
import authReducer from '../features/auth/slice/authSlice';

export const store = configureStore({
    reducer: {
        [rootApi.reducerPath]: rootApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootApi.middleware)
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>