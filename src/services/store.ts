import {
  combineReducers,
  configureStore,
  createAsyncThunk,
  ThunkAction,
  UnknownAction
} from '@reduxjs/toolkit';

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
import { burgerApi } from '@api';

const extraArgument = {
  burgerApi
};

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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type TExtraArgument = typeof extraArgument;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  extra: TExtraArgument;
}>();

export default store;
