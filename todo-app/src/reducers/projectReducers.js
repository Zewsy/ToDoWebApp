import {FETCH_PROJECTS_SUCCESS} from '../actions/projectActions';

const initialState = {
    projects: []
};

export function projectsReducer(state = initialState, action){
    switch(action.type){
        case FETCH_PROJECTS_SUCCESS:
            return {
                ...state,
                projects: action.data
            }
        default:
            return state;
    }
}

export const getProjects = state => state.projects;