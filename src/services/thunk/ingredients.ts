import { createAppAsyncThunk } from '../hooks/storeHooks';

export const getIngredients = createAppAsyncThunk(
  'intgredients/get',
  async (_, thunkAPI) => thunkAPI.extra.burgerApi.getIngredientsApi()
);
