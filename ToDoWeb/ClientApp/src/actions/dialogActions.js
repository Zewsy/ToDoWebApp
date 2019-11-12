import {addTask, editTask} from './taskActions';

export const OPEN_DIALOG = 'OPEN_DIALOG';
export const OPEN_EDIT_DIALOG = 'OPEN_EDIT_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';
export const SUBMIT_DIALOG = 'SUBMIT_DIALOG';
export const OPEN_NEWSTATUS_DIALOG = 'OPEN_NEWSTATUS_DIALOG';

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

export function openNewStatusDialog(){
    return {
        type: OPEN_NEWSTATUS_DIALOG
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