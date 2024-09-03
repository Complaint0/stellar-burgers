import { getOrders } from '../../../services/thunk/orders';
import orders from './orders';

describe('OrderSliceTest', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });
  describe('extraReducers', () => {
    const initialState = {
      orders: [],
      isLoading: false,
      error: ''
    };
    test('pending', () => {
      const action = { type: getOrders.pending.type };
      const state = orders.reducer(initialState, action);
      expect(state).toEqual({
        orders: [],
        isLoading: true,
        error: ''
      });
    });

    test('rejected', () => {
      const action = {
        type: getOrders.rejected.type,
        error: {
          message: 'error'
        }
      };

      const state = orders.reducer(initialState, action);
      expect(state).toEqual({
        orders: [],
        isLoading: false,
        error: 'error'
      });
    });

    test('fullfield', () => {
      const action = {
        type: getOrders.fulfilled.type,
        payload: {
          orders: [
            {
              _id: '1',
              status: '1',
              name: '1',
              createdAt: '1',
              updatedAt: '1',
              number: 1,
              ingredients: ['1', '1']
            },
            {
              _id: '2',
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

      const state = orders.reducer(initialState, action);
      expect(state.orders).toEqual({
        orders: [
          {
            _id: '1',
            status: '1',
            name: '1',
            createdAt: '1',
            updatedAt: '1',
            number: 1,
            ingredients: ['1', '1']
          },
          {
            _id: '2',
            status: '1',
            name: '1',
            createdAt: '1',
            updatedAt: '1',
            number: 1,
            ingredients: ['1', '1']
          }
        ]
      });
    });
  });
});
