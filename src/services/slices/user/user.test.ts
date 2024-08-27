import {
  changeUserData,
  userAutoLogin,
  userLogin,
  userLogout,
  userRegister
} from '../../../services/thunk/user';
import user from './user';

describe('UserSliceTest', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });
  describe('extraReducers', () => {
    const initialState = {
      isAuth: false,
      isAuthChecked: true,
      error: '',
      user: {
        email: '',
        name: ''
      }
    };
    describe('userRegister', () => {
      test('pending', () => {
        const action = { type: userRegister.pending.type };
        const state = user.reducer(initialState, action);
        expect(state).toEqual({
          isAuth: false,
          isAuthChecked: false,
          error: '',
          user: {
            email: '',
            name: ''
          }
        });
      });

      test('rejected', () => {
        const action = {
          type: userRegister.rejected.type,
          error: {
            message: 'error'
          }
        };

        const state = user.reducer(initialState, action);
        expect(state).toEqual({
          isAuth: false,
          isAuthChecked: true,
          error: 'error',
          user: {
            email: '',
            name: ''
          }
        });
      });

      test('fullfield', () => {
        const action = {
          type: userRegister.fulfilled.type,
          payload: {
            user: {
              email: 'email',
              name: 'name'
            }
          }
        };

        const state = user.reducer(initialState, action);
        expect(state.user).toEqual({
          user: {
            email: 'email',
            name: 'name'
          }
        });
      });
    });
    describe('userLogin', () => {
      test('pending', () => {
        const action = { type: userLogin.pending.type };
        const state = user.reducer(initialState, action);
        expect(state).toEqual({
          isAuth: false,
          isAuthChecked: false,
          error: '',
          user: {
            email: '',
            name: ''
          }
        });
      });

      test('rejected', () => {
        const action = {
          type: userLogin.rejected.type,
          error: {
            message: 'error'
          }
        };

        const state = user.reducer(initialState, action);
        expect(state).toEqual({
          isAuth: false,
          isAuthChecked: true,
          error: 'error',
          user: {
            email: '',
            name: ''
          }
        });
      });

      test('fullfield', () => {
        const action = {
          type: userLogin.fulfilled.type,
          payload: {
            user: {
              email: 'email',
              name: 'name'
            }
          }
        };

        const state = user.reducer(initialState, action);
        expect(state.user).toEqual({
          user: {
            email: 'email',
            name: 'name'
          }
        });
      });
    });

    describe('userLogout', () => {
      test('pending', () => {
        const action = { type: userLogout.pending.type };
        const state = user.reducer(initialState, action);
        expect(state).toEqual({
          isAuth: false,
          isAuthChecked: false,
          error: '',
          user: {
            email: '',
            name: ''
          }
        });
      });

      test('rejected', () => {
        const action = {
          type: userLogout.rejected.type,
          error: {
            message: 'error'
          }
        };

        const state = user.reducer(initialState, action);
        expect(state).toEqual({
          isAuth: false,
          isAuthChecked: true,
          error: 'error',
          user: {
            email: '',
            name: ''
          }
        });
      });

      test('fullfield', () => {
        const action = {
          type: userLogout.fulfilled.type,
          payload: {
            user: {
              email: '',
              name: ''
            }
          }
        };

        const state = user.reducer(initialState, action);
        expect(state.user).toEqual({
          email: '',
          name: ''
        });
      });
    });
    describe('userAutoLogin', () => {
      test('pending', () => {
        const action = { type: userAutoLogin.pending.type };
        const state = user.reducer(initialState, action);
        expect(state).toEqual({
          isAuth: false,
          isAuthChecked: false,
          error: '',
          user: {
            email: '',
            name: ''
          }
        });
      });

      test('rejected', () => {
        const action = {
          type: userAutoLogin.rejected.type,
          error: {
            message: 'error'
          }
        };

        const state = user.reducer(initialState, action);
        expect(state).toEqual({
          isAuth: false,
          isAuthChecked: true,
          error: 'error',
          user: {
            email: '',
            name: ''
          }
        });
      });

      test('fullfield', () => {
        const action = {
          type: userAutoLogin.fulfilled.type,
          payload: {
            user: {
              email: 'email',
              name: 'name'
            }
          }
        };

        const state = user.reducer(initialState, action);
        expect(state.user).toEqual({
          user: {
            email: 'email',
            name: 'name'
          }
        });
      });
    });

    describe('changeUserData', () => {
      test('pending', () => {
        const action = { type: changeUserData.pending.type };
        const state = user.reducer(initialState, action);
        expect(state).toEqual({
          isAuth: false,
          isAuthChecked: false,
          error: '',
          user: {
            email: '',
            name: ''
          }
        });
      });

      test('rejected', () => {
        const action = {
          type: changeUserData.rejected.type,
          error: {
            message: 'error'
          }
        };

        const state = user.reducer(initialState, action);
        expect(state).toEqual({
          isAuth: false,
          isAuthChecked: true,
          error: 'error',
          user: {
            email: '',
            name: ''
          }
        });
      });

      test('fullfield', () => {
        const action = {
          type: changeUserData.fulfilled.type,
          payload: {
            user: {
              email: 'email',
              name: 'name'
            }
          }
        };

        const state = user.reducer(initialState, action);
        expect(state.user).toEqual({
          user: {
            email: 'email',
            name: 'name'
          }
        });
      });
    });
  });
});
