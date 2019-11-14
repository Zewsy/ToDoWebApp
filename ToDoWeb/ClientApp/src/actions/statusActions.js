import {deleteTask} from './taskActions';

export const FETCH_STATUSES_SUCCESS = 'FETCH_STATUSES_SUCCESS';
export const DELETE_STATUS_SUCCESS = 'DELETE_STATUS_SUCCESS';

const statusUrl = "http://localhost:3001/statuses/"

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

export function deleteStatus(status){
    return function(dispatch, getState){
        const statuses = getState().statuses.statuses;
        const statusId = statuses.find(s => s.name.match(status)).id;
        const tasks = getState().tasks.tasks;
        const idsToDelete = tasks.filter(t => {return t.status === statusId}).map(t => {return t.id});
        idsToDelete.forEach(
          id => {dispatch(deleteTask(id))}
        )
        fetch(statusUrl + statusId,{
            method: 'DELETE'
        })
        .then(() => dispatch(deleteStatusSuccess(statusId)))
    }
}

export function fetchStatuses(){
    return function(dispatch){
        return fetch(statusUrl)
        .then(res => res.json())
        .then(res => {
            dispatch(fetchStatusesSuccess(res))
        })
    }
}

export function addStatus(statusName){
    return function(dispatch){
        fetch(statusUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: statusName
            })
        }).then(() => dispatch(fetchStatuses()))
    }
} 