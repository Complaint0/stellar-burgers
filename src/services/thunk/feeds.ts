import { createAppAsyncThunk } from '../hooks/storeHooks';

export const getFeeds = createAppAsyncThunk('feeds/get', async (_, thunkAPI) =>
  thunkAPI.extra.burgerApi.getFeedsApi()
);
