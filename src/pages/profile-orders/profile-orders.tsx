import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../services/slices/orders';
import { useDispatch } from '../../services/store';
import { getOrders } from '../../services/thunk/orders';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectOrders);

  useEffect(() => {
    if (orders.length === 0) dispatch(getOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
