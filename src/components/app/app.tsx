import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { AppRoute } from '../routes/routes';
import { useEffect } from 'react';
import { useDispatch } from '../../services/hooks/storeHooks';
import { getIngredients } from '../../services/thunk/ingredients';
import { userAutoLogin } from '../../services/thunk/user';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(userAutoLogin());
  }, []);
  return (
    <div className={styles.app}>
      <AppHeader />
      <AppRoute />
    </div>
  );
};

export default App;
