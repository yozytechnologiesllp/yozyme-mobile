import React, { useReducer } from "react";
import { Dimensions } from "react-native";
import Store from "./StoreContext";
import Reducer from "./reducer";
import * as actionTypes from "./actions";
function State(props) {
  const intialState = {
    login_data: { login: "", password: "" },
    employee_Id: "",
    user_detail: "",
    employee_Image: null,
    employee_Data: [],
    publicHoliday: []
  }

  const [state, dispatch] = useReducer(Reducer, intialState)

  const LoginOnChange = (field, value) => {
    dispatch({
      type: actionTypes.LOGINDATA_UPDATE,
      field: field,
      value: value
    })

  }
  const ChangeDetail = (data) => {
    dispatch({
      type: actionTypes.USER_DETAIL,
      data: data
    })

  }
  const ChangeId = (data) => {
    dispatch({
      type: actionTypes.EMPLOYEE_ID,
      data: data
    })

  }
  const ChangeEmployeeImage = (data) => {
    dispatch({
      type: actionTypes.EMPLOYEE_IMAGE,
      data: data
    })

  }
  const ChangeEmployeeData = (data) => {
    dispatch({
      type: actionTypes.EMPLOYEE_DATA,
      data: data
    })

  }
  const setPublicHoliday = (data) => {
    dispatch({
      type: actionTypes.PUBLIC_HOLIDAY,
      data: data
    })

  }

  return <Store.Provider value={{
    login_data: state.login_data,
    empDetails: state.empDetails,
    employee_Id: state.employee_Id,
    user_detail: state.user_detail,
    employee_Image: state.employee_Image,
    employee_Data: state.employee_Data,
    publicHoliday: state.publicHoliday,
    LoginOnChange,
    ChangeDetail,
    ChangeId,
    ChangeEmployeeImage,
    ChangeEmployeeData,
    setPublicHoliday
  }}>{props.children}</Store.Provider>;
}

export default State;