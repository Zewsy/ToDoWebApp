export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
const url = "http://localhost:3001/todos/";

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
        fetch(url)
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