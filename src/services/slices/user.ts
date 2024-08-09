import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userSliceName } from './constants';
import {
  changeUserData,
  userAutoLogin,
  userLogin,
  userLogout,
  userRegister
} from '../thunk/user';
import { TUser } from '@utils-types';

type TUserSlice = {
  isAuth: boolean;
  isAuthChecked: boolean;
  user: TUser;
};

const initialState: TUserSlice = {
  isAuth: false,
  isAuthChecked: true,
  user: {
    email: '',
    name: ''
  }
};

const userSlice = createSlice({
  name: userSliceName,
  initialState,
  reducers: {},
  selectors: {
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectIsAuth: (state) => state.isAuth,
    selectUserName: (state) => state.user.name,
    selectUserEmail: (state) => state.user.email
  },
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state, action) => {
      state.isAuth = false;
      state.isAuthChecked = false;
    });
    builder.addCase(
      userRegister.fulfilled,
      (state, { payload }: PayloadAction<TUser>) => {
        state.isAuth = true;
        state.isAuthChecked = true;
        state.user = payload;
      }
    );
    builder.addCase(userRegister.rejected, (state, action) => {
      state.isAuth = false;
      state.isAuthChecked = true;
    });

    builder.addCase(userLogin.pending, (state, action) => {
      state.isAuth = false;
      state.isAuthChecked = false;
    });
    builder.addCase(
      userLogin.fulfilled,
      (state, { payload }: PayloadAction<TUser>) => {
        state.isAuth = true;
        state.isAuthChecked = true;
        state.user = payload;
      }
    );
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isAuth = false;
      state.isAuthChecked = true;
    });

    builder.addCase(userLogout.pending, (state, action) => {
      state.isAuthChecked = false;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.isAuth = false;
      state.isAuthChecked = true;
      state.user.email = '';
      state.user.name = '';
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.isAuth = true;
      state.isAuthChecked = true;
    });

    builder.addCase(userAutoLogin.pending, (state, action) => {
      state.isAuth = false;
      state.isAuthChecked = false;
    });
    builder.addCase(
      userAutoLogin.fulfilled,
      (state, { payload }: PayloadAction<TUser>) => {
        state.isAuth = true;
        state.isAuthChecked = true;
        state.user = payload;
      }
    );
    builder.addCase(userAutoLogin.rejected, (state, action) => {
      state.isAuth = false;
      state.isAuthChecked = true;
    });

    builder.addCase(changeUserData.pending, (state, action) => {
      state.isAuthChecked = false;
    });
    builder.addCase(
      changeUserData.fulfilled,
      (state, { payload }: PayloadAction<TUser>) => {
        state.isAuthChecked = true;
        state.user = payload;
      }
    );
    builder.addCase(changeUserData.rejected, (state, action) => {
      state.isAuthChecked = true;
    });
  }
});

export default userSlice;
export const {
  selectIsAuthChecked,
  selectIsAuth,
  selectUserEmail,
  selectUserName
} = userSlice.selectors;
