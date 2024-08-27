import { TLoginData, TRegisterData } from '@api';
import { setCookie } from '../../utils/cookie';
import { createAppAsyncThunk } from '../hooks/storeHooks';

export const userRegister = createAppAsyncThunk(
  'user/register',
  async (user: TRegisterData, thunkAPI) => {
    const data = await thunkAPI.extra.burgerApi.registerUserApi(user);
    localStorage.setItem('refreshToken', data.refreshToken);
    setCookie('accessToken', data.accessToken);
    return data.user;
  }
);

export const userLogin = createAppAsyncThunk(
  'user/login',
  async (user: TLoginData, thunkAPI) => {
    const data = await thunkAPI.extra.burgerApi.loginUserApi(user);
    localStorage.setItem('refreshToken', data.refreshToken);
    setCookie('accessToken', data.accessToken);
    return data.user;
  }
);

export const userLogout = createAppAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => thunkAPI.extra.burgerApi.logoutApi
);

export const userAutoLogin = createAppAsyncThunk(
  'user/autoLogin',
  async (_, thunkAPI) => {
    const data = await thunkAPI.extra.burgerApi.getUserApi();
    return data.user;
  }
);

export const changeUserData = createAppAsyncThunk(
  'user/changeUserData',
  async (user: Partial<TRegisterData>, thunkAPI) => {
    const data = await thunkAPI.extra.burgerApi.updateUserApi(user);
    return data.user;
  }
);
