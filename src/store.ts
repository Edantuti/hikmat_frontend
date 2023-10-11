import { Reducer, combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import AuthReducer from "./slice/AuthSlice"
import CartReducer from "./slice/CartSlice"
import persistReducer from 'redux-persist/es/persistReducer'

import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const persistConfig = {
    key: "root",
    storage
}

export default configureStore({
    reducer: combineReducers(
        {
            auth: persistReducer(persistConfig, AuthReducer) as Reducer,
            cart: persistReducer(persistConfig, CartReducer) as Reducer
        }
    ),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
})
