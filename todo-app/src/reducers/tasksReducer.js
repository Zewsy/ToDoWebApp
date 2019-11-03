import { DELETE_TASK_SUCCESS } from "../actions/taskActions";

const initialState = {
    tasks: []
};

export function taskReducer(state = initialState, action){
    switch(action.type){
        case DELETE_TASK_SUCCESS:
            return {
                tasks: state.tasks.filter((e) => e.id !== action.id)
            }
        default:
            return state;
    }
}