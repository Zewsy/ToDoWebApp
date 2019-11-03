export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
const url = "http://localhost:3001/todos/";

function deleteTaskSuccess(taskId){
    return{
        type: DELETE_TASK_SUCCESS,
        id: taskId
    }
}

function fetchTasksSucceess(data){
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
        fetch(url)
        .then(res => res.json())
        .then(res => {
            dispatch(fetchTasksSucceess(res));
        })
    }
}