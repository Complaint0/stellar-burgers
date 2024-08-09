import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrders = createAsyncThunk('orders/get', async () =>
  getOrdersApi()
);

export const postOrder = createAsyncThunk(
  'order/post',
  async (ids: string[]) => {
    const data = await orderBurgerApi(ids);
    return data.order;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/get',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data.orders;
  }
);
