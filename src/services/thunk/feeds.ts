import { createAsyncThunk } from '@reduxjs/toolkit';
import { burgerApi } from '@api';
import { createAppAsyncThunk } from '../store';

// export const getFeeds = createAsyncThunk('feeds/get', burgerApi.getFeedsApi);

export const getFeeds = createAppAsyncThunk('feeds/get', async (_, thunkAPI) =>
  thunkAPI.extra.burgerApi.getFeedsApi()
);
