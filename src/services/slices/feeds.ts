import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { feedsSliceName } from './constants';
import { getFeeds } from '../thunk/feeds';

const initialState: TOrdersData = {
  orders: [],
  total: 0,
  totalToday: 0
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
    });
    builder.addCase(
      getFeeds.fulfilled,
      (state, { payload }: PayloadAction<TOrdersData>) => {
        state.orders = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
      }
    );
    builder.addCase(getFeeds.rejected, (state) => {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    });
  }
});

export default feeds;

export const { selectFeeds, selectFeedState, selectOrderById } =
  feeds.selectors;
