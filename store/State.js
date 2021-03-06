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
    publicHoliday: [],
    data: [],
    ragStatus: [],
    currentIssue: [],
    tokenData: '',
    twoAuthData: { Redirect: "", Empid: "", Token: "" },
    apidata: [],
    loading: false,
    originalestimatedata: [],
    stageDetails: [],
    projectCode: '',
    notification: []
  }

  const [state, dispatch] = useReducer(Reducer, intialState)

  const LoginOnChange = (field, value) => {
    dispatch({
      type: actionTypes.LOGINDATA_UPDATE,
      field: field,
      value: value
    })
  }

  const TwoAuthDataChange = (field, value) => {
    dispatch({
      type: actionTypes.TWOAUTH_DATA_CHANGE,
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
  const ChangeToken = (data) => {
    dispatch({
      type: actionTypes.CHANGE_TOKEN,
      data: data
    })

  }
  const setStageDetails = (data) => {
    dispatch({
      type: actionTypes.STAGE_DETAILS,
      data: data
    })

  }
  const setNotification = (data) => {
    dispatch({
      type: actionTypes.SET_NOTIFICATION,
      data: data
    })

  }
  const setProjectCode = (data) => {
    dispatch({
      type: actionTypes.SET_PROJECTCODE,
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
  const setData = (data) => {
    dispatch({
      type: actionTypes.SET_DATA,
      data: data
    })

  }

  const setApidata = (data) => {
    dispatch({
      type: actionTypes.SETAPIDATA,
      data: data
    })

  }
  const setLoading = (data) => {
    dispatch({
      type: actionTypes.SETLOADING,
      data: data
    })

  }
  const setOriginalestimatedata = (data) => {
    dispatch({
      type: actionTypes.SETORIGINALESTIMATEDATA,
      data: data
    })

  }
  const setRagStatus = (data) => {
    dispatch({
      type: actionTypes.SET_RAGSTATUS,
      data: data
    })

  }
  const setCurrentIssue = (data) => {
    dispatch({
      type: actionTypes.SET_CURRENTISSUE,
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
    data: state.data,
    ragStatus: state.ragStatus,
    currentIssue: state.currentIssue,
    tokenData: state.tokenData,
    twoAuthData: state.twoAuthData,
    apidata: state.apidata,
    loading: state.loading,
    originalestimatedata: state.originalestimatedata,
    stageDetails: state.stageDetails,
    projectCode: state.projectCode,
    notification: state.notification,
    LoginOnChange,
    ChangeDetail,
    ChangeId,
    ChangeEmployeeImage,
    ChangeEmployeeData,
    setPublicHoliday,
    setData,
    setRagStatus,
    setCurrentIssue,
    ChangeToken,
    TwoAuthDataChange,
    setApidata,
    setLoading,
    setOriginalestimatedata,
    setStageDetails,
    setProjectCode,
    setNotification
  }}>{props.children}</Store.Provider>;
}

export default State;