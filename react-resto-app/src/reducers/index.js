const initialState = {
  menu: [],
  loading: true,
  error: false
};
const uniqueId = () => {
  return `f${(~~(Math.random() * 1e8)).toString(16)}`
};

const reducer = (state = initialState, action) => {

  const {type, payload} = action;

  console.log(state);
  switch (type) {
    case 'MENU_LOADED':
      return {
        ...state,
        menu: payload.map(item => {
          return {
            ...item,
            count: 0,
          }
        }),
        loading: false,
        error: false
      };
    case 'MENU_REQUESTED':
      return {
        ...state,
        loading: true
      };
    case 'MENU_ERROR':
      return {
        ...state,
        loading: true,
        error: true
      };
    case 'ITEM_ADD_TO_CART':
      return {
        ...state,
        menu: state.menu.map(item => {
          if (item.id === payload) {
            return {
              ...item,
              count: item.count + 1
            }
          }
          return item
        })
        // items: state.items.map(item => {
        //   if (id === action.payload.id) {
        //     return {
        //       ...state,
        //       item
        //     }
        //   }
        //   return {
        //     ...state,
        //     newItem
        //   }
        // })
      };
    case 'ITEM_REMOVE_FROM_CART':
      return {
        ...state,
        menu: state.menu.map(item => {
          if (item.id === payload) {
            return {
              ...item, count: item.count -= 1
            }
          }
          return item
        })
      };
    default:
      return state;

  }
};

export default reducer;