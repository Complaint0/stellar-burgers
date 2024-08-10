import { burgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrders = createAsyncThunk('orders/get', async () =>
  burgerApi.getOrdersApi()
);

export const postOrder = createAsyncThunk(
  'order/post',
  async (ids: string[]) => {
    const data = await burgerApi.orderBurgerApi(ids);
    return data.order;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/get',
  async (number: number) => {
    const data = await burgerApi.getOrderByNumberApi(number);
    return data.orders;
  }
);
