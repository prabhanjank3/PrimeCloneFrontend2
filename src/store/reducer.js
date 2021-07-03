const initialStore = {
  isLoggedIn: false,
  userID: "",
  firstName: "",
  home_display_data_loaded: false,
  home_display: {},
  isPrimeMember: true,
  userCart: {
    itemMap: {},
    totalCost: 0,
    cartItemData: {}
  }
};
const reducer = (state = initialStore, action) => {
  if (action.type === "DATA_LOAD_UPDATE_STATE") {
    state = {
      ...state,
      home_display: action.home_display,
      home_display_data_loaded: true
    };
  }
  if (action.type === "AUTH_SUCCESS") {
    state = {
      ...state,
      isLoggedIn: true,
      userID: action.payLoad.authID,
      firstName: action.payLoad.firstName,
      isPrimeMember: action.payLoad.isPrimeMember
    };
  }
  if (action.type === "PRIME_SUBSCRIBED") {
    state = {
      ...state,
      isPrimeMember: true
    };
  }
  if (action.type === "LOGOUT_STATE_UPDATE") {
    state = {
      ...state,
      isLoggedIn: false,
      userID: "",
      firstName: "",
      isPrimeMember: false
    };
  }
  if (action.type === "ADD_TO_CART") {
    state = {
      ...state,
      userCart: {
        itemMap: {
          ...state.userCart.itemMap,
          [action.payLoad.itemId]: state.userCart.itemMap.hasOwnProperty(
            action.payLoad.itemId
          )
            ? state.userCart.itemMap[action.payLoad.itemId] + 1
            : 1
        },
        totalCost: state.userCart.totalCost + action.payLoad.itemPrice,
        cartItemData: {
          ...state.userCart.cartItemData,
          [action.payLoad.itemId]: action.payLoad.itemData
        }
      }
    };
    console.log(state.userCart);
  }
  if (action.type === "REMOVE_FROM_CART") {
    // delete state.userCart.itemMap[action.payLoad.itemId];
    state.userCart.itemMap[action.payLoad.itemId] =
      state.userCart.itemMap[action.payLoad.itemId] - 1;
    if (state.userCart.itemMap[action.payLoad.itemId] === 0) {
      delete state.userCart.itemMap[action.payLoad.itemId];
      // delete state.userCart.cartItemData[action.payLoad.itemId];
    }
    state = {
      ...state,
      userCart: {
        ...state.userCart,
        itemMap: {
          ...state.userCart.itemMap
        },
        totalCost: state.userCart.totalCost - action.payLoad.itemPrice
      }
    };
    console.log(state.userCart);
  }
  return state;
};
export default reducer;
