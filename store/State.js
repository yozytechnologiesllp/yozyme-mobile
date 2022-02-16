import React, { useReducer } from "react";
import { Dimensions } from "react-native";
import Store from "./StoreContext";
import Reducer from "./reducer";
import * as actionTypes from "./actions";
function State(props) {
  const intialState = {
    login_data: { login: "", password: "" },
    employee_Id: "",
    user_name: "",
  }

  const [state, dispatch] = useReducer(Reducer, intialState)

  const LoginOnChange = (field, value) => {
    dispatch({
      type: actionTypes.LOGINDATA_UPDATE,
      field: field,
      value: value
    })

  }
  const ChangeUser = (data) => {
    dispatch({
      type: actionTypes.USER_NAME,
      data: data
    })

  }
  const ChangeId = (data) => {
    dispatch({
      type: actionTypes.EMPLOYEE_ID,
      data: data
    })

  }

  return <Store.Provider value={{
    login_data: state.login_data,
    empDetails: state.empDetails,
    employee_Id: state.employee_Id,
    LoginOnChange,
    user_name: state.user_name,
    ChangeUser,
    ChangeId
  }}>{props.children}</Store.Provider>;
}

export default State;