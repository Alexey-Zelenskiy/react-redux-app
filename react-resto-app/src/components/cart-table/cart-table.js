import React from 'react';
import './cart-table.scss';
import {connect} from "react-redux";
import WithRestoService from "../hoc";
import {deleteFromCart} from "../../actions";

const CartTable = ({menu, deleteFromCart}) => {
  return (
    <>
      <div className="cart__title">Ваш заказ:</div>
      <div className="cart__list">

        {
          menu.map(item => {
            const {title, price, url, id, count} = item;
            return (
              <div key={id} className="cart__item">
                <img
                  src={url}
                  className="cart__item-img" alt={title}/>
                <div className="cart__item-title">{title}</div>
                <div className="cart__item-price">{price * count}$</div>
                <div onClick={() => deleteFromCart(id)} className="cart__close">&times;</div>
                <div className="cart__item-price">{count}</div>
              </div>
            )
          })
        }
      </div>
    </>
  );
};
const mapStateToProps = ({menu}) => {
  return {
    menu: menu.filter(item => {
      return (
        item.count !== 0
      )
    })
  }
};

const mapDispatchToProps = {
  deleteFromCart
};


export default WithRestoService()(connect(
  mapStateToProps,
  mapDispatchToProps
)(CartTable));