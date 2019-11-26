import { FETCH_STATUSES_SUCCESS, DELETE_STATUS_SUCCESS, ADD_STATUS_SUCCESS} from "../actions/statusActions";

const initialState = {
    statuses: []
};

export function statusReducer(state = initialState, action){
    switch(action.type){
        case FETCH_STATUSES_SUCCESS:
            return {
                statuses: action.data
            }
        case DELETE_STATUS_SUCCESS:
            return {
                statuses: state.statuses.filter((e) => e.id !== action.id)
            }
        case ADD_STATUS_SUCCESS:
            return {
                statuses: state.statuses.concat(action.data)
            }
        default:
            return state;
    }
}

export const getStatuses = state => state.statuses;