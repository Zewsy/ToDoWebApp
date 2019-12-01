import {OPEN_DIALOG, CLOSE_DIALOG, OPEN_EDIT_DIALOG, OPEN_NEWSTATUS_DIALOG} from "../actions/dialogActions";
import uuid from 'uuid';

const initialState = {
    editingTaskData: {
        id: '',
        title: '',
        description: '',
        priority: '',
        deadline: '',
        statusName: ''
    },
    newStatusId: '',
    isNewStatusDialogActive: false,
    isDialogActive: false,
    isEditing: false,
    dialogTitle: ''
}

export function dialogReducer(state = initialState, action){
    switch(action.type){
        case OPEN_DIALOG:
            return {
                ...state,
                isDialogActive: true,
                dialogTitle: 'Teendő hozzáadása',
                editingTaskData: {
                    id: uuid.v4(),
                    title: '',
                    description: '',
                    priority: 1,
                    deadline: '2000-01-01',
                    statusName: action.statusName
                }
            }
        case OPEN_EDIT_DIALOG: {
            return {
                ...state,
                isDialogActive: true,
                isEditing: true,
                dialogTitle: 'Teendő módosítása',
                editingTaskData: {
                    id: action.data.id,
                    title: action.data.title,
                    description: action.data.description,
                    priority: action.data.priority,
                    deadline: action.data.deadline,
                    statusName: action.data.statusName
                }
            }
        }
        case CLOSE_DIALOG: {
            return {
                ...state,
                isDialogActive: false,
                isEditing: false,
                isNewStatusDialogActive: false
            }
        }
        case OPEN_NEWSTATUS_DIALOG: {
            return {
                ...state,
                isNewStatusDialogActive: true
            }
        }
        default: {
            return state;
        }
    }
}

export const isDialogActive = state => state.isDialogActive;
export const isEditing = state => state.isEditing;
export const getDialogTitle = state => state.dialogTitle;
export const getEditingTaskData = state => state.editingTaskData;
export const isNewStatusDialogActive = state => state.isNewStatusDialogActive;
export const getStatusId = state => state.newStatusId;