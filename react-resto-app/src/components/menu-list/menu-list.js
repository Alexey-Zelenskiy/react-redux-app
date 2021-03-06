import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from 'react-redux'
import WithRestoService from "../hoc";
import {addedToCart, menuError, menuLoaded, menuRequested} from "../../actions";
import Spinner from "../spinner";

import './menu-list.scss';
import Error from "../error";

class MenuList extends Component {

  componentDidMount() {
    const {RestoService, menuLoaded, menuRequested, menuError, menuItems} = this.props;
    if (!menuItems.length) {
      menuRequested();
      RestoService.getMenuItems()
        .then(res => menuLoaded(res))
        .catch(menuError)
    }
  }

  render() {

    const {menuItems, loading, error, addedToCart} = this.props;

    if (loading) {
      return <Spinner/>
    }
    if (error) {
      return <Error/>
    }

    return (
      <ul className="menu__list">
        {menuItems.map(menuItem => {
          return (
            <MenuListItem
              key={menuItem.id}
              menuItem={menuItem}
              onAddToCart={() => addedToCart(menuItem.id)}
            />
          )
        })}
      </ul>
    )
  }
}

const mapStateToProps = ({menu, loading, error}) => {
  return {
    menuItems: menu,
    loading: loading,
    error: error
  }
};

const mapDispatchToProps = {
  menuLoaded,
  menuRequested,
  menuError,
  addedToCart
};

export default WithRestoService()(connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuList));