export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASKS_SUCCESS = 'ADD_TASKS_SUCCESS';
export const TASK_EDITED = 'TASK_EDITED';
export const PROJECT_SELECTED = 'PROJECT_SELECTED';

const taskUrlStart = "http://localhost:58313/api/Projects/";
const taskUrlAfterProjectId = "/Tasks/";

export function projectSelected(projectId) {
    return {
        type: PROJECT_SELECTED,
        projectId: projectId
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

function addAllTasksSuccess(tasks){
    return {
        type: ADD_TASKS_SUCCESS,
        data: tasks
    }
}

function addTaskSuccess(task){
    return {
        type: ADD_TASK_SUCCESS,
        data: task
    }
}

function handleAddingNewPriority(addResult){
    return function(dispatch, getState){
        let tasks = getState().tasks.tasks;
        if(tasks.find(t => t.statusName === addResult.statusName && t.priority === addResult.priority)){
            let tasksModified = 
            tasks
            .map(t => (t.statusName === addResult.statusName && t.priority >= addResult.priority) ? {...t, priority: t.priority+1} : t)
            .concat(addResult);
            dispatch(addAllTasksSuccess(tasksModified));
        }
        else{
            dispatch(addTaskSuccess(addResult));
        }
    }
}

function taskEdited(task){
    return {
        type: TASK_EDITED,
        data: task
    }
}

export function deleteTasksWithStatus(statusName) {
    return function(dispatch, getState){
        const tasks = getState().tasks.tasks;
        tasks.forEach(t => 
            {if(t.statusName === statusName)
                dispatch(deleteTaskSuccess(t.id));
            }
        )
    }
}

export function deleteTask(taskId){
    return function(dispatch, getState){
        const projectId = getState().tasks.selectedProject;
        fetch(taskUrlStart + projectId + taskUrlAfterProjectId + taskId,{
            method: 'DELETE'
        })
        .then(() => dispatch(deleteTaskSuccess(taskId)))
    }
}

export function fetchTasks(){
    return function(dispatch, getState){
        const projectId = getState().tasks.selectedProject;
        return fetch(taskUrlStart + projectId + taskUrlAfterProjectId)
        .then(res => res.json())
        .then(res => {
            dispatch(fetchTasksSuccess(res));
        })
    }
}

export function addTask(task){
    return function(dispatch, getState){
        const projectId = getState().tasks.selectedProject;
        fetch(taskUrlStart + projectId + taskUrlAfterProjectId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                statusName: task.statusName,
                priority: parseInt(task.priority)
            })})
            .then(res => res.json())
            .then(res => dispatch(handleAddingNewPriority(res)))
    }
}

export function editTask(task){
    return function(dispatch,getState){
        const projectId = getState().tasks.selectedProject;
        fetch(taskUrlStart + projectId + taskUrlAfterProjectId + task.id,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: task.id,
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                statusName: task.statusName,
                priority: parseInt(task.priority)
            })
        }).then(() => dispatch(taskEdited(task)))
    }
}