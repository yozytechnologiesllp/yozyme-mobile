import React, { useReducer } from "react";
import { Dimensions } from "react-native";
import Store from "./StoreContext";
import Reducer from "./reducer";
import * as actionTypes from "./actions";
function State(props) {
  const intialState = {
    login_data: { username: '100009', password: '' }
  }

  const [state, dispatch] = useReducer(Reducer, intialState)

  const LoginOnChange = (field, value) => {
    dispatch({
      type: actionTypes.LOGINDATA_UPDATE,
      field: field,
      value: value
    })

  }

  return <Store.Provider value={{
    login_data: state.login_data,
    LoginOnChange
  }}>{props.children}</Store.Provider>;
}

export default State;