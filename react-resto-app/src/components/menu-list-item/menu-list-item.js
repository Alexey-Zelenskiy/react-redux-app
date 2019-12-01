import React from 'react';
import './menu-list-item.scss';
import icons from './icons'

const MenuListItem = ({menuItem, onAddToCart}) => {

  const {title, price, url, category} = menuItem;

  const selectIcons = Object.keys(icons).filter(icon => {
      return icon === category
    }
  );

  return (
    <li className="menu__item">
      <div className="menu__title">{title}<img alt='' src={icons[selectIcons]}/></div>
      <img className="menu__img"
           src={url}
           alt={title}/>
      <div className="menu__category">Category: <span>{category}</span></div>
      <div className="menu__price">Price: <span>{price}$</span></div>
      <button onClick={() =>
        onAddToCart()
      } className="menu__btn">Add to cart
      </button>
    </li>
  )
};

export default MenuListItem;