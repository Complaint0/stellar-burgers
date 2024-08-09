import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  deleteFromBurger,
  moveBurgerIngredientDown,
  moveBurgerIngredientUp
} from '../../services/slices/burger';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      dispatch(moveBurgerIngredientDown(ingredient));
    };

    const handleMoveUp = () => {
      dispatch(moveBurgerIngredientUp(ingredient));
    };

    const handleClose = () => {
      dispatch(deleteFromBurger(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
