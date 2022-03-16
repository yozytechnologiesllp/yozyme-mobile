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
            default:
                return state

        }
    }

}

export default Reducer