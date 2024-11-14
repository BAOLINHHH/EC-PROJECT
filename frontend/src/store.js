import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import  cartSliceReducer from "./slices/cartSlice"
import authSliceReducer from "./slices/authSlice";
import favoriteReducer from "./slices/favoriteSlice";
import detailProductReducer from  "./slices/detailProductSlice"
const store = configureStore({
    reducer: {
        [ apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authSliceReducer,
        favorite: favoriteReducer,
        product: detailProductReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});
export default store;