import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrders, postOrder } from '../thunk/orders';
import { ordersSliceName } from './constants';

interface TOrderSlice {
  orders: TOrder[];
  isLoading: boolean;
}

const initialState: TOrderSlice = {
  orders: [],
  isLoading: false
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
    });
    builder.addCase(
      getOrders.fulfilled,
      (state, action: PayloadAction<TOrder[]>) => {
        state.orders = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getOrders.rejected, (state, action) => {
      state.orders = [];
      state.isLoading = false;
    });
  }
});

export default orders;
export const { selectOrders, selectOrdersisLoading } = orders.selectors;

export const { clearOrders } = orders.actions;
