import { createAppAsyncThunk } from '../hooks/storeHooks';

export const getOrders = createAppAsyncThunk(
  'orders/get',
  async (_, thunkAPI) => thunkAPI.extra.burgerApi.getOrdersApi()
);

export const postOrder = createAppAsyncThunk(
  'order/post',
  async (ids: string[], thunkAPI) => {
    const data = await thunkAPI.extra.burgerApi.orderBurgerApi(ids);
    return data.order;
  }
);

export const getOrderByNumber = createAppAsyncThunk(
  'order/get',
  async (number: number, thunkAPI) => {
    const data = await thunkAPI.extra.burgerApi.getOrderByNumberApi(number);
    return data.orders;
  }
);
