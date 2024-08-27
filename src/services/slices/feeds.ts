import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TError, TOrdersData } from '@utils-types';
import { feedsSliceName } from './constants';
import { getFeeds } from '../thunk/feeds';

type TFeedSlice = TOrdersData & TError;

const initialState: TFeedSlice = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: ''
};

const feeds = createSlice({
  name: feedsSliceName,
  initialState,
  reducers: {},
  selectors: {
    selectFeeds: (state) => state.orders,
    selectFeedState: (state) => state,
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
    });
    builder.addCase(
      getFeeds.fulfilled,
      (state, { payload }: PayloadAction<TOrdersData>) => {
        state.orders = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
        state.error = '';
      }
    );
    builder.addCase(getFeeds.rejected, (state, action) => {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
      state.error = action.error.message || '';
    });
  }
});

export default feeds;

export const { selectFeeds, selectFeedState, selectOrderById } =
  feeds.selectors;
