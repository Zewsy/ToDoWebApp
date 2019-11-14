import {projectsReducer} from './projectsReducer';
import {taskReducer} from './tasksReducer';
import {dialogReducer} from './dialogReducer';
import {statusReducer} from './statusReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({projects: projectsReducer, tasks: taskReducer, dialogs: dialogReducer, statuses: statusReducer});