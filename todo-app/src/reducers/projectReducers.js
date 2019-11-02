import {FETCH_PROJECTS_SUCCESS, DELETE_PROJECT_SUCCESS} from '../actions/projectActions';

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
        default:
            return state;
    }
}

export const getProjects = state => state.projects;