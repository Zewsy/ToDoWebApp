import { DELETE_TASK_SUCCESS, FETCH_TASKS_SUCCESS, FETCH_STATUSES_SUCCESS, DELETE_STATUS_SUCCESS} from "../actions/taskActions";

const initialState = {
    tasks: [],
    statuses: []
};

export function taskReducer(state = initialState, action){
    switch(action.type){
        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.filter((e) => e.id !== action.id)
            }
        case FETCH_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.data
            }
        case FETCH_STATUSES_SUCCESS:
            return {
                ...state,
                statuses: action.data
            }
        case DELETE_STATUS_SUCCESS:
            return {
                ...state,
                statuses: state.statuses.filter((e) => e.id !== action.id)
            }
        default:
            return state;
    }
}

export const getTasks = state => state.tasks;
export const getStatuses = state => state.statuses;