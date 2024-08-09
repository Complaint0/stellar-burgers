import { createSelector, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TTabMode } from '@utils-types';
import { ingredientSliceName } from './constants';
import { getIngredients } from '../thunk/ingredients';

interface ingredientsSliceType {
  isLoading: boolean;
  data: TIngredient[];
  error: string | null;
}

const initialState: ingredientsSliceType = {
  isLoading: true,
  data: [],
  error: null
};

const ingredients = createSlice({
  name: ingredientSliceName,
  initialState,
  reducers: {},
  selectors: {
    selectInitIngredients: (state) => state.data,
    selectInitIngredientsIsLoading: (state) => state.isLoading,
    selectInitIngredientById: (state, id: string) =>
      state.data.find((el) => {
        if (el._id == id) return el;
      }),
    selectIngredientsByType: createSelector(
      (state: ingredientsSliceType) => state.data,
      (_: ingredientsSliceType, type: TTabMode) => type,
      (data, type) => data.filter((el) => el.type === type)
    )
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
  }
});

export default ingredients;

export const {
  selectInitIngredients,
  selectInitIngredientsIsLoading,
  selectIngredientsByType,
  selectInitIngredientById
} = ingredients.selectors;
