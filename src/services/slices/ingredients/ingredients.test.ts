import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredients, {
  selectIngredientsByType,
  selectInitIngredientById
} from './ingredients';
import { getIngredients } from '../../../services/thunk/ingredients';

describe('IngredientsSliceTest', () => {
  beforeAll(() => {
    jest.restoreAllMocks();
  });
  const rootReducer = combineReducers({
    [ingredients.name]: ingredients.reducer
  });
  describe('ingredientSelectors', () => {
    test('selectInitIngredientById', () => {
      const store = configureStore({
        reducer: rootReducer,
        preloadedState: {
          [ingredients.name]: {
            isLoading: false,
            error: '',
            data: [
              {
                _id: '1',
                name: '1',
                type: '1',
                proteins: 1,
                fat: 1,
                carbohydrates: 1,
                calories: 1,
                price: 1,
                image: '1',
                image_large: '1',
                image_mobile: '1'
              },
              {
                _id: '2',
                name: '2',
                type: '2',
                proteins: 2,
                fat: 2,
                carbohydrates: 2,
                calories: 2,
                price: 2,
                image: '2',
                image_large: '2',
                image_mobile: '2'
              }
            ]
          }
        }
      });

      const ingredient = selectInitIngredientById(store.getState(), '1');
      expect(ingredient).toEqual({
        _id: '1',
        name: '1',
        type: '1',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: '1',
        image_large: '1',
        image_mobile: '1'
      });
    });

    test('selectInitIngredientById', () => {
      const rootReducer = combineReducers({
        [ingredients.name]: ingredients.reducer
      });

      const store = configureStore({
        reducer: rootReducer,
        preloadedState: {
          [ingredients.name]: {
            isLoading: false,
            error: '',
            data: [
              {
                _id: '1',
                name: '1',
                type: 'bun',
                proteins: 1,
                fat: 1,
                carbohydrates: 1,
                calories: 1,
                price: 1,
                image: '1',
                image_large: '1',
                image_mobile: '1'
              },
              {
                _id: '2',
                name: '2',
                type: 'sauce',
                proteins: 2,
                fat: 2,
                carbohydrates: 2,
                calories: 2,
                price: 2,
                image: '2',
                image_large: '2',
                image_mobile: '2'
              },
              {
                _id: '3',
                name: '1',
                type: 'bun',
                proteins: 1,
                fat: 1,
                carbohydrates: 1,
                calories: 1,
                price: 1,
                image: '1',
                image_large: '1',
                image_mobile: '1'
              }
            ]
          }
        }
      });

      const ingredient = selectIngredientsByType(store.getState(), 'bun');
      expect(ingredient).toEqual([
        {
          _id: '1',
          name: '1',
          type: 'bun',
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: '1',
          image_large: '1',
          image_mobile: '1'
        },
        {
          _id: '3',
          name: '1',
          type: 'bun',
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: '1',
          image_large: '1',
          image_mobile: '1'
        }
      ]);
    });
  });

  describe('extraReducersTest', () => {
    const initialState = {
      isLoading: false,
      data: [],
      error: ''
    };
    test('getIngredients/pending', () => {
      const action = { type: getIngredients.pending.type };
      const state = ingredients.reducer(initialState, action);
      expect(state).toEqual({
        isLoading: true,
        data: [],
        error: ''
      });
    });

    test('getIngredients/fulfilled', () => {
      const action = {
        type: getIngredients.fulfilled.type,
        payload: {
          data: [
            {
              _id: '1',
              name: '1',
              type: '1',
              proteins: 1,
              fat: 1,
              carbohydrates: 1,
              calories: 1,
              price: 1,
              image: '1',
              image_large: '1',
              image_mobile: '1'
            }
          ]
        }
      };
      const state = ingredients.reducer(initialState, action);
      expect(state.data).toEqual({
        data: [
          {
            _id: '1',
            name: '1',
            type: '1',
            proteins: 1,
            fat: 1,
            carbohydrates: 1,
            calories: 1,
            price: 1,
            image: '1',
            image_large: '1',
            image_mobile: '1'
          }
        ]
      });
    });

    test('getIngredients/rejected', () => {
      const action = {
        type: getIngredients.rejected.type,
        error: {
          message: 'error'
        }
      };
      const state = ingredients.reducer(initialState, action);
      expect(state).toEqual({
        isLoading: false,
        data: [],
        error: 'error'
      });
    });
  });
});
