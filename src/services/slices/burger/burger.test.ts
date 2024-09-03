import burgerConstructor, {
  addToBurger,
  burgerReducer,
  deleteFromBurger,
  moveBurgerIngredientDown,
  moveBurgerIngredientUp
} from './burger';
import { configureStore } from '@reduxjs/toolkit';

describe('BurgerSliceTest', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  describe('Configure rootReducer', () => {
    test('should set the root reducer', () => {
      burgerConstructor.reducer = jest.fn();
      const store = configureStore({
        reducer: burgerConstructor.reducer
      });
      store.dispatch({
        type: 'TestAction'
      });
      expect(burgerConstructor.reducer).toHaveBeenCalled();
    });
  });

  describe('reducers', () => {
    test('addToBurger', () => {
      const initialState = {
        ingredients: [],
        bun: null
      };
      const ingredient = {
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
      };
      const newState = burgerReducer(initialState, addToBurger(ingredient));
      const { ingredients } = newState;
      const testIngredient = ingredients[0];
      expect(ingredients).toEqual([
        {
          _id: '1',
          id: testIngredient.id,
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
      ]);
    });

    test('deleteIngredient', () => {
      const initialState = {
        ingredients: [
          {
            _id: '1',
            name: '1',
            id: '1',
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
        ],
        bun: null
      };
      const newState = burgerReducer(
        initialState,
        deleteFromBurger(initialState.ingredients[0].id)
      );
      const { ingredients } = newState;
      expect(ingredients).toEqual([]);
    });

    test('moveBurgerIngredientUp', () => {
      const initialState = {
        ingredients: [
          {
            _id: '1',
            name: '1',
            id: '1',
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
            id: '2',
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
        ],
        bun: null
      };
      const newState = burgerReducer(
        initialState,
        moveBurgerIngredientUp(initialState.ingredients[1])
      );
      const { ingredients } = newState;
      expect(ingredients).toEqual([
        {
          _id: '2',
          name: '2',
          id: '2',
          type: '2',
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
          _id: '1',
          name: '1',
          id: '1',
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
      ]);
    });
    test('moveBurgerIngredientDown', () => {
      const initialState = {
        ingredients: [
          {
            _id: '1',
            name: '1',
            id: '1',
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
            id: '2',
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
        ],
        bun: null
      };
      const newState = burgerReducer(
        initialState,
        moveBurgerIngredientDown(initialState.ingredients[0])
      );
      const { ingredients } = newState;
      expect(ingredients).toEqual([
        {
          _id: '2',
          name: '2',
          id: '2',
          type: '2',
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
          _id: '1',
          name: '1',
          id: '1',
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
      ]);
    });
  });
});
