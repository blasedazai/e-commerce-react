import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './features/filter/filterSlice'
import productsReducer from './features/products/productsSlice'
import basketReducer from './features/basket/basketSlice'
import {setupListeners} from '@reduxjs/toolkit/dist/query'
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
       filter: filterReducer,
       products: productsReducer,
       basket: basketReducer,
    },
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector : TypedUseSelectorHook<RootState>= useSelector
