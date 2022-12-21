import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemRating from './ProductItemRating';
import './ProductItem.scss';
import cartIconFull from '../../assets/cart-icon_full.png';
import cartIconEmpty from '../../assets/cart-icon_empty.png';
import IProductItemProp from '../../interfaces/index';
import { RoutesEnum } from '../../enums';
import { useAppDispatch } from '../../hooks';
import {
  calculatePrice,
  calculateTotalQuantity,
  setCartProducts,
} from '../../redux/slices/cartSlice';

const ItemBlockCard: FC<IProductItemProp> = ({ item, isInTheCart }) => {
  const [inCart, setInCart] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const changeInCart = (): void =>
    inCart ? setInCart(false) : setInCart(true);

  const openProductDetails = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLImageElement;
    const btn = target.closest('.block-card__cart');
    if (!btn) {
      const { id } = event.currentTarget;
      navigate(`${RoutesEnum.Products}/${id}`);
    } else {
      changeInCart();
      dispatch(setCartProducts(item));
      dispatch(calculateTotalQuantity());
      dispatch(calculatePrice());
    }
  };
  return (
    <div
      role='presentation'
      className={isInTheCart ? 'list-card block-card' : 'block-card'}
      id={`${item.id}`}
      onClick={openProductDetails}
    >
      <div
        className='block-card__image'
        style={{ backgroundImage: `url(${item.images[0]})` }}
      />
      <div className='discount-line'>Discount: {item.discountPercentage}%</div>
      <div className='block-card__details'>
        <div className='block-card__description'>
          <span>{item.description}</span>
        </div>
        <span className='block-card__item-title'>{item.title}</span>
        <ItemRating itemRating={item.rating} />
        <span className='block-card__item-brand'>{item.brand}</span>
        <button
          className='block-card__cart'
          type='button'
          onClick={changeInCart}
        >
          <img
            src={inCart ? cartIconFull : cartIconEmpty}
            alt={inCart ? 'Item is in the cart' : 'Add to cart'}
          />
        </button>
        <span className='block-card__price'>${item.price}.00</span>
      </div>
    </div>
  );
};
export default ItemBlockCard;
