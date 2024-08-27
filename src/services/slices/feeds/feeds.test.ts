import { combineReducers, configureStore } from '@reduxjs/toolkit';
import feeds, { selectOrderById } from './feeds';
import { getFeeds } from '../../../services/thunk/feeds';

describe('feedsSliceTest', () => {
  beforeAll(() => {
    jest.restoreAllMocks();
  });
  describe('selectors', () => {
    test('selectOrderById', () => {
      const rootReducer = combineReducers({
        [feeds.name]: feeds.reducer
      });
      const store = configureStore({
        reducer: rootReducer,
        preloadedState: {
          [feeds.name]: {
            orders: [
              {
                _id: '1',
                status: '1',
                name: '1',
                createdAt: '1',
                updatedAt: '1',
                number: 1,
                ingredients: ['1', '1']
              }
            ],
            total: 1,
            totalToday: 1,
            error: '',
            isLoading: false
          }
        }
      });
      const data = selectOrderById(store.getState(), 1);

      expect(data).toEqual({
        _id: '1',
        status: '1',
        name: '1',
        createdAt: '1',
        updatedAt: '1',
        number: 1,
        ingredients: ['1', '1']
      });
    });
  });

  describe('extraReducers', () => {
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      error: '',
      isLoading: false
    };
    test('pending', () => {
      const action = { type: getFeeds.pending.type };
      const state = feeds.reducer(initialState, action);
      expect(state).toEqual({
        orders: [],
        total: 0,
        totalToday: 0,
        error: '',
        isLoading: true
      });
    });

    test('rejected', () => {
      const action = {
        type: getFeeds.rejected.type,
        error: { message: 'error' }
      };
      const state = feeds.reducer(initialState, action);
      expect(state).toEqual({
        orders: [],
        total: 0,
        totalToday: 0,
        error: 'error',
        isLoading: false
      });
    });
    test('fullfield', () => {
      const action = {
        type: getFeeds.fulfilled.type,
        payload: {
          total: 1,
          totalToday: 1,
          error: '',
          isLoading: false,
          orders: [
            {
              _id: '1',
              status: '1',
              name: '1',
              createdAt: '1',
              updatedAt: '1',
              number: 1,
              ingredients: ['1', '1']
            }
          ]
        }
      };
      const state = feeds.reducer(initialState, action);
      expect(state.orders).toEqual([
        {
          _id: '1',
          status: '1',
          name: '1',
          createdAt: '1',
          updatedAt: '1',
          number: 1,
          ingredients: ['1', '1']
        }
      ]);
    });
  });
});
