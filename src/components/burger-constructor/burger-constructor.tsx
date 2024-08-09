import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearIngredients,
  selectBurgerBun,
  selectBurgerIngredients
} from '../../services/slices/burger';
import { postOrder } from '../../services/thunk/orders';
import { selectIsAuth } from '../../services/slices/user';
import {
  selectOrderIsLoading,
  setIsOrderDone
} from '../../services/slices/order';
import { useNavigate } from 'react-router-dom';
import { selectIsOrderDone } from '../../services/slices/order';
import { getFeeds } from '../../services/thunk/feeds';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = {
    bun: useSelector(selectBurgerBun),
    ingredients: useSelector(selectBurgerIngredients)
  };

  const isUser = useSelector(selectIsAuth);

  const orderRequest = useSelector(selectOrderIsLoading);

  const orderModalData = useSelector(selectIsOrderDone);

  const onOrderClick = () => {
    if (!isUser) return navigate('/login');
    if (!constructorItems.bun || orderRequest) return;

    const bunID = constructorItems.bun ? constructorItems.bun._id : '';
    const ingredientsId = constructorItems.ingredients.map((el) => el._id);

    const orderData: string[] = [bunID, ...ingredientsId, bunID];
    dispatch(setIsOrderDone());
    dispatch(postOrder(orderData));
  };

  const closeOrderModal = () => {
    navigate('/feed');
    dispatch(setIsOrderDone());
    dispatch(clearIngredients());
    dispatch(getFeeds());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      isUser={isUser}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
