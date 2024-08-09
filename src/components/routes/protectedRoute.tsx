import { ReactElement } from 'react';
import { selectIsAuth, selectIsAuthChecked } from '../../services/slices/user';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

interface TProtectedRoute {
  children: ReactElement;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute = ({ children, onlyUnAuth }: TProtectedRoute) => {
  const location = useLocation();
  const isUser = useSelector(selectIsAuth);
  const isAuthChecked = useSelector(selectIsAuthChecked);

  if (!isAuthChecked) return <Preloader />;

  if (isUser && onlyUnAuth) {
    const from = location.state?.from || { pathname: '/' };
    const background = location.state?.from.background || null;
    return <Navigate to={from} state={{ background }} />;
  }

  if (!onlyUnAuth && !isUser) {
    return (
      <Navigate
        replace
        to={'/login'}
        state={{
          from: {
            ...location,
            background: location.state?.background,
            state: null
          }
        }}
      />
    );
  }

  return children;
};
