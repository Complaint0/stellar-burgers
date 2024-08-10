import { burgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getIngredients = createAsyncThunk('intgredients/get', async () =>
  burgerApi.getIngredientsApi()
);
