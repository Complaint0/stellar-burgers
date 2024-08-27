import {
  combineReducers,
  configureStore,
  createAsyncThunk,
  ThunkAction,
  UnknownAction
} from '@reduxjs/toolkit';

import ingredients from './slices/ingredients/ingredients';
import user from './slices/user/user';
import feeds from './slices/feeds/feeds';
import orders from './slices/orders/orders';
import order from './slices/order/order';
import { burgerApi } from '@api';
import burgerConstructor from './slices/burger/burger';

const extraArgument = {
  burgerApi
};

const rootReducer = combineReducers({
  [ingredients.name]: ingredients.reducer,
  [burgerConstructor.name]: burgerConstructor.reducer,
  [user.name]: user.reducer,
  [feeds.name]: feeds.reducer,
  [orders.name]: orders.reducer,
  [order.name]: order.reducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type TExtraArgument = typeof extraArgument;

export default store;
