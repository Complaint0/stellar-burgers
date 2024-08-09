import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredients from './slices/ingredients';
import burgerConstructor from './slices/burger';
import userSlice from './slices/user';
import feeds from './slices/feeds';
import orders from './slices/orders';
import orderSlice from './slices/order';

const rootReducer = combineReducers({
  [ingredients.name]: ingredients.reducer,
  [burgerConstructor.name]: burgerConstructor.reducer,
  [userSlice.name]: userSlice.reducer,
  [feeds.name]: feeds.reducer,
  [orders.name]: orders.reducer,
  [orderSlice.name]: orderSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
