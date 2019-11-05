export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const OPEN_DIALOG = 'OPEN_DIALOG';
export const OPEN_EDIT_DIALOG = 'OPEN_EDIT_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';
export const SUBMIT_DIALOG = 'SUBMIT_DIALOG';

const url = "http://localhost:3001/todos/";

export function openEditDialog(task){
    return {
        type: OPEN_EDIT_DIALOG,
        data: task
    }
}

export function openDialog(status){
    return {
        type: OPEN_DIALOG,
        status: status
    }
}

export function closeDialog(){
    return {
        type: CLOSE_DIALOG
    }
}

export function submitDialog(task){
    return function(dispatch, getState){
        if(getState().dialogs.isEditing)
            dispatch(editTask(task))
        else
            dispatch(addTask(task))
    }
}

function deleteTaskSuccess(taskId){
    return{
        type: DELETE_TASK_SUCCESS,
        id: taskId
    }
}

function fetchTasksSuccess(data){
    return{
        type: FETCH_TASKS_SUCCESS,
        data: data
    }
}

export function deleteTask(taskId){
    return function(dispatch){
        fetch(url + taskId,{
            method: 'DELETE'
        })
        .then(() => dispatch(deleteTaskSuccess(taskId)))
    }
}

export function fetchTasks(){
    return function(dispatch){
        return fetch(url)
        .then(res => res.json())
        .then(res => {
            dispatch(fetchTasksSuccess(res));
        })
    }
}

export function addTask(task){
    return function(dispatch){
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                priority: parseInt(task.priority),
                project: task.project
            })}).then(() => dispatch(fetchTasks()))
    }
}

export function editTask(task){
    return function(dispatch){
        fetch(url + task.id,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: task.id,
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                priority: parseInt(task.priority),
                project: task.project
            })
        }).then(() => dispatch(fetchTasks()))
    }
}