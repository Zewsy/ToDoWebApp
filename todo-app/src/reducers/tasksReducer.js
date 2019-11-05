import { DELETE_TASK_SUCCESS, FETCH_TASKS_SUCCESS} from "../actions/taskActions";

const initialState = {
    tasks: [],
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
        default:
            return state;
    }
}

export const getTasks = state => state.tasks;