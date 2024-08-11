import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { selectFeeds } from '../../services/slices/feeds';
import { useDispatch, useSelector } from '../../services/hooks/storeHooks';
import { getFeeds } from '../../services/thunk/feeds';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectFeeds);
  const dispatch = useDispatch();

  useEffect(() => {
    if (orders.length === 0) dispatch(getFeeds());
  }, [dispatch]);

  const handleGetFeeds = useCallback(() => dispatch(getFeeds()), [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
