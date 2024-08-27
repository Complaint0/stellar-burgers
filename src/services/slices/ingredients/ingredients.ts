import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TError, TIngredient, TTabMode } from '@utils-types';
import { getIngredients } from '../../thunk/ingredients';
import { ingredientSliceName } from '../constants';

type ingredientsSliceType = {
  isLoading: boolean;
  data: TIngredient[];
} & TError;

const initialState: ingredientsSliceType = {
  isLoading: true,
  data: [],
  error: ''
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
      state.error = '';
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || '';
    });
    builder.addCase(
      getIngredients.fulfilled,
      (state, { payload }: PayloadAction<TIngredient[]>) => {
        state.isLoading = false;
        state.data = payload;
        state.error = '';
      }
    );
  }
});

export default ingredients;

export const {
  selectInitIngredients,
  selectInitIngredientsIsLoading,
  selectIngredientsByType,
  selectInitIngredientById
} = ingredients.selectors;
