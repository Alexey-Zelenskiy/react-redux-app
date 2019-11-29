import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from 'react-redux'
import WithRestoService from "../hoc";
import {menuError, menuLoaded, menuRequested} from "../../actions";
import Spinner from "../spinner";

import './menu-list.scss';
import Error from "../error";

class MenuList extends Component {

  componentDidMount() {
    const {RestoService, menuLoaded, menuRequested, menuError} = this.props;
    menuRequested();
    RestoService.getMenuItems()
      .then(res => menuLoaded(res))
      .catch(menuError)
  }

  render() {

    const {menuItems, loading, error} = this.props;

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
            <MenuListItem key={menuItem.id} menuItem={menuItem}/>
          )
        })}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    menuItems: state.menu,
    loading: state.loading
  }
};

const mapDispatchToProps = {
  menuLoaded,
  menuRequested,
  menuError
};

export default WithRestoService()(connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuList));