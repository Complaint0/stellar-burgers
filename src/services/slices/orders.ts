import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TError, TOrder } from '@utils-types';
import { getOrders, postOrder } from '../thunk/orders';
import { ordersSliceName } from './constants';

type TOrderSlice = {
  orders: TOrder[];
  isLoading: boolean;
} & TError;

const initialState: TOrderSlice = {
  orders: [],
  isLoading: false,
  error: ''
};

const orders = createSlice({
  name: ordersSliceName,
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    }
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrdersisLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state, action) => {
      state.orders = [];
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(
      getOrders.fulfilled,
      (state, action: PayloadAction<TOrder[]>) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.error = '';
      }
    );
    builder.addCase(getOrders.rejected, (state, action) => {
      state.orders = [];
      state.isLoading = false;
      state.error = action.error.message || '';
    });
  }
});

export default orders;
export const { selectOrders, selectOrdersisLoading } = orders.selectors;

export const { clearOrders } = orders.actions;
