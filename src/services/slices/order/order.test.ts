import { postOrder } from '../../../services/thunk/orders';
import order from './order';

describe('OrderSliceTest', () => {
  describe('extraReducers', () => {
    const initialState = {
      order: null,
      isTaken: false,
      isLoading: false,
      error: ''
    };
    test('pending', () => {
      const action = { type: postOrder.pending.type };
      const state = order.reducer(initialState, action);
      expect(state).toEqual({
        order: null,
        isTaken: false,
        isLoading: true,
        error: ''
      });
    });

    test('rejected', () => {
      const action = {
        type: postOrder.rejected.type,
        error: {
          message: 'error'
        }
      };

      const state = order.reducer(initialState, action);
      expect(state).toEqual({
        order: null,
        isTaken: false,
        isLoading: false,
        error: 'error'
      });
    });

    test('fullfield', () => {
      const action = {
        type: postOrder.fulfilled.type,
        payload: {
          order: {
            _id: '1',
            status: '1',
            name: '1',
            createdAt: '1',
            updatedAt: '1',
            number: 1,
            ingredients: ['1', '1']
          }
        }
      };

      const state = order.reducer(initialState, action);
      expect(state.order).toEqual({
        order: {
          _id: '1',
          status: '1',
          name: '1',
          createdAt: '1',
          updatedAt: '1',
          number: 1,
          ingredients: ['1', '1']
        }
      });
    });
  });
});
