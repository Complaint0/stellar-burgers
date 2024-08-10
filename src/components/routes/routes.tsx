import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  createBrowserRouter
} from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import { IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from './protectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ConstructorPage />
  },
  {
    path: '/feed',
    element: <Feed />
  },
  {
    path: '/login',
    element: (
      <ProtectedRoute onlyUnAuth>
        <Login />
      </ProtectedRoute>
    )
  },
  {
    path: '/register',
    element: (
      <ProtectedRoute onlyUnAuth>
        <Register />
      </ProtectedRoute>
    )
  },
  {
    path: '/forgot-password',
    element: (
      <ProtectedRoute onlyUnAuth>
        <ForgotPassword />
      </ProtectedRoute>
    )
  },
  {
    path: '/reset-password',
    element: (
      <ProtectedRoute onlyUnAuth>
        <ResetPassword />
      </ProtectedRoute>
    )
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: '/profile/orders',
    element: (
      <ProtectedRoute>
        <ProfileOrders />
      </ProtectedRoute>
    )
  },
  {
    path: '*',
    element: <NotFound404 />
  },
  {
    path: '/feed/:number',
    element: <OrderInfo />
  },
  {
    path: '/ingredients/:id',
    element: <IngredientDetails />
  },
  {
    path: '/profile/orders/:number',
    element: (
      <ProtectedRoute>
        <OrderInfo />
      </ProtectedRoute>
    )
  }
]);

export const AppRoute = () => {
  const navigate = useNavigate();
  const handleClose = () => navigate(-1);
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      <Routes location={background}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Ингридиенты' onClose={handleClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='Информация о заказе' onClose={handleClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='Информация о заказе' onClose={handleClose}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
};
