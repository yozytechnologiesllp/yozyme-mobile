import * as actionTypes from "./actions";
const Reducer = (state, action) => {
    if (action && action.type) {
        // Action defined based on action type    
        switch (action.type) {
            case actionTypes.LOGINDATA_UPDATE:
                return {
                    ...state,
                    login_data: { ...state.login_data, [action.field]: action.value }
                }
            case actionTypes.TWOAUTH_DATA_CHANGE:
                return {
                    ...state,
                    twoAuthData: { ...state.twoAuthData, [action.field]: action.value }
                }
            case actionTypes.USER_DETAIL:
                return {
                    ...state,
                    user_detail: action.data
                }
            case actionTypes.EMPLOYEE_ID:
                return {
                    ...state,
                    employee_Id: action.data
                }
            case actionTypes.EMPLOYEE_IMAGE:
                return {
                    ...state,
                    employee_Image: action.data
                }
            case actionTypes.EMPLOYEE_DATA:
                return {
                    ...state,
                    employee_Data: action.data
                }
            case actionTypes.PUBLIC_HOLIDAY:
                return {
                    ...state,
                    publicHoliday: action.data
                }
            case actionTypes.SET_DATA:
                return {
                    ...state,
                    data: action.data
                }
            case actionTypes.SET_RAGSTATUS:
                return {
                    ...state,
                    ragStatus: action.data
                }
            case actionTypes.SET_CURRENTISSUE:
                return {
                    ...state,
                    currentIssue: action.data
                }
            case actionTypes.SET_PROJECTCODE:
                return {
                    ...state,
                    projectCode: action.data
                }
            case actionTypes.CHANGE_TOKEN:
                return {
                    ...state,
                    tokenData: action.data
                }
            case actionTypes.SET_NOTIFICATION:
                return {
                    ...state,
                    notification: action.data
                }
            case actionTypes.SETAPIDATA:
                return {
                    ...state,
                    apidata: action.data
                }
            case actionTypes.SETLOADING:
                return {
                    ...state,
                    loading: action.data
                }
            case actionTypes.SETORIGINALESTIMATEDATA:
                return {
                    ...state,
                    originalestimatedata: action.data
                }
            case actionTypes.STAGE_DETAILS:
                return {
                    ...state,
                    stageDetails: action.data
                }
            default:
                return state

        }
    }

}

export default Reducer