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
            case actionTypes.USER_NAME:
                return {
                    ...state,
                    user_name: action.data
                }
            case actionTypes.EMPLOYEE_ID:
                return {
                    ...state,
                    employee_Id: action.data
                }
            default:
                return state

        }
    }

}

export default Reducer