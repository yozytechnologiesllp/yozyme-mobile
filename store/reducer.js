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
            default:
                return state

        }
    }

}

export default Reducer