export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
const url = "http://localhost:3001/todos/";

function deleteTaskSuccess(taskId){
    return{
        type: DELETE_TASK_SUCCESS,
        id: taskId
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