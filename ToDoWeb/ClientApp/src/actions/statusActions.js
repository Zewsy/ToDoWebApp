export const FETCH_STATUSES_SUCCESS = 'FETCH_STATUSES_SUCCESS';
export const DELETE_STATUS_SUCCESS = 'DELETE_STATUS_SUCCESS';
export const ADD_STATUS_SUCCESS = 'ADD_STATUS_SUCCESS';

const statusUrlStart = "http://localhost:58313/api/Projects/";
const statusUrlAfterProjectId = "/Statuses/";

function deleteStatusSuccess(statusId){
    return{
        type: DELETE_STATUS_SUCCESS,
        id: statusId
    }
}

function fetchStatusesSuccess(data){
    return{
        type: FETCH_STATUSES_SUCCESS,
        data: data
    }
}

function addStatusSuccess(data){
    return{
        type: ADD_STATUS_SUCCESS,
        data: data
    }
}

export function deleteStatus(status){
    return function(dispatch, getState){
        const statuses = getState().statuses.statuses;
        const statusId = statuses.find(s => s.name.match(status)).id;
        const projectId = getState().tasks.selectedProject;
        fetch(statusUrlStart + projectId + statusUrlAfterProjectId + statusId,{
            method: 'DELETE'
        })
        //.then(() => dispatch(deleteTasksWithStatus())) TODO
        .then(() => dispatch(deleteStatusSuccess(statusId)))
    }
}

export function fetchStatuses(){
    return function(dispatch, getState){
        const projectId = getState().tasks.selectedProject;
        return fetch(statusUrlStart + projectId + statusUrlAfterProjectId)
        .then(res => res.json())
        .then(res => {
            dispatch(fetchStatusesSuccess(res))
        })
    }
}

export function addStatus(status){
    return function(dispatch, getState){
        const projectId = getState().tasks.selectedProject;
        fetch(statusUrlStart + projectId + statusUrlAfterProjectId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: status.name
            })
        }).then(res => res.json())
        .then((res) => dispatch(addStatusSuccess(res)))
    }
} 