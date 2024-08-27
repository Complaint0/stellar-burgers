import { RootState } from '../store';

export const ordersInfoSelector = (number: string) => (state: RootState) => {
  if (state['slices/feed'].orders.length) {
    const data = state['slices/feed'].orders.find(
      (el) => el.number === +number
    );
    if (data) return data;
  }

  if (state['slices/orders'].orders.length) {
    const data = state['slices/orders'].orders.find(
      (el) => el.number === +number
    );
    if (data) return data;
  }

  if (state['slices/order'].order?.number === +number) {
    return state['slices/order'].order;
  }

  return null;
};
