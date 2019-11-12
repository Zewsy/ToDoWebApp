import {OPEN_DIALOG, CLOSE_DIALOG, OPEN_EDIT_DIALOG, OPEN_NEWSTATUS_DIALOG} from "../actions/dialogActions";

const initialState = {
    editingTaskData: {
        id: '',
        title: '',
        description: '',
        priority: '',
        deadline: '',
        status: ''
    },
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
                    status: action.status
                }
            }
        case OPEN_EDIT_DIALOG: {
            return {
                isDialogActive: true,
                isEditing: true,
                dialogTitle: 'Teendő módosítása',
                editingTaskData: {
                    id: action.data.id,
                    title: action.data.title,
                    description: action.data.description,
                    priority: action.data.priority,
                    deadline: action.data.deadline,
                    status: action.data.status
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