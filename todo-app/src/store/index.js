import {createStore, applyMiddleware} from "redux";
import {projectsReducer} from "../reducers/projectReducers";
import thunk from "redux-thunk";

const store = createStore(projectsReducer, applyMiddleware(thunk));

export default store; 