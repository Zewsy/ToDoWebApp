export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_STATUSES_SUCCESS = 'FETCH_STATUSES_SUCCESS';
export const DELETE_STATUS_SUCCESS = 'DELETE_STATUS_SUCCESS';

const taskUrl = "http://localhost:3001/todos/";
const statusUrl = "http://localhost:3001/statuses/"

function deleteTaskSuccess(taskId){
    return{
        type: DELETE_TASK_SUCCESS,
        id: taskId
    }
}

function deleteStatusSuccess(statusId){
    return{
        type: DELETE_STATUS_SUCCESS,
        id: statusId
    }
}

function fetchTasksSuccess(data){
    return{
        type: FETCH_TASKS_SUCCESS,
        data: data
    }
}

function fetchStatusesSuccess(data){
    return{
        type: FETCH_STATUSES_SUCCESS,
        data: data
    }
}

export function deleteTask(taskId){
    return function(dispatch){
        fetch(taskUrl + taskId,{
            method: 'DELETE'
        })
        .then(() => dispatch(deleteTaskSuccess(taskId)))
    }
}

export function deleteStatus(status){
    return function(dispatch, getState){
        const statuses = getState().tasks.statuses;
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

export function fetchTasks(){
    return function(dispatch){
        return fetch(taskUrl)
        .then(res => res.json())
        .then(res => {
            dispatch(fetchTasksSuccess(res));
        })
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

export function addTask(task){
    return function(dispatch, getState){
        const statuses = getState().tasks.statuses;
        const statusId = statuses.find(s => s.name.match(task.status)).id;
        fetch(taskUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                status: statusId,
                priority: parseInt(task.priority),
                project: task.project
            })}).then(() => dispatch(fetchTasks()))
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

export function editTask(task){
    return function(dispatch, getState){
        const statuses = getState().tasks.statuses;
        const statusId = statuses.find(s => s.name.match(task.status)).id;
        fetch(taskUrl + task.id,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: task.id,
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                status: statusId,
                priority: parseInt(task.priority),
                project: task.project
            })
        }).then(() => dispatch(fetchTasks()))
    }
}