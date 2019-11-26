import { DELETE_TASK_SUCCESS, FETCH_TASKS_SUCCESS, ADD_TASK_SUCCESS, TASK_EDITED} from "../actions/taskActions";

const initialState = {
    tasks: []
};

export function taskReducer(state = initialState, action){
    switch(action.type){
        case DELETE_TASK_SUCCESS:
            return {
                tasks: state.tasks.filter((e) => e.id !== action.id)
            }
        case FETCH_TASKS_SUCCESS:
            return {
                tasks: action.data
            }
        case ADD_TASK_SUCCESS:
            return {
                tasks: state.tasks.concat(action.data)
            }
        case TASK_EDITED:
            return {
                tasks: state.tasks.map((t) => (t.id === action.data.id) ?  action.data : t)
            }
        default:
            return state;
    }
}

export const getTasks = state => state.tasks;