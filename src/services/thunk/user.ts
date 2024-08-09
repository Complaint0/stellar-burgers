import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/cookie';

export const userRegister = createAsyncThunk(
  'user/register',
  async (user: TRegisterData) => {
    const data = await registerUserApi(user);
    localStorage.setItem('refreshToken', data.refreshToken);
    setCookie('accessToken', data.accessToken);
    return data.user;
  }
);

export const userLogin = createAsyncThunk(
  'user/login',
  async (user: TLoginData) => {
    const data = await loginUserApi(user);
    localStorage.setItem('refreshToken', data.refreshToken);
    setCookie('accessToken', data.accessToken);
    return data.user;
  }
);

export const userLogout = createAsyncThunk('user/logout', async () => {
  logoutApi();
});

export const userAutoLogin = createAsyncThunk('user/autoLogin', async () => {
  const data = await getUserApi();
  return data.user;
});

export const changeUserData = createAsyncThunk(
  'user/changeUserData',
  async (user: Partial<TRegisterData>) => {
    const data = await updateUserApi(user);
    return data.user;
  }
);
