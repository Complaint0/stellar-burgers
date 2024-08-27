import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { selectUserName } from '../../services/slices/user/user';
import { useSelector } from '../../services/hooks/storeHooks';

export const AppHeader: FC = () => {
  const userName = useSelector(selectUserName) || '';
  return <AppHeaderUI userName={userName} />;
};
