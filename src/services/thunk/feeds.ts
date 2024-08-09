import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeeds = createAsyncThunk('feeds/get', async () => {
  const data = await getFeedsApi();
  const { orders, total, totalToday } = data;
  return { orders, total, totalToday };
});
