import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TError, TOrder } from '@utils-types';
import { getOrderByNumber, postOrder } from '../thunk/orders';
import { orderSliceName } from './constants';

type TOrderSlice = {
  order: TOrder | null;
  isLoading: boolean;
  isTaken: boolean;
} & TError;

const initialState: TOrderSlice = {
  order: null,
  isTaken: false,
  isLoading: false,
  error: ''
};

const orderSlice = createSlice({
  name: orderSliceName,
  initialState,
  reducers: {
    setIsOrderDone: (state) => {
      state.isTaken = !state.isTaken;
    }
  },
  selectors: {
    selectIsOrderDone: (state) => {
      if (state.isTaken) return state.order;
      else return null;
    },
    selectOrderIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderByNumber.pending, (state, action) => {
      state.order = null;
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(
      getOrderByNumber.fulfilled,
      (state, action: PayloadAction<TOrder[]>) => {
        state.order = action.payload[0];
        state.isLoading = false;
        state.error = '';
      }
    );
    builder.addCase(getOrderByNumber.rejected, (state, action) => {
      state.order = null;
      state.isLoading = false;
      state.error = action.error.message || '';
    });

    builder.addCase(postOrder.pending, (state, action) => {
      state.order = null;
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(
      postOrder.fulfilled,
      (state, action: PayloadAction<TOrder>) => {
        state.order = action.payload;
        state.isLoading = false;
        state.error = '';
      }
    );
    builder.addCase(postOrder.rejected, (state, action) => {
      state.order = null;
      state.isLoading = false;
      state.error = action.error.message || '';
    });
  }
});

export default orderSlice;
export const { selectIsOrderDone, selectOrderIsLoading } = orderSlice.selectors;
export const { setIsOrderDone } = orderSlice.actions;
