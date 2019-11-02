import {projectsReducer} from './projectsReducer';
import {taskReducer} from './tasksReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({projects: projectsReducer, tasks: taskReducer});