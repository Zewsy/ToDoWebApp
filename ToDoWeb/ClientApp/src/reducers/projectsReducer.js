import {FETCH_PROJECTS_SUCCESS, DELETE_PROJECT_SUCCESS, ADD_PROJECT_SUCCESS} from '../actions/projectActions';

const initialState = {
    projects: []
};

export function projectsReducer(state = initialState, action){
    switch(action.type){
        case FETCH_PROJECTS_SUCCESS:
            return {
                projects: action.data
            }
        case DELETE_PROJECT_SUCCESS:
            return {
                projects: state.projects.filter((e) => e.id !== action.id)
            }
        case ADD_PROJECT_SUCCESS:
            return {
                projects: state.projects.concat(action.data)
            }
        default:
            return state;
    }
}

export const getProjects = state => state.projects;