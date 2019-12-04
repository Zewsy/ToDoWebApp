import { DELETE_TASK_SUCCESS, FETCH_TASKS_SUCCESS, ADD_TASK_SUCCESS, ADD_TASKS_SUCCESS, TASK_EDITED_SUCCESS, PROJECT_SELECTED} from "../actions/taskActions";

const initialState = {
    tasks: [],
    selectedProject: 1
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
        case ADD_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.data
            }
        case ADD_TASK_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.concat(action.data)
            }
        case TASK_EDITED_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.map((t) => (t.id === action.data.id) ?  action.data : t)
            }
        case PROJECT_SELECTED:
            return {
                ...state,
                selectedProject: action.projectId
            }
        default:
            return state;
    }
}

export const getTasks = state => state.tasks;
export const getSelectedProject = state => state.selectedProject;