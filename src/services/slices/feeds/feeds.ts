import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TError, TOrdersData } from '@utils-types';
import { feedsSliceName } from '../constants';
import { getFeeds } from '../../thunk/feeds';

type TFeedSlice = TOrdersData &
  TError & {
    isLoading: boolean;
  };

const initialState: TFeedSlice = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: '',
  isLoading: false
};

const feeds = createSlice({
  name: feedsSliceName,
  initialState,
  reducers: {},
  selectors: {
    selectFeeds: (state) => state.orders,
    selectFeedState: (state) => state,
    selectFeedLoading: (state) => state.isLoading,
    selectOrderById: createSelector(
      (state: TOrdersData) => state.orders,
      (_: TOrdersData, orderNum: number) => orderNum,
      (orders, orderNum) => orders.find((el) => el.number === orderNum)
    )
  },
  extraReducers: (builder) => {
    builder.addCase(getFeeds.pending, (state) => {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
      state.error = '';
      state.isLoading = true;
    });
    builder.addCase(
      getFeeds.fulfilled,
      (state, { payload }: PayloadAction<TOrdersData>) => {
        state.orders = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
        state.error = '';
        state.isLoading = false;
      }
    );
    builder.addCase(getFeeds.rejected, (state, action) => {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
      state.error = action.error.message || '';
      state.isLoading = false;
    });
  }
});

export default feeds;

export const {
  selectFeeds,
  selectFeedState,
  selectOrderById,
  selectFeedLoading
} = feeds.selectors;
