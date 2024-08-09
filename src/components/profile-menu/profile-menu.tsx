import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { userLogout } from '../../services/thunk/user';
import { clearOrders } from '../../services/slices/orders';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
    dispatch(clearOrders());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
