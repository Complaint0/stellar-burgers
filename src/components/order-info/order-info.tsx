import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../services/hooks/storeHooks';
import { selectInitIngredients } from '../../services/slices/ingredients/ingredients';
import { useParams } from 'react-router-dom';
import { ordersInfoSelector } from '@selectors';
import { getOrderByNumber } from '../../services/thunk/orders';
import { getIngredients } from '../../services/thunk/ingredients';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const number = useParams().number || '';
  const dispatch = useDispatch();
  const orderData = useSelector(ordersInfoSelector(number));
  const ingredients: TIngredient[] = useSelector(selectInitIngredients);

  useEffect(() => {
    if (!orderData) dispatch(getOrderByNumber(+number));
    if (!ingredients) dispatch(getIngredients());
  }, [dispatch, number, orderData, ingredients]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
