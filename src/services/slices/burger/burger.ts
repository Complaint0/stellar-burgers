import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { bun, burgerConstructorSliceName } from '../constants';

interface TBurgerConstructor {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
}

const initialState: TBurgerConstructor = {
  ingredients: [],
  bun: null
};

const burgerConstructor = createSlice({
  name: burgerConstructorSliceName,
  initialState,
  selectors: {
    selectBurgerIngredients: (state) => state.ingredients,
    selectBurgerBun: (state) => state.bun
  },
  reducers: {
    addToBurger: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === bun) {
          state.bun = action.payload;
        } else state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    deleteFromBurger: (state, { payload }: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter((el) => el.id != payload);
    },
    moveBurgerIngredientUp: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.ingredients.findIndex(
        (el) => el.id === action.payload.id
      );
      const prevIngredient = state.ingredients[index - 1];
      state.ingredients[index - 1] = action.payload;
      state.ingredients[index] = prevIngredient;
    },
    moveBurgerIngredientDown: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.ingredients.findIndex(
        (el) => el.id === action.payload.id
      );
      const prevIngredient = state.ingredients[index + 1];
      state.ingredients[index + 1] = action.payload;
      state.ingredients[index] = prevIngredient;
    },
    clearIngredients: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export default burgerConstructor;
export const {
  addToBurger,
  deleteFromBurger,
  moveBurgerIngredientUp,
  moveBurgerIngredientDown,
  clearIngredients
} = burgerConstructor.actions;
export const { selectBurgerIngredients, selectBurgerBun } =
  burgerConstructor.selectors;
export const burgerReducer = burgerConstructor.reducer;
